import {
  ColumnOptions,
  ChartDataType,
  ScatterDataType,
} from "../../models/graphs.interfaces";
import { AggregatedDataInfo, PhotoInfo } from "../../models/photos.interfaces";

const getInitialDataForGraph = () => {
  let initialData: ChartDataType = {
    labels: [],
    datasets: [
      {
        label: "Download Count",
        data: [],
        backgroundColor: getColourArr(),
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  return initialData;
};

const getInitialDataForScatterGraph = () => {
  let initialDataForScatter: ScatterDataType = {
    labels: [],
    datasets: [
      {
        label: "Height Vs Width of Photos Downloaded",
        data: [{}],
        backgroundColor: getColourArr(),
      },
    ],
  };
  return initialDataForScatter;
};

const generateOptionsForColumnGraph = (): ColumnOptions => {
  return {
    responsive: true,
    indexAxis: "y",
    scales: {
      x: {
        grid: { display: false },
        title: {
          display: true,
          text: "Number of Copies Downloaded",
          color: "black",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: { display: false },
        title: {
          display: true,
          text: "Author",
          color: "black",
          font: {
            size: 12,
          },
        },
      },
    },
  };
};

const generateOptionsForChart = (
  xAxis: string,
  yAxis: string,
): ColumnOptions => {
  return {
    responsive: true,
    scales: {
      x: {
        grid: { display: false },
        title: {
          display: true,
          text: `${xAxis}`,
          color: "black",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: { display: false },
        title: {
          display: true,
          text: `${yAxis}`,
          color: "black",
          font: {
            size: 12,
          },
        },
      },
    },
  };
};

const updateDataForGraph = (
  photoList: AggregatedDataInfo[],
  downloadedCount: number,
) => {
  return {
    labels: generateLabelForGraphs(photoList, downloadedCount),
    datasets: [
      {
        label: "Download Count",
        data: generateDataForGraphs(photoList, downloadedCount),
        backgroundColor: getColourArr(),
        borderColor: "black",
        borderWidth: 2,
        weight: 4,
      },
    ],
  };
};

const updateDataForScatterChart = (
  photoList: PhotoInfo[],
  downloadedCount: number,
) => {
  return {
    labels: generateLabelForGraphs(photoList, downloadedCount),
    datasets: [
      {
        label: "Height Vs Width of Photos Downloaded",
        data: photoList
          .filter((row) => Number(row.copiesDownloaded) > downloadedCount)
          .map(({ height, width }) => ({
            x: height,
            y: width,
          })),
        backgroundColor: getColourArrForScatterChart(),
      },
    ],
  };
};

const generateLabelForGraphs = (
  photoList: AggregatedDataInfo[],
  downloadedCount: number,
): string[] => {
  return photoList
    .filter((row) => Number(row.copiesDownloaded) > downloadedCount)
    .map((filteredRow) => filteredRow.author);
};

const generateDataForGraphs = (
  photoList: AggregatedDataInfo[],
  downloadedCount: number,
): number[] => {
  return photoList
    .filter((row) => Number(row.copiesDownloaded) > downloadedCount)
    .map((filteredRow) => filteredRow.copiesDownloaded);
};

const getDropDownValues = () => {
  return [2000, 2500, 3000, 3500, 4000, 4500];
};

const getDropDownValuesForScatterChart = () => {
  return [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
};

const getColourArr = () => {
  return ["rgba(75,192,192,1)","#50AF95", "#f3ba2f", "#2a71d0", "#f3ba45"];
};

const getColourArrForScatterChart = () => {
  return ["rgba(75,192,192,1)", "#50AF95", "#f3ba2f", "#2a71d0", "#f3ba45"];
};

export {
  getInitialDataForGraph,
  getDropDownValues,
  updateDataForGraph,
  updateDataForScatterChart,
  getInitialDataForScatterGraph,
  generateOptionsForColumnGraph,
  generateOptionsForChart,
  getDropDownValuesForScatterChart,
};
