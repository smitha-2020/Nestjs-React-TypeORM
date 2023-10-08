import {
  Chart as ChartJs,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Form, Row, Container, Col, Card } from "react-bootstrap";
import { useState } from "react";
import { Scatter } from "react-chartjs-2";
import { DisplayListPropsForGraphs } from "../../models/graphs.interfaces";
import {
  updateDataForScatterChart,
  getInitialDataForScatterGraph,
  generateOptionsForChart,
  getDropDownValuesForScatterChart,
} from "./helper.service";

ChartJs.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

function ScatterChart({ photoList }: DisplayListPropsForGraphs) {
  const initialData = getInitialDataForScatterGraph();

  const options = generateOptionsForChart("Width", "Height");

  const [scatterData, setScatterData] = useState(initialData);

  const renderScatterChart = (e: any) => {
    if (e.target.value) {
      setScatterData(updateDataForScatterChart(photoList, e.target.value));
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
                onChange={renderScatterChart}
              >
                <option>Select menu</option>
                {getDropDownValuesForScatterChart().map((dropDownValue) => (
                  <option key={dropDownValue} value={dropDownValue}>
                    {dropDownValue}
                  </option>
                ))}
              </Form.Select>

              <Scatter data={scatterData} options={options} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ScatterChart;
