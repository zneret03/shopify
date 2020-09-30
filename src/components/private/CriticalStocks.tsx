import React, { useState, useContext } from "react";
import { Tag, Input } from "antd";

//*Components
import { AuthContext } from "../../auth/AuthProvider";
import { ProductContext } from "../../Context/ProductProvider";
import {
  sortString,
  sortTypes,
  sortNumber,
  filtered,
  onSearch,
  arraySlice,
} from "../../utils/FilteredItems";
import { months } from "../../utils/mockData";
import AdminTable from "../private/AdminTable";

const CriticalStocks: React.FC = () => {
  const today = new Date();
  const dateToday = `${
    months[today.getMonth()]
  } ${today.getDate()}, ${today.getFullYear()}`;

  const { criticalStocks } = useContext(ProductContext);
  const currentUser = useContext(AuthContext);

  const [searchFilter, setSearchFilter] = useState(null);

  //**return current user product posted */
  const filteredProduct = filtered(criticalStocks, currentUser);

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
      title: "Price",
      dataIndex: "price",
      key: "price",
      setDirections: sortTypes,
      sorter: sortNumber,
      render: (price: number) => {
        return <span>₱{price.toLocaleString()}</span>;
      },
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
            className={`${
              quantity < 10 ? "bg-red-500" : "bg-orange-500"
            } max-w-xs w-6 text-center rounded-full`}
          >
            <span className="text-white">{quantity.toLocaleString()}</span>
          </div>
        );
      },
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender: string) => {
        let color = gender.length > 3 ? "geekblue" : "green";
        if (gender === "Kids") {
          color = "volcano";
        }
        return (
          <Tag color={color} key={gender}>
            {gender.toUpperCase()}
          </Tag>
        );
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
      <div className="mb-3 flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-500 block py-4">
            Date : {dateToday}
          </span>
        </div>
        <Input.Search
          allowClear
          className="max-w-xs"
          placeholder="Search by product name"
          onSearch={(nameSearch) => {
            const itemsSearch = onSearch(nameSearch, filteredProduct);
            setSearchFilter(itemsSearch);
          }}
        />
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

export default CriticalStocks;
