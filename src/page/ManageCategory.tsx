import React, { useState, useContext } from "react";
import Header from "../components/private/Header";
import { Tag, Space, Popconfirm, Table, Input } from "antd";
import { Edit3, Trash2 } from "react-feather";
import { months } from "../utils/mockData";
import { CategoryContext } from "../Context/CategoryProvider";
import { AuthContext } from "../auth/AuthProvider";
import {
  filtered,
  onSearch,
  sortTypes,
  sortString,
} from "../utils/FilteredItems";
import axios from "axios";

//** Components */
import CategoryModal from "../components/private/CategoryModal";
import { MyPagination } from "../components/private/MyPagination";

const ManageCategory: React.FC = () => {
  const today = new Date();
  const dateToday = `${
    months[today.getMonth()]
  } ${today.getDate()}, ${today.getFullYear()}`;

  const { fetchCategory } = useContext(CategoryContext);
  const currentUser: any = useContext(AuthContext);
  const filteredCategory = filtered(fetchCategory, currentUser);

  const [modal, setModal] = useState<boolean>(false);
  //*Get categoryName
  const [category, setCategory] = useState({ categoryName: "" });
  //*Get category id
  const [categoryId, setCategoryId] = useState("");

  const [message, setMessage] = useState({ status: false, message: "" });
  const [buttonStatus, setButtonStatus] = useState({
    add: false,
  });

  const [searchFilter, setSearchFilter] = useState(null);

  const columns = [
    {
      title: "Unique Identification",
      dataIndex: "id",
      key: "id",
      setDirections: sortTypes,
      sorter: sortString,
      render: (text: string) => {
        return <span className="text-blue-500">{text}</span>;
      },
    },
    {
      title: "Category Name",
      dataIndex: "category",
      key: "category",
      setDirections: sortTypes,
      sorter: sortString,
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
      title: "Date Updated",
      dataIndex: "date_updated",
      key: "date_updated",
      render: (date_updated: string) => {
        return (
          <Tag color="volcano" key={date_updated}>
            {date_updated}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (fetchCategory: any) => {
        return (
          <Space size="middle" key="action">
            <Edit3
              className="text-blue-700 cursor-pointer"
              size="20"
              id="update"
              onClick={(event) => openModal(event, fetchCategory)}
            />
            <Popconfirm title="Do you want to delete?">
              <Trash2 className="text-red-700 cursor-pointer" size="20" />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  //**Open Modal */
  const openModal = (event: any, data?: any) => {
    event.preventDefault();

    const update = event.target.id === "update";
    const add = event.target.id === "add";

    if (add) {
      if (!modal) {
        setModal(!modal);
        setButtonStatus({ add: true });
      }
    }

    if (update) {
      if (!modal) {
        setCategory({ categoryName: data.category });
        setCategoryId(data.id);
        setModal(!modal);
        setButtonStatus({ add: false });
      }
    }
  };

  //**Close modal */
  const closeModal = (
    event: React.MouseEvent<SVGAElement | HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (modal) {
      setModal(false);
      setCategory({ categoryName: "" });
    }
  };

  const onSubmit = (event: any) => {
    event.preventDefault();

    const addCategory = category.categoryName.toLowerCase();
    const add = event.target.id === "addCategory";
    const update = event.target.id === "updateCategory";

    if (add) {
      const config = {
        type: "POST",
        url: "/api/index?name=addCategory",
        addCategory,
      };
      httpRequest(config);
    }

    if (update) {
      const config = {
        id: categoryId,
        type: "PUT",
        url: "/api/index?name=updateCategory",
        addCategory,
      };
      httpRequest(config);
    }
  };

  const httpRequest = (config: any) => {
    const { id, type, addCategory, url } = config;
    axios({
      method: type,
      url: url,
      headers: { "Access-Control-Allow-Origin": "*" },
      data: {
        id: id,
        uid: currentUser.uid,
        category: addCategory,
        dateToday,
      },
    })
      .then((response: any) => {
        setMessage({ status: true, message: response.data });
        setTimeout(() => {
          setCategory({ categoryName: "" });
          setMessage({ status: false, message: "" });
        }, 4000);
      })
      .catch((error) => {
        console.log(error.message);
        setMessage({
          status: false,
          message: "I'm sorry, i cant process right now :(",
        });
      });
  };

  //** Data showed to the client
  const dataShowed: number = 5;

  const [current, setCurrent] = useState<number>(1);

  //** get current data;
  const indexLastData = current * dataShowed;
  const indexOfFirstData = indexLastData - dataShowed;
  const currentData: object[] = filteredCategory.slice(
    indexOfFirstData,
    indexLastData
  );

  //** set spinner if data not arrives
  if (currentData.length <= 0) {
    return (
      <div className="h-screen w-screen md:pl-64 flex items-center justify-center">
        Please wait...
      </div>
    );
  }

  return (
    <>
      <Header pageName={"Manage Category"}>
        <div className="sm:flex sm:items-center sm:justify-between">
          <button
            type="button"
            id="add"
            className="px-3 py-1 md:mb-0 mb-2 bg-green-500 hover:bg-green-400 rounded-sm text-white "
            onClick={(event) => openModal(event)}
          >
            Add Category
          </button>
          <Input.Search
            allowClear
            className="max-w-xs"
            placeholder="Search by firstname"
            onSearch={(nameSearch) => {
              const sea = onSearch(nameSearch, filteredCategory);
              setSearchFilter(sea);
            }}
          />
        </div>
        <div>
          <span className="text-sm text-gray-500 block py-4">
            Date : {dateToday}
          </span>
        </div>
        <Table
          key="table"
          className="overflow-auto"
          columns={columns}
          rowKey={(currentData) => currentData.id}
          dataSource={searchFilter === null ? currentData : searchFilter}
          pagination={false}
        />
        <div className="mt-2 flex justify-center">
          <MyPagination
            total={filteredCategory.length}
            current={current}
            onChange={setCurrent}
            pageSize={dataShowed}
          />
        </div>
      </Header>
      {modal ? (
        buttonStatus.add ? (
          <CategoryModal
            closeModal={(event) => closeModal(event)}
            setCategory={(event) =>
              setCategory({ categoryName: event.target.value })
            }
            name="add"
            onSubmit={(event) => onSubmit(event)}
            message={message}
            category={category.categoryName}
            id="addCategory"
            buttonText="Submit"
          />
        ) : (
          <CategoryModal
            closeModal={(event) => closeModal(event)}
            setCategory={(event) =>
              setCategory({ categoryName: event.target.value })
            }
            name="update"
            onSubmit={(event) => onSubmit(event)}
            message={message}
            category={category.categoryName}
            buttonText="Update"
            id="updateCategory"
          />
        )
      ) : null}
    </>
  );
};

export default ManageCategory;
