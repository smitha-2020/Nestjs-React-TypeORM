import React from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpShortWide,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";

import { DisplayListProps } from "../models/photos.interfaces";
import { SortOrder } from "../models/enums";

function getTableHeaderNames(): string[] {
  return ["Author", "Width", "Height", "Image", "CopiesDownloaded"];
}

export function DisplayList({ rows, params, setParams }: DisplayListProps) {
  const isAscSortField = (headerName: string): boolean => {
    return (
      params.sortOrder === SortOrder.ASC && params.sortField === headerName
    );
  };

  const isDescSortField = (headerName: string): boolean => {
    return (
      params.sortOrder === SortOrder.DESC && params.sortField === headerName
    );
  };

  const changeSorting = (sortField: string) => {
    let sortOrder = SortOrder.ASC;

    if (params.sortField === sortField) {
      sortOrder =
        params.sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    }
    setParams({ ...params, sortField: sortField, sortOrder: sortOrder });
  };

  const renderTableHeaders = () => {
    return getTableHeaderNames().map((headerName) => (
      <th
        key={headerName}
        onClick={() => changeSorting(headerName)}
        style={{ cursor: "pointer" }}
      >
        <div className="d-flex justify-content-between align-items-center h-100">
          <span>{headerName}</span>
          <div className="d-flex justify-content-between align-items-center h-100">
            {isAscSortField(headerName) && (
              <FontAwesomeIcon icon={faArrowUpShortWide} />
            )}
            {isDescSortField(headerName) && (
              <FontAwesomeIcon icon={faArrowDownWideShort} />
            )}
          </div>
        </div>
      </th>
    ));
  };
  return (
    <Table striped hover>
      {rows.length > 0 && (
        <thead className="sticky-top bg-info text-light">
          <tr>{renderTableHeaders()}</tr>
        </thead>
      )}

      <tbody id="car-table-tbody" className={"h-100"}>
        {rows.length !== 0 ? (
          rows.map((photoRow) => (
            <tr key={`${photoRow.author}${photoRow.id}`}>
              <td>{photoRow.author}</td>
              <td>{photoRow.width}</td>
              <td>{photoRow.height}</td>
              <td>
                <img
                  width="50"
                  height="50"
                  src={photoRow.downloadUrl}
                  alt={`${photoRow.author}${photoRow.width}`}
                />
              </td>
              <td>{photoRow.copiesDownloaded}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} align={"center"}>
              No Records Found!!
              <br />
              <br />
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
