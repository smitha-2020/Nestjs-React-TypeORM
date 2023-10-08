import axios, { AxiosRequestConfig } from "axios";
import {
  AggregatedDataInfo,
  CreatePhotoInfo,
  Params,
  PhotoInfo,
} from "../models/photos.interfaces";


axios.defaults.baseURL = "http://localhost:3000/photos";

const apiRequest = async (endpoint: string, config?: AxiosRequestConfig) => {
  const requestConfig: AxiosRequestConfig = { ...config, url: endpoint };

  const response = await axios(requestConfig);

  if (
    response.status !== 200 &&
    response.status !== 304 &&
    response.status !== 201
  ) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  if (response.data) {
    return response.data;
  }

  return;
};

export const getCount = async (): Promise<number> => {
  return apiRequest("/count");
};

export const getPhotosList = async (params?: Params): Promise<PhotoInfo[]> => {
  return apiRequest("/", { params });
};

export const getAggregatedAuthorDownloads = async ():Promise<AggregatedDataInfo[]> => {
  return apiRequest("/author-photosDownloaded");
};

export const postImage = async (file: File): Promise<File> => {
  const formData = new FormData();
  formData.append("file", file);

  const requestConfig: AxiosRequestConfig = {
    method: "POST",
    url: "/upload", // Adjust the URL as needed
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return apiRequest("/upload", requestConfig);
};

export const postPhoto = async (
  params: CreatePhotoInfo,
): Promise<PhotoInfo[]> => {
  //console.log(params);
  const newJsonKeyValuePair = JSON.stringify(params, replacer);

  function replacer(key: string, value: string | number) {
    if (typeof value === "string" && !Number(value)) {
      return value;
    } else if (typeof value === "string") {
      return Number(value);
    } else {
      return value;
    }
  }
  //console.log(newJsonKeyValuePair);
  return apiRequest("/", {
    method: "POST",
    data: newJsonKeyValuePair,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
