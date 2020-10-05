import React from "react";
import { Table } from "antd";
import { MyPagination } from "./MyPagination";

interface PropsType {
  spin: boolean;
  columns: Object[];
  currentData: any;
  searchFilter: Object[];
  DataArray: Object[];
  current: number;
  setCurrent: any;
  dataShowed: number;
}

const AdminTable: React.FC<PropsType> = ({
  spin,
  columns,
  currentData,
  searchFilter,
  DataArray,
  current,
  setCurrent,
  dataShowed,
}) => {
  return (
    <>
      <div>
        <Table
          className="overflow-auto"
          columns={columns}
          rowKey={(currentData) => currentData.id}
          dataSource={searchFilter === null ? currentData : searchFilter}
          pagination={false}
        />
      </div>
      <div className="mt-2 flex justify-center">
        <MyPagination
          total={DataArray.length}
          current={current}
          onChange={setCurrent}
          pageSize={dataShowed}
        />
      </div>
    </>
  );
};

export default AdminTable;
