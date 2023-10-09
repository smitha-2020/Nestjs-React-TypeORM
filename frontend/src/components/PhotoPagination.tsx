import React from "react";
import { Pagination } from "react-bootstrap";

import { Params } from "../models/photos.interfaces";

export function PhotoPagination({
  setParams,
  params,
  pageCount,
}: {
  params: Params;
  setParams: Function;
  pageCount: number;
}) {
  return (
    <Pagination className={"float-end mb-3"}>
      <Pagination.First
        key={"first"}
        disabled={params.page === 1}
        onClick={() => setParams({ ...params, page: 1 })}
      />
      <Pagination.Prev
        key={"prev"}
        disabled={params.page === 1}
        onClick={() => setParams({ ...params, page: params.page - 1 })}
      />
      <Pagination.Item>{params.page}</Pagination.Item>
      <Pagination.Next
        key={"next"}
        disabled={params.page === pageCount}
        onClick={() => setParams({ ...params, page: params.page + 1 })}
      />
      <Pagination.Last
        key={"last"}
        disabled={params.page === pageCount}
        onClick={() => setParams({ ...params, page: pageCount })}
      />
    </Pagination>
  );
}
