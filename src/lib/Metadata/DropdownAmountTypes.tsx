import React from "react";
import Multiselect from "multiselect-react-dropdown";
import "./Dropdown.css";

export interface IDropdownProps {
  credentials?: any;
  singleSelect: boolean;
  initialValues?: [string];
  onSelectionChanged?: (selected: string| [string]) => void;
}

const DropdownAmountTypes = (props: IDropdownProps) => {
  // const options = [{name: 'Amount', id: "amount"},{name: 'Virtual Value', id: "virtual"}];
  const options = ["amount","virtual"];
  
  return (
    <>
      <div className="dropdown-wrapper">
          <Multiselect
            selectedValues={props.initialValues}
            singleSelect={props.singleSelect}
            isObject={false}
            onKeyPressFn={function noRefCheck() {}}
            onRemove={function noRefCheck() {}}
            onSearch={function noRefCheck() {}}
            onSelect={(selected) => {
              if (props.onSelectionChanged) {
                if(props.singleSelect){
                  props.onSelectionChanged(selected[0]);
                }else{
                  props.onSelectionChanged(selected);
                }
              }
            }}
            options={options}
          />
 
      </div>
    </>
  );
};
export default DropdownAmountTypes;
