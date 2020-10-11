import React, { useState, useContext } from "react";
import { Space, Tag, Input, Popconfirm } from "antd";
import { Edit3, Trash2 } from "react-feather";
import { withRouter } from "react-router-dom";
import { app } from "../config/firebase";
import {
  filtered,
  onSearch,
  sortTypes,
  sortString,
  sortNumber,
  arraySlice,
} from "../utils/FilteredItems";
import httpRequest from "../api/httpRequest";

//**Component
import Header from "../components/private/Header";
import Button from "../utils/Button";
import Loading from "../components/private/Loading";
import { months } from "../utils/mockData";
import { ProductContext } from "../Context/ProductProvider";
import { AuthContext } from "../auth/AuthProvider";
import AdminTable from "../components/private/AdminTable";
interface Props {
  history: any;
}

const Products: React.FC<Props> = ({ history }) => {
  const today = new Date();
  const dateToday = `${
    months[today.getMonth()]
  } ${today.getDate()}, ${today.getFullYear()}`;

  const { items } = useContext(ProductContext);

  const currentUser: any = useContext(AuthContext);
  const [searchFilter, setSearchFilter] = useState(null);
  const [spinner, setSpinner] = useState<boolean>(false);

  //**return current user product posted */
  const filteredProduct = filtered(items, currentUser);

  const getUdateId = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    event.preventDefault();
    if (id) {
      history.push(`/dashboard/products/EditProducts?id=${id}`);
    }
  };

  const loadSpinner = () => setSpinner(true);

  //** Delete Table Data
  const getDeleteId = async (
    event: any,
    id: any,
    imageUrl: string,
    file: string
  ) => {
    event.preventDefault();

    loadSpinner();

    if (file) {
      httpRequest
        .delete(`/api/index?name=deleteProduct&&productId=${id}`, { id })
        .then(() => {
          const storageRef = app.storage().refFromURL(imageUrl);
          storageRef
            .delete()
            .then(() => {
              setSpinner(false);
              const storageRef = app.storage().ref();
              const deleteRef = storageRef.child("/" + file);
              deleteRef.delete();
            })
            .catch((error) => {
              console.log(error.message);
            });
        });
    }
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
        <Space size="middle" key="action">
          <button onClick={(event) => getUdateId(event, items.id)}>
            <Edit3 className="text-blue-700" size="20" />
          </button>
          <Popconfirm
            title="Do you want to delete?"
            onConfirm={(event) =>
              getDeleteId(event, items.id, items.imageUrl, items.fileName)
            }
          >
            <button>
              <Trash2 className="text-red-700" size="20" />
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  //** Data showed to the client
  const dataShowed: number = 5;

  const [current, setCurrent] = useState<number>(1);

  //** get current data;
  const currentData = arraySlice(filteredProduct, current, dataShowed);

  //** set spinner if data not arrives
  const spin = currentData.length <= 0;
  return (
    <>
      {spinner && <Loading />}
      <Header pageName={"Products"}>
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
            <AdminTable
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
    </>
  );
};

export default withRouter(Products);
