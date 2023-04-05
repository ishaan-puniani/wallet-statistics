import axios from "axios";
import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { API_HOST } from "../../constants";
import { DropdownWrapper } from "./DropdownCurrencyTypes";
export interface IDropdownTransactionProps {
  credentials?: any;
}

const DropdownTransactionTypes = (props: IDropdownTransactionProps) => {
  const [loading, setLoading] = useState(false);
  const [transactionData, setTransactionData] = useState<any>();
  let options = [];
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
      setLoading(false);
    };
    fetchData();
  }, []);

  options = transactionData?.map(
    (record: { [s: string]: unknown } | ArrayLike<unknown>) =>
      Object.values(record)[1]
  );
  return (
    <>
      <DropdownWrapper>
        <div className="dropdown-wrapper">
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
        </div>
      </DropdownWrapper>
    </>
  );
};
export default DropdownTransactionTypes;
