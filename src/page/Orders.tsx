import React, { useContext, useState } from "react";
import { Space, Input, Popconfirm, Tag } from "antd";
import { ShoppingCart, Trash2 } from "react-feather";
import Headers from "../components/private/Header";
import {
  onSearch,
  newCustomerArray,
  sortTypes,
  sortNumber,
  sortString,
  arraySlice,
} from "../utils/FilteredItems";

//*Components
import Loading from "../components/private/Loading";
import httpRequest from "../api/httpRequest";
import Button from "../utils/Button";
import { months } from "../utils/mockData";
import { AuthContext } from "../auth/AuthProvider";
import { OrderContext } from "../Context/OrderProvider";
import AdminTable from "../components/private/AdminTable";

interface onProps {
  history: any;
}

const Orders: React.FC<onProps> = ({ history }) => {
  const { customerInfo } = useContext(OrderContext);
  const currentUser: any = useContext(AuthContext);
  const filteredCustomerInfo = newCustomerArray(customerInfo, currentUser);

  const [purchaseTotal, setPurchaseTotal] = useState(0);
  const [spinner, setSpinner] = useState(false);
  //** Data showed to the client

  const today = new Date();
  const dateToday = `${
    months[today.getMonth()]
  } ${today.getDate()}, ${today.getFullYear()}`;

  const totalPurchase = Promise.resolve(
    filteredCustomerInfo.reduce((a: any, b: any) => a + b.subTotal, 0)
  );

  totalPurchase.then((data: any) => data !== 0 && setPurchaseTotal(data));

  const [searchFilter, setSearchFilter] = useState(null);
  //** Reminders */
  //* customer Order authentication

  const customerOrders = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    items: any
  ) => {
    event.preventDefault();

    if (items) {
      history.push(`/dashboard/order/customerOrders?id=${items.id}`);
    }
  };

  const loadSpinner = () => setSpinner(true);

  const onDeleteCustomer = (
    event: React.MouseEvent<HTMLOrSVGElement>,
    customer: any
  ) => {
    event.preventDefault();
    loadSpinner();
    customer &&
      httpRequest
        .delete(`/api/index?name=deleteCustomer&&customerId=${customer.id}`, {
          items: customer.items,
        })
        .then(() => setSpinner(false));
  };

  const dataShowed: number = 5;
  const [current, setCurrent] = useState<number>(1);

  //** get current data;
  const currentData = arraySlice(filteredCustomerInfo, current, dataShowed);

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
      title: "Date",
      dataIndex: "date_created",
      key: "date_created",
      render: (date_created: string) => {
        let color = "geekblue";
        return (
          <Tag color={color} key={date_created}>
            {date_created}
          </Tag>
        );
      },
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      setDirections: sortTypes,
      sorter: sortString,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      setDirections: sortTypes,
      sorter: sortString,
    },
    {
      title: "Province",
      dataIndex: "province",
      key: "province",
      setDirections: sortTypes,
      sorter: sortString,
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      setDirections: sortTypes,
      sorter: sortString,
    },
    {
      title: "Total",
      dataIndex: "subTotal",
      key: "subTotal",
      setDirections: sortTypes,
      sorter: sortNumber,
      render: (subTotal: number) => {
        return <span>₱{subTotal.toLocaleString()}</span>;
      },
    },
    {
      title: "Zipcode",
      dataIndex: "zipcode",
      key: "zipcode",
      setDirections: sortTypes,
      sorter: sortNumber,
    },
    {
      title: "Action Controls",
      key: "action",
      render: (customerInfo: any) => (
        <Space size="middle" key="action">
          <button onClick={(event) => customerOrders(event, customerInfo)}>
            <ShoppingCart className="text-blue-700" size="20" />
          </button>
          <Popconfirm
            title="Do you want to delete?"
            onConfirm={(event) => onDeleteCustomer(event, customerInfo)}
          >
            <button>
              <Trash2 className="text-red-700" size="20" />
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const spin = filteredCustomerInfo.length <= 0;

  return (
    <>
      {spinner && <Loading />}
      <Headers pageName={"Information"}>
        {spin ? (
          <Button
            title="Empty order information"
            path="/dashboard/products/addProducts"
            text="go to add Products"
            className="flex justify-center"
          />
        ) : (
          <div>
            <div className="mb-3 sm:flex sm:items-center sm:justify-between">
              <div>
                <span className="font-bold text-lg">Total : </span>
                <span className="font-bold text-lg text-red-500">
                  ₱{purchaseTotal.toLocaleString()}
                </span>
              </div>
              <Input.Search
                allowClear
                className="max-w-xs"
                placeholder="Search by firstname"
                onSearch={(nameSearch) => {
                  const sea = onSearch(nameSearch, filteredCustomerInfo);
                  setSearchFilter(sea);
                }}
              />
            </div>
            <div>
              <span className="text-sm text-gray-500 block">
                Date : {dateToday}
              </span>
            </div>
            <AdminTable
              spin={spin}
              columns={columns}
              currentData={currentData}
              searchFilter={searchFilter}
              DataArray={filteredCustomerInfo}
              current={current}
              setCurrent={setCurrent}
              dataShowed={dataShowed}
            />
          </div>
        )}
      </Headers>
    </>
  );
};

export default Orders;
