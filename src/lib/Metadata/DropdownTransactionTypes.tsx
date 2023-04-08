import axios from "axios";
import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { API_HOST } from "../../constants";
import { DropdownWrapper } from "./DropdownCurrencyTypes";
export interface IDropdownTransactionProps {
  credentials?: any;
  singleSelect: boolean;
  initialValues?: [string];
  onSelectionChanged?: (selected: string| [string]) => void;
}

const DropdownTransactionTypes = (props: IDropdownTransactionProps) => {
  // const [loading, setLoading] = useState(false);
  const [transactionData, setTransactionData] = useState<any>();
 
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      const fetchTransactionData = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/get-transaction-type-autocomplete`,
        {
          ...props.credentials,
        }
      );
      if (fetchTransactionData.data) {
        const items = fetchTransactionData.data;
        setTransactionData(items);
      }
      // setLoading(false);
    };
    fetchData();
  }, []);


  return (
    <>
      <DropdownWrapper>

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
          options={transactionData?.map((tt:any)=>tt.id)}
        />
        </div>
        {/* <div className="dropdown-wrapper">
          <h2>Transaction Types</h2>
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
      </DropdownWrapper>
    </>
  );
};
export default DropdownTransactionTypes;
