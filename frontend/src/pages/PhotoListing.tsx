import React, { useEffect, useState } from "react";
import { getCount, getPhotosList } from "../services/api-services";
import { PhotoInfo, Params } from "../models/photos.interfaces";
import { DisplayList } from "./DisplayList";
import { PhotoPagination } from "../components/PhotoPagination";
import { SortOrder } from "../models/enums";

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
    getCount()
      .then((count) => setCount(count))
      .catch(console.error);

    getPhotosList(params)
      .then((photoList) => setPhotoList(photoList))
      .catch(console.error);
    // eslint-disable-next-line
  }, [params.sortOrder, params.page]);

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
        {photoList && (
          <DisplayList rows={photoList} params={params} setParams={setParams} />
        )}
      </div>
    </div>
  );
}

export default PhotoListing;
