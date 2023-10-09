import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import {
  getAggregatedAuthorDownloads,
  getPhotosList,
} from "../services/api-services";
import { AggregatedDataInfo, PhotoInfo } from "../models/photos.interfaces";
import PieChart from "../components/graphs/PieChart";
import BarChart from "../components/graphs/BarChart";
import ScatterChart from "../components/graphs/ScatterChart";
import ColumnChart from "../components/graphs/ColumnChart";

function DisplayGraphs() {
  const [photoList, setPhotoList]: [PhotoInfo[], Function] = useState([]);

  const [aggregatedData, setAggregatedData]: [AggregatedDataInfo[], Function] =
    useState([]);

  useEffect(() => {
    getPhotosList()
      .then((photoList) => setPhotoList(photoList))
      .catch(console.error);

    getAggregatedAuthorDownloads()
      .then((aggregatedData) => setAggregatedData(aggregatedData))
      .catch(console.error);
    // eslint-disable-next-line
  }, []);

  return (
    <Tabs
      defaultActiveKey="piechart"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="piechart" title="Piechart">
        <PieChart photoList={aggregatedData} />
      </Tab>
      <Tab eventKey="barchart" title="Barchart">
        <BarChart photoList={aggregatedData} />
      </Tab>
      <Tab eventKey="scatterchart" title="ScatterChart">
        <ScatterChart photoList={photoList} />
      </Tab>
      <Tab eventKey="columngraph" title="ColumnGraph">
        <ColumnChart photoList={aggregatedData} />
      </Tab>
    </Tabs>
  );
}

export default DisplayGraphs;
