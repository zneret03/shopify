import React, { useState } from "react";
import Header from "../components/private/Header";
import { Input, Divider } from "antd";
import { Edit3, Trash2 } from "react-feather";
import { months } from "../utils/mockData";
//** Components */
import Modal from "../components/Forms/Modal";
//import { MyPagination } from "../components/private/MyPagination";
const ManageCategory: React.FC = () => {
  const today = new Date();
  // Tag, Space, Popconfirm, Table,
  //   const column = [
  //     {
  //       title: "Unique Identification",
  //       dataIndex: "id",
  //       key: "id",
  //       render: (text: string) => {
  //         return <span className="text-blue-500">{text}</span>;
  //       },
  //     },
  //     {
  //       title: "Category Name",
  //       dataIndex: "categoryName",
  //       key: "categoryName",
  //     },
  //     {
  //       title: "Date Created",
  //       dataIndex: "date_created",
  //       key: "date_created",
  //       render: (date_created: string) => {
  //         return (
  //           <Tag color="geekblue" key={date_created}>
  //             {date_created}
  //           </Tag>
  //         );
  //       },
  //     },
  //     {
  //       title: "Date Updated",
  //       dataIndex: "date_updated",
  //       key: "date_updated",
  //       render: (date_updated: string) => {
  //         return (
  //           <Tag color="volcano" key={date_updated}>
  //             {date_updated}
  //           </Tag>
  //         );
  //       },
  //     },
  //     {
  //       title: "Action",
  //       dataIndex: "action",
  //       key: "action",
  //       render: (category: any) => {
  //         return (
  //           <Space>
  //             <button type="button">
  //               <Edit3 className="text-blue-700" size="20" />
  //             </button>
  //             <Popconfirm title="Do you want to delete?">
  //               <button>
  //                 <Trash2 className="text-red-700" size="20" />
  //               </button>
  //             </Popconfirm>
  //           </Space>
  //         );
  //       },
  //     },
  //   ];

  const [modal, setModal] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");

  const openModal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!modal) {
      return setModal(!modal);
    }
  };

  const closeModal = (
    event: React.MouseEvent<SVGAElement | HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (modal) {
      setModal(!modal);
      setCategory("");
    }
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    console.log(category);
  };

  return (
    <>
      <Header pageName={"Manage Category"}>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="px-3 py-1 bg-green-500 hover:bg-green-400 rounded-sm text-white"
            onClick={(event) => openModal(event)}
          >
            Add Category
          </button>
          <Input.Search className="max-w-xs" placeholder="Search..." />
        </div>
        <div>
          <span className="text-sm text-gray-500 block py-4">
            Date :{" "}
            {`${
              months[today.getMonth()]
            } ${today.getDate()}, ${today.getFullYear()}`}
          </span>
        </div>
      </Header>
      {modal ? (
        <Modal close={(event) => closeModal(event)}>
          <div className="font-bold text-center">
            <span className="text-xl">Category</span>
          </div>
          <Divider dashed />
          <div>
            <input
              type="text"
              className="border py-1 rounded w-full px-3 focus:border-red-500 hover:border-red-500"
              placeholder="Category name"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
            <Divider />
            <div className="text-right">
              <button
                onClick={(event) => closeModal(event)}
                type="button"
                className="border rounded-sm hover:border-red-500 py-1 px-3 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={(event) => onSubmit(event)}
                type="button"
                className="text-white rounded-sm bg-green-400 hover:bg-green-300 py-1 px-3"
              >
                Submit
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default ManageCategory;
