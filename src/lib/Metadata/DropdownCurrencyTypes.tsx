import axios from "axios";
import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { API_HOST } from "../../constants";
import styled from "styled-components";
export interface IDropdownProps {
  credentials?: any;
  singleSelect: boolean;
  initialValues?: [string];
  onSelectionChanged?: (selected: string| [string]) => void;
}

const DropdownCurrencyTypes = (props: IDropdownProps) => {
  // const [loading, setLoading] = useState(false);
  const [currencyData, setCurrencyData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      const fetchCurrencyTypes = await axios.post(
        `${props.credentials.API_HOST || API_HOST}/tenant/${props.credentials.application_id}/get-currency-autocomplete`,
        {
          ...props.credentials,
        }
      );
      if (fetchCurrencyTypes.data) {
        const items = fetchCurrencyTypes.data;
        setCurrencyData(items);
      }
      // setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>

      <DropdownWrapper>
        {/* <div className="dropdown-wrapper">
          <h2>Currency Types</h2>
          {loading ? (
            <h1>Loading</h1>
          ) : (
            <Multiselect
              isObject={false}
              onKeyPressFn={function noRefCheck() { }}
              onRemove={function noRefCheck() { }}
              onSearch={function noRefCheck() { }}
              onSelect={function noRefCheck() { }}
              options={options}
            />
          )}
        </div> */}
        <div><Multiselect
          selectedValues={props.initialValues}
          singleSelect={props.singleSelect}
          isObject={false}
          onKeyPressFn={function noRefCheck() { }}
          onRemove={function noRefCheck() { }}
          onSearch={function noRefCheck() { }}
          onSelect={(selected) => {
            if (props.onSelectionChanged) {
              if(props.singleSelect){
                props.onSelectionChanged(selected[0]);
              }else{
                props.onSelectionChanged(selected);
              }
            }
          }}
          options={currencyData?.map((c:any)=>c.id)}
        />
        </div>
      </DropdownWrapper>



    </>
  );
};
export const DropdownWrapper = styled.div`
// .dropdown-wrapper{
//   margin: 20px 20px 20px 20px;
// }

`;
export default DropdownCurrencyTypes;
