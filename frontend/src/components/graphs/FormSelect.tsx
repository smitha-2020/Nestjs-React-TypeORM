import { Form } from "react-bootstrap";
import { getDropDownValues, updateDataForGraph } from "./helper.service";
import React from "react";
import { ChartProps } from "../../models/photos.interfaces";

function FormSelect({ setData, photoList }: ChartProps) {
  const greaterThan = ">";
  const renderChart = (e: any) => {
    if (e.target.value) {
      setData(updateDataForGraph(photoList, e.target.value));
    }
  };
  return (
    <Form.Select
      size="sm"
      className="text-capitalize h1 mb-4 w-25 text-center text-secondary"
      aria-label="select menu"
      onChange={renderChart}
    >
      <option>Select Download Count</option>
      {getDropDownValues().map((dropDownValue) => (
        <option key={dropDownValue} value={dropDownValue}>
          {greaterThan}
          {dropDownValue}
        </option>
      ))}
    </Form.Select>
  );
}
export default FormSelect;
