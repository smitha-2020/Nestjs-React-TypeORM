import React from "react";
import { registerables, Chart as ChartJs } from "chart.js";
import { Form, Container, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { DisplayListPropsForCharts } from "../../models/graphs.interfaces";
import {
  getInitialDataForGraph,
  getDropDownValues,
  updateDataForGraph,
} from "./helper.service";

ChartJs.register(...registerables);

function PieChart({ photoList }: DisplayListPropsForCharts) {
  const initialData = getInitialDataForGraph();

  const greaterThan = '>';

  const [pieData, setPieData] = useState(initialData);

  const renderPieChart = (e: any) => {
    if (e.target.value) {
      setPieData(updateDataForGraph(photoList, e.target.value));
    }
  };
  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={12} lg={8} xs={12}>
          <Card className="shadow">
            <Card.Body>
              <Form.Select
                className="text-capitalize h1 mb-4 w-25 text-center text-secondary"
                size="sm"
                aria-label="select menu"
                onChange={renderPieChart}
              >
                <option>Select Download Count</option>
                {getDropDownValues().map((dropDownValue) => (
                  <option key={dropDownValue} value={dropDownValue}>
                    {greaterThan}{dropDownValue}
                  </option>
                ))}
              </Form.Select>

              <Pie
                data={pieData}
                options={{
                  responsive: true
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PieChart;
