import { registerables, Chart as ChartJs } from "chart.js";
import { Container, Row, Col, Card } from "react-bootstrap";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

import { DisplayListPropsForCharts } from "../../models/graphs.interfaces";
import {
  getInitialDataForGraph,
  generateOptionsForColumnGraph,
} from "./helper.service";
import FormSelect from "./FormSelect";

ChartJs.register(...registerables);

function ColumnChart({ photoList }: DisplayListPropsForCharts) {
  const initialData = getInitialDataForGraph();

  const options = generateOptionsForColumnGraph();

  const [data, setData] = useState(initialData);

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={12} lg={6} xs={12}>
          <Card className="shadow">
            <Card.Body>

              <FormSelect setData={setData} photoList={photoList} />

              <Bar data={data} options={options} />

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ColumnChart;
