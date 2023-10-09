import {AggregatedDataInfo, PhotoInfo} from "./photos.interfaces";

export interface ChartDataType {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string;
    borderWidth: number;
  }[];
}

export interface ScatterDataType {
  datasets: {
    backgroundColor: string[];
    data: {}[];
    label: string;
  }[];
  labels: string[];
}

export interface DisplayListPropsForGraphs {
  photoList: PhotoInfo[];
}

export interface DisplayListPropsForCharts {
  photoList: AggregatedDataInfo[];
}


export interface ColumnOptions {
  responsive: boolean;
  indexAxis?: "x" | "y" | undefined;
  scales: {
    x: {
      grid: { display: boolean };
      title: {};
    };
    y: { grid: { display: boolean }; title: {} };
  };
}


