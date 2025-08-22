"use client";

import { useState, Fragment } from "react";

import AllCategories from "./categories-table";
import CategoryActions from "./CategoryActions";
import CategoryFilters from "./CategoryFilters";

export default function Products() {
  const [rowSelection, setRowSelection] = useState({});

  return (
    <Fragment>
      <CategoryActions
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
      <CategoryFilters />
      <AllCategories
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
    </Fragment>
  );
}
