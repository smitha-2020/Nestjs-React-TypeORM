import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import {
  getAggregatedAuthorDownloads,
  getPhotosList,
} from "../services/api-services";
import { AggregatedDataInfo, PhotoInfo } from "../models/photos.interfaces";
import PieChart from "../components/Graphs/PieChart";
import BarChart from "../components/Graphs/BarChart";
import ScatterChart from "../components/Graphs/ScatterChart";
import ColumnChart from "../components/Graphs/ColumnChart";

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
