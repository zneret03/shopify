import React, { useState, useContext } from "react";
import Header from "../components/private/Header";
import { Tag, Space, Popconfirm, Input } from "antd";
import { Edit3, Trash2 } from "react-feather";
import { months, MyDateString } from "../utils/mockData";
import { CategoryContext } from "../Context/CategoryProvider";
import { AuthContext } from "../auth/AuthProvider";
import {
  filtered,
  onSearch,
  sortTypes,
  sortString,
  arraySlice,
} from "../utils/FilteredItems";
import httpRequest from "../api/httpRequest";

//** Components */
import Loading from "../components/private/Loading";
import CategoryModal from "../components/private/CategoryModal";
import AdminTable from "../components/private/AdminTable";
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

  const [message, setMessage] = useState({
    status: false,
    message: "",
    loading: false,
  });
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
            <Popconfirm
              title="Do you want to delete?"
              onConfirm={(event) => onDeleteCategory(event, fetchCategory.id)}
            >
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

  //*Loading
  const loadingSpinner = () => {
    setMessage({ status: false, message: "", loading: true });
  };

  const onDeleteCategory = (
    event: React.MouseEvent<HTMLOrSVGElement>,
    categoryId: string
  ) => {
    event.preventDefault();
    loadingSpinner();
    categoryId &&
      httpRequest
        .delete("/api/index?name=deleteCategory", { id: categoryId })
        .then(() => setMessage({ status: false, message: "", loading: false }));
  };

  //*Submit data
  const onSubmit = (event: any) => {
    event.preventDefault();

    const addCategory = category.categoryName.toLowerCase();
    const add = event.target.id === "addCategory";
    const update = event.target.id === "updateCategory";

    if (addCategory === "") {
      return setMessage({
        status: false,
        message: "Input is empty",
        loading: false,
      });
    }

    loadingSpinner();

    if (add) {
      httpRequest
        .post("/api/index?name=addCategory", {
          id: categoryId,
          uid: currentUser.uid,
          category: addCategory,
          dateToday: MyDateString,
        })
        .then(() => {
          setMessage({
            status: true,
            message: "Successfully Added",
            loading: false,
          });
          setTimeout(() => {
            setCategory({ categoryName: "" });
            setMessage({ status: false, message: "", loading: false });
          }, 4000);
        });

      // httpRequest(config);
    }

    if (update) {
      httpRequest
        .put("/api/index?name=updateCategory", {
          id: categoryId,
          category: addCategory,
          dateToday: MyDateString,
        })
        .then(() => {
          setMessage({
            status: true,
            message: "Successfully updated",
            loading: false,
          });
          setTimeout(() => {
            setCategory({ categoryName: "" });
            setMessage({ status: false, message: "", loading: false });
          }, 4000);
        });
    }
  };

  //** Data showed to the client
  const dataShowed: number = 5;

  const [current, setCurrent] = useState<number>(1);
  const currentData = arraySlice(filteredCategory, current, dataShowed);

  //** set spinner if data not arrives
  const spin = currentData.length <= 0;
  return (
    <>
      {message.loading && <Loading />}
      <Header pageName={"Manage Category"}>
        {spin ? (
          <div className="flex justify-center">
            <div className="text-center">
              <span className="block">Empty order information</span>
              <button
                id="add"
                onClick={(event) => openModal(event)}
                className="uppercase tracking-wide font-bold border py-1 px-6 mt-2 bg-gray-900 text-white hover:text-white hover:bg-gray-700 rounded"
              >
                add product category
              </button>
            </div>
          </div>
        ) : (
          <div>
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
            <AdminTable
              columns={columns}
              currentData={currentData}
              searchFilter={searchFilter}
              DataArray={filteredCategory}
              current={current}
              setCurrent={setCurrent}
              dataShowed={dataShowed}
            />
          </div>
        )}
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
            loading={message.loading}
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
            loading={message.loading}
          />
        )
      ) : null}
    </>
  );
};

export default ManageCategory;
