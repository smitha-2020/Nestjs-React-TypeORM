import { registerables, Chart as ChartJs } from "chart.js";
import { Form, Container, Row, Col, Card } from "react-bootstrap";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { DisplayListPropsForCharts } from "../../models/graphs.interfaces";
import {
  getInitialDataForGraph,
  getDropDownValues,
  updateDataForGraph,
  generateOptionsForColumnGraph,
} from "./helper.service";

ChartJs.register(...registerables);

function ColumnChart({ photoList }: DisplayListPropsForCharts) {
  const initialData = getInitialDataForGraph();

  const options = generateOptionsForColumnGraph();

  const [columnData, setColumnData] = useState(initialData);

  const renderPieChart = (e: any) => {
    if (e.target.value) {
      setColumnData(updateDataForGraph(photoList, e.target.value));
    }
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={12} lg={6} xs={12}>
          <Card className="shadow">
            <Card.Body>
              <Form.Select
                className="text-capitalize h1 mb-4 w-25 text-center text-secondary"
                size="sm"
                aria-label="select menu"
                onChange={renderPieChart}
              >
                <option>Select menu</option>
                {getDropDownValues().map((dropDownValue) => (
                  <option key={dropDownValue} value={dropDownValue}>
                    {dropDownValue}
                  </option>
                ))}
              </Form.Select>

              <Bar data={columnData} options={options} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ColumnChart;
