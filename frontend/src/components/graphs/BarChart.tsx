import { registerables, Chart as ChartJs } from "chart.js";
import { Form, Container, Row, Col, Card } from "react-bootstrap";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { DisplayListPropsForCharts } from "../../models/graphs.interfaces";
import {
  getInitialDataForGraph,
  getDropDownValues,
  updateDataForGraph,
  generateOptionsForChart,
} from "./helper.service";

ChartJs.register(...registerables);

function BarChart({ photoList }: DisplayListPropsForCharts) {
  const initialData = getInitialDataForGraph();

  const greaterThan = ">";

  const options = generateOptionsForChart("Author", "Number of Downloads");

  const [barData, setBarData] = useState(initialData);

  const renderPieChart = (e: any) => {
    if (e.target.value) {
      setBarData(updateDataForGraph(photoList, e.target.value));
    }
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={12} lg={6} xs={12}>
          <Card className="shadow">
            <Card.Body>
              <Form.Select
                size="sm"
                className="text-capitalize h1 mb-4 w-25 text-center text-secondary"
                aria-label="select menu"
                onChange={renderPieChart}
              >
                <option>Select Download Count</option>
                {getDropDownValues().map((dropDownValue) => (
                  <option key={dropDownValue} value={dropDownValue}>
                    {greaterThan}
                    {dropDownValue}
                  </option>
                ))}
              </Form.Select>

              <Bar data={barData} options={options} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default BarChart;
