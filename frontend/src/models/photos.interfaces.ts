import { SortOrder } from "./enums";

export interface PhotoInfo {
  id: number;
  author: string;
  width: number;
  height: number;
  url: string | null;
  downloadUrl: string;
  copiesDownloaded: number;
}

export interface CreatePhotoInfo {
  downloadUrl: string;
  id?: number | undefined;
  author: string | undefined;
  width: string | undefined;
  height: string | undefined;
  url?: string | null | undefined;
  copiesDownloaded: string | undefined;
}

export interface DisplayListProps {
  rows: PhotoInfo[];
  params: Params;
  setParams: Function;
}

export interface Params {
  page: number;
  pageSize: number;
  sortField: string | undefined;
  sortOrder: SortOrder;
}
export interface AggregatedDataInfo {
  author: string;
  copiesDownloaded: number;
}

export interface ChartProps{
  setData:Function;
  photoList:AggregatedDataInfo[] | PhotoInfo[];
}
