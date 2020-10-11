import React, { useState } from "react";
import AdminTable from "./AdminTable";
import {
  sortString,
  sortTypes,
  sortNumber,
  arraySlice,
} from "../../utils/FilteredItems";
import { Tag } from "antd";

interface PropTypes {
  paidOrders: Object[];
  searchFilter: any;
}

const TopSalesTable: React.FC<PropTypes> = ({ paidOrders, searchFilter }) => {
  const columns = [
    {
      title: "Unique identification",
      dataIndex: "id",
      key: "id",
      setDirections: sortTypes,
      sorter: sortString,
      render: (text: string) => <span className="text-blue-500">{text}</span>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      setDirections: sortTypes,
      sorter: sortString,
    },
    {
      title: "Product Name",
      dataIndex: "product",
      key: "product",
      setDirections: sortTypes,
      sorter: sortString,
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
      setDirections: sortTypes,
      sorter: sortString,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      setDirections: sortTypes,
      sorter: sortNumber,
      render: (quantity: number) => {
        return (
          <div
            className={`bg-orange-500 max-w-xs w-6 text-center rounded-full`}
          >
            <span className="text-white">{quantity.toLocaleString()}</span>
          </div>
        );
      },
    },
    {
      title: "Date Created",
      dataIndex: "date_created",
      key: "date_created",
      render: (date_created: string) => {
        return (
          <Tag color="geekblue" key={date_created}>
            {date_created}
          </Tag>
        );
      },
    },
    {
      title: "Total",
      dataIndex: "Subtotal",
      key: "Subtotal",
      setDirections: sortTypes,
      sorter: sortNumber,
      render: (price: number) => {
        return <span>₱{price.toLocaleString()}</span>;
      },
    },
  ];

  const dataShowed: number = 5;
  const [current, setCurrent] = useState<number>(1);

  //** get current data;
  const currentData = arraySlice(paidOrders, current, dataShowed);

  return (
    <AdminTable
      columns={columns}
      currentData={currentData}
      searchFilter={searchFilter}
      DataArray={paidOrders}
      current={current}
      setCurrent={setCurrent}
      dataShowed={dataShowed}
    />
  );
};

export default TopSalesTable;
