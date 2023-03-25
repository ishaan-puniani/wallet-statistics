import axios from "axios";
import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { API_HOST } from "../../constants";
import "./Dropdown.css";
export interface IDropdownProps {
  credentials?: any;
}

const DropdownCurrencyTypes = (props: IDropdownProps) => {
  const [loading, setLoading] = useState(false);
  const [currencyData, setCurrencyData] = useState<any>();
  let options = [];
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchCurrencyTypes = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/get-currency-autocomplete`,
        {
          ...props.credentials,
        }
      );
      if (fetchCurrencyTypes.data) {
        const items = fetchCurrencyTypes.data;
        setCurrencyData(items);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  options = currencyData?.map(
    (record: { [s: string]: unknown } | ArrayLike<unknown>) =>
      Object.values(record)[1]
  );
  return (
    <>
      <div className="dropdown-wrapper">
        <h2>Currency Types</h2>
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <Multiselect
            isObject={false}
            onKeyPressFn={function noRefCheck() {}}
            onRemove={function noRefCheck() {}}
            onSearch={function noRefCheck() {}}
            onSelect={function noRefCheck() {}}
            options={options}
          />
        )}
      </div>
    </>
  );
};
export default DropdownCurrencyTypes;
