"use client";

import { useState, Fragment } from "react";

import ProductActions from "./ProductActions";
import ProductFilters from "./ProductFilters";
import AllProducts from "./products-table";

export default function Products() {
  const [rowSelection, setRowSelection] = useState({});

  return (
    <Fragment>
      <ProductActions
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
      <ProductFilters />
      <AllProducts
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
    </Fragment>
  );
}
