import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import {
  loadAllRecordsToDB,
  getCount,
  getPhotosList,
} from "../services/api-services";
import { PhotoInfo, Params } from "../models/photos.interfaces";
import { DisplayList } from "./DisplayList";
import { PhotoPagination } from "../components/PhotoPagination";
import { PageSize, SortOrder } from "../models/enums";

function PhotoListing() {
  const [count, setCount] = useState(0);
  const [photoList, setPhotoList]: [PhotoInfo[], Function] = useState([]);
  const [loadedToDb, setLoadedToDb]: [false, Function] = useState(false);

  const [params, setParams] = useState({
    page: 1,
    pageSize: PageSize.s,
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
      .then((loadedToDb) => setLoadedToDb(loadedToDb))
      .catch(console.error);

    setParams({
      ...params,
      page: 1,
      sortOrder: SortOrder.ASC,
    });
  };

  useEffect(() => {
    getPhotosList(params)
      .then((photoList) => setPhotoList(photoList))
      .catch(console.error);

    getCount()
      .then((count) => setCount(count))
      .catch(console.error);
  }, [loadedToDb]);

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
        {photoList.length === 0 && (
          <Button variant="secondary" size="sm" onClick={loadRecords}>
            Load Records
          </Button>
        )}
      </div>
    </div>
  );
}

export default PhotoListing;
