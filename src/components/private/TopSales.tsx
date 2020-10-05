import React, { useContext, useState, useEffect } from "react";
import { Input, Tag } from "antd";
import { Minus, BarChart2 } from "react-feather";
import { withRouter } from "react-router-dom";
//*Components
import {
  sortString,
  sortTypes,
  sortNumber,
  filtered,
  onSearch,
  arraySlice,
} from "../../utils/FilteredItems";
import AdminTable from "../private/AdminTable";
import { AuthContext } from "../../auth/AuthProvider";
import { app } from "../../config/firebase";
import Analytics from "../../page/Analytics";

const today = new Date().toISOString().substr(0, 10);

interface dateType {
  start: string;
  end: string;
}

interface PropTypes {
  history: any;
}

const dateObj: dateType = {
  start: today,
  end: today,
};

const TopSales: React.FC<PropTypes> = ({ history }) => {
  const currentUser = useContext(AuthContext);

  const [searchFilter, setSearchFilter] = useState(null);
  const [topSales, setTopSales] = useState([]);
  const [totalPurchase, setTotalPurchase] = useState<number>(0);

  //**return current user product posted */
  const filteredProduct = filtered(topSales, currentUser);

  //*returning total purchase
  const totalSales = () =>
    Promise.resolve(
      filteredProduct.reduce((a: any, b: any) => a + b.Subtotal, 0)
    );

  totalSales().then((response: any) => setTotalPurchase(response));

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

  const [{ start, end }, setState] = useState(dateObj);

  const [toggleAnalytics, setToggleAnalytics] = useState(false);

  //*Return true or false when clicking analytic
  const onClickAnalytics = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    filteredProduct.length > 0 && setToggleAnalytics(true);
  };

  useEffect(() => {
    const document = app.firestore();
    document
      .collection("transaction")
      .where("date_created", ">=", start)
      .where("date_created", "<=", end)
      .limit(10)
      .onSnapshot((onsnapshot) => {
        const productData: Object[] = [];
        onsnapshot.docs.forEach((item: any) => {
          productData.push({ ...item.data(), id: item.id });
        });
        setTopSales(productData);
      });

    return () => setToggleAnalytics(false);
  }, [start, end]);

  //*Date change event
  const dateOnChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const dataShowed: number = 5;
  const [current, setCurrent] = useState<number>(1);

  //** get current data;
  const currentData = arraySlice(filteredProduct, current, dataShowed);

  const spin = currentData.length <= 0;

  return (
    <div>
      <div className="mb-3 sm:flex sm:items-center sm:justify-between">
        <div className="sm:mb-0 mb-2 sm:flex sm:items-center sm:justify-between">
          <span className="mr-4 md:block hidden">Filter By : </span>
          <input
            type="date"
            name="start"
            value={start}
            className="px-2 py-1 sm:w-32 w-full sm:mb-0 mb-1 border rounded-sm text-sm cursor-pointer text-center"
            onChange={(event) => dateOnChanged(event)}
          />
          <Minus size="15" className="mx-1 sm:block hidden" />
          <input
            type="date"
            name="end"
            value={end}
            className="px-2 py-1 sm:w-32 w-full sm:mb-0 mb-1 border mr-4 rounded-sm text-sm cursor-pointer text-center"
            onChange={(event) => dateOnChanged(event)}
          />
          <button
            onClick={(event) => onClickAnalytics(event)}
            type="button"
            className="px-6 py-1 sm:w-32 md:mr-0 mr-2 w-full bg-green-500 hover:bg-green-400 rounded-sm text-white flex items-center"
          >
            <span className="mr-2">Analytics</span>
            <BarChart2 size="18" />
          </button>
        </div>
        <div className="flex items-center">
          <Input.Search
            allowClear
            className="sm:max-w-xs w-full"
            placeholder="Search by..."
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
      {toggleAnalytics ? (
        <Analytics
          totalPurchase={totalPurchase}
          topSalesData={filteredProduct}
        />
      ) : (
        <div className="text-center mt-5">
          <h1 className="text-sm text-gray-400">
            Click the button to show analytics
          </h1>
        </div>
      )}
    </div>
  );
};

export default withRouter(TopSales);
