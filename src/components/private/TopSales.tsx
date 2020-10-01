import React, { useContext, useState } from "react";
import { Input, Tag, DatePicker } from "antd";

//*Components
import {
  sortString,
  sortTypes,
  sortNumber,
  filtered,
  onSearch,
  arraySlice,
} from "../../utils/FilteredItems";
import { CartContext } from "../../Context/CartProvider";
import AdminTable from "../private/AdminTable";
import { AuthContext } from "../../auth/AuthProvider";
const TopSales: React.FC = () => {
  const { RangePicker } = DatePicker;

  const { topSales } = useContext(CartContext);
  const currentUser = useContext(AuthContext);

  const [searchFilter, setSearchFilter] = useState(null);

  //**return current user product posted */
  const filteredProduct = filtered(topSales, currentUser);

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
  const currentData = arraySlice(filteredProduct, current, dataShowed);

  const spin = currentData.length <= 0;

  return (
    <div>
      <div className="mb-3 sm:flex sm:items-center sm:justify-between">
        <div className=" sm:mb-0  mb-2">
          <RangePicker format="YYYY-MM-DD HH:mm" className="w-full" />
        </div>
        <div className="flex items-center">
          <Input.Search
            allowClear
            className="sm:max-w-xs w-full"
            placeholder="Search by product name"
            onSearch={(nameSearch) => {
              const itemsSearch = onSearch(nameSearch, filteredProduct);
              setSearchFilter(itemsSearch);
            }}
          />
        </div>
      </div>
      <AdminTable
        spin={spin}
        columns={columns}
        currentData={currentData}
        searchFilter={searchFilter}
        DataArray={filteredProduct}
        current={current}
        setCurrent={setCurrent}
        dataShowed={dataShowed}
      />
    </div>
  );
};

export default TopSales;
