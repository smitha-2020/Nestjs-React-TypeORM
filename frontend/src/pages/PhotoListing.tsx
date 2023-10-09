import React, { useEffect, useState } from "react";
import {
  loadAllRecordsToDB,
  getCount,
  getPhotosList,
} from "../services/api-services";
import { PhotoInfo, Params } from "../models/photos.interfaces";
import { DisplayList } from "./DisplayList";
import { PhotoPagination } from "../components/PhotoPagination";
import { SortOrder } from "../models/enums";
import { Button } from "react-bootstrap";

function PhotoListing() {
  const [count, setCount] = useState(0);
  const [photoList, setPhotoList]: [PhotoInfo[], Function] = useState([]);

  const [params, setParams] = useState({
    page: 1,
    pageSize: 25,
    sortField: "author",
    sortOrder: SortOrder.ASC,
  } as Params);

  useEffect(() => {
    getPhotosList(params)
      .then((photoList) => setPhotoList(photoList))
      .catch(console.error);

    getCount()
      .then((count) => setCount(count))
      .catch(console.error);
    // eslint-disable-next-line
  }, [params.sortOrder, params.page]);

  const loadRecords = () => {
    loadAllRecordsToDB()
      .then((photoList) => setPhotoList(photoList))
      .catch(console.error);

    setParams({
      ...params,
      page: 1,
      sortOrder: SortOrder.ASC,
    });
  };

  const pageCount = Math.ceil(count / params.pageSize);

  return (
    <div className={"container"}>
      <div className={"float-end mb-3 mt-5"}>
        <PhotoPagination
          setParams={setParams}
          params={params}
          pageCount={pageCount}
        />
      </div>
      <div>
        <DisplayList rows={photoList} params={params} setParams={setParams} />
      </div>
      <div>
        <Button variant="secondary" size="sm" onClick={loadRecords}>
          Load Records
        </Button>
      </div>
    </div>
  );
}

export default PhotoListing;