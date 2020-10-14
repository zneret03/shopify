import React, { useState, useContext } from "react";
import { Input, Tag } from "antd";
import { withRouter } from "react-router-dom";
//*Components
import Header from "../components/private/Header";
import { Edit3 } from "react-feather";
import { months } from "../utils/mockData";
import {
  filtered,
  onSearch,
  sortTypes,
  sortString,
  sortNumber,
  arraySlice,
} from "../utils/FilteredItems";
import Button from "../utils/Button";
import TableProduct from "../components/private/TableProduct";
import { ProductContext } from "../Context/ProductProvider";
import { AuthContext } from "../auth/AuthProvider";

interface PropTypes {
  history: any;
}

const StockManagement: React.FC<PropTypes> = ({ history }) => {
  const [searchFilter, setSearchFilter] = useState(null);
  const today = new Date();
  const dateToday = `${
    months[today.getMonth()]
  } ${today.getDate()}, ${today.getFullYear()}`;

  const { items } = useContext(ProductContext);
  const currentUser: any = useContext(AuthContext);

  const redirectComponentRequest = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productId: string
  ) => {
    event.preventDefault();
    productId &&
      history.push(
        `/dashboard/stockManagement/stockAdjustment?id=${productId}`
      );
  };

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
    {
      title: "Action",
      key: "action",
      render: (items: any) => (
        <button onClick={(event) => redirectComponentRequest(event, items.id)}>
          <Edit3 className="text-blue-700" size="20" />
        </button>
      ),
    },
  ];

  //**return current user product posted */
  const filteredProduct = filtered(items, currentUser);

  //** Data showed to the client
  const dataShowed: number = 5;

  const [current, setCurrent] = useState<number>(1);

  //** get current data;
  const currentData = arraySlice(filteredProduct, current, dataShowed);

  //** set spinner if data not arrives
  const spin = currentData.length <= 0;

  return (
    <Header pageName="Stock Management">
      {spin ? (
        <Button
          className="flex justify-center"
          path="/dashboard/products/addProducts"
          text="go to add Products"
          title="Empty Product"
        />
      ) : (
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
          <TableProduct
            columns={columns}
            currentData={currentData}
            searchFilter={searchFilter}
            DataArray={filteredProduct}
            current={current}
            setCurrent={setCurrent}
            dataShowed={dataShowed}
          />
        </div>
      )}
    </Header>
  );
};

export default withRouter(StockManagement);
