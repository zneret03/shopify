import React from "react";
import Modal from "../Forms/Modal";
import { Divider, Spin } from "antd";

interface Props {
  closeModal: (
    event: React.MouseEvent<SVGAElement | HTMLButtonElement, MouseEvent>
  ) => void;
  setCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  message: any;
  category: string;
  buttonText: string;
  id: string;
  name: string;
  loading: boolean;
}

const CategoryModal: React.FC<Props> = ({
  closeModal,
  category,
  setCategory,
  message,
  onSubmit,
  buttonText,
  id,
  name,
  loading,
}) => {
  return (
    <Modal close={closeModal}>
      <div className="font-bold text-center">
        <span className="text-xl">Category</span>
      </div>
      <Divider dashed />
      <Spin spinning={loading}>
        <form>
          <input
            type="text"
            name={name}
            className="border py-1 rounded w-full px-3 focus:border-red-500 hover:border-red-500"
            placeholder="Category name"
            defaultValue={category}
            required
            onChange={setCategory}
          />
          <div
            className={`${
              message.status ? "bg-green-500" : "bg-red-500"
            } py-1 rounded text-center w-full mt-3`}
          >
            <span className="text-white">{message.message}</span>
          </div>
          <Divider />
          <div className="text-right">
            <button
              onClick={closeModal}
              type="button"
              className="border rounded-sm hover:border-red-500 py-1 px-3 mr-2"
            >
              Cancel
            </button>
            <button
              id={id}
              onClick={onSubmit}
              type="button"
              className="text-white rounded-sm bg-green-400 hover:bg-green-300 py-1 px-3"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </Spin>
    </Modal>
  );
};

export default CategoryModal;
