import React from "react";
import { Divider } from "antd";
import Zoom from "react-medium-image-zoom";

interface PropTypes {
  getOrder: any[];
}

const OrderInfo: React.FC<PropTypes> = ({ getOrder }) => {
  const today = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      {getOrder.map((item: any, index: number) => (
        <div className="w-full mr-2 rounded" key={index}>
          <div className="shadow px-5 py-5">
            <div className="flex items-center justify-between font-bold ">
              <span className="text-lg">Order Information</span>
              <span className=" text-xl mr-3 bg-gray-200 rounded-full px-6 py-1">
                #{item.id}
              </span>
            </div>
            <Divider dashed />
            <div className="mb-10">
              <span className="text-sm text-gray-500 block py-1">
                Date :{" "}
                {`${
                  months[today.getMonth()]
                } ${today.getDate()}, ${today.getFullYear()}`}
              </span>
            </div>
            <div className="flex justify-between">
              <div className="flex">
                <Zoom>
                  <img className="w-40 h-32" src={item.imageUrl} alt="" />
                </Zoom>
                <div className="px-4">
                  <span className="block font-bold text-blue-500 uppercase">
                    {item.product}
                  </span>
                  <span className="block text-gray-500">{item.purpose}</span>
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-500">Paid</span>
                    <div
                      className="rounded-full bg-gray-500 h-2 w-2 my-3"
                      style={{ backgroundColor: item.status.color }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="mx-10 font-bold text-gray-600">
                <div className="mt-2 flex justify-between">
                  <span className="mr-8">Subtotal :</span>
                  <span>₱{item.Subtotal.toLocaleString()}</span>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="mr-8">Tax Rate :</span>
                  <span>₱{item.valueAddedTax.toLocaleString()}</span>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="mr-8">Tax :</span>
                  <span>
                    ₱{(item.Subtotal * item.valueAddedTax).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <Divider orientation="left">Total</Divider>
            <div className="text-right px-6 flex justify-end">
              <span className="font-bold text-xl">
                ₱
                {(
                  item.Subtotal -
                  item.Subtotal * item.valueAddedTax
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderInfo;
