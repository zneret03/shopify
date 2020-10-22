import React from "react";
import AdminTable from "./AdminTable";

interface PropTypes {
  columns: Object[];
  currentData: Object[];
  searchFilter: Object[];
  DataArray: Object[];
  current: number;
  setCurrent: any;
  dataShowed: number;
}

const TableProduct: React.FC<PropTypes> = ({
  columns,
  currentData,
  searchFilter,
  DataArray,
  current,
  setCurrent,
  dataShowed,
}) => {
  return (
    <div>
      <AdminTable
        columns={columns}
        currentData={currentData}
        searchFilter={searchFilter}
        DataArray={DataArray}
        current={current}
        setCurrent={setCurrent}
        dataShowed={dataShowed}
      />
    </div>
  );
};

export default TableProduct;
