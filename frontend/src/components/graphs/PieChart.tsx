import React from "react";
import { registerables, Chart as ChartJs } from "chart.js";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";
import { Pie } from "react-chartjs-2";

import { DisplayListPropsForCharts } from "../../models/graphs.interfaces";
import { getInitialDataForGraph } from "./helper.service";
import FormSelect from "./FormSelect";

ChartJs.register(...registerables);

function PieChart({ photoList }: DisplayListPropsForCharts) {
  const initialData = getInitialDataForGraph();

  const [data, setData] = useState(initialData);

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={12} lg={8} xs={12}>
          <Card className="shadow">
            <Card.Body>
              <FormSelect setData={setData} photoList={photoList} />

              <Pie
                data={data}
                options={{
                  responsive: true,
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
