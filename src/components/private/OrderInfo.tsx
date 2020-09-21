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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mx-auto font-bold ">
              <span className="text-lg text-sm font-bold">Product Details</span>
              <span className="md:text-xl sm:text-lg text-sm md:mr-3 mr-0 sm:bg-gray-200 rounded-full max-w-xs sm:px-6 py-1">
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
            <div className="sm:flex sm:justify-between">
              <div className="sm:flex">
                <Zoom>
                  <img
                    className="md:w-40 md:h-32 object-contain"
                    src={item.imageUrl}
                    alt=""
                  />
                </Zoom>
                <div className="px-4">
                  <span className="block font-bold text-sm text-blue-500 uppercase">
                    {item.product}
                  </span>
                  <span className="block text-gray-500 text-sm">
                    {item.purpose}
                  </span>
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-500 text-sm">Paid</span>
                    <div
                      className="rounded-full bg-gray-500 h-2 w-2 my-3"
                      style={{ backgroundColor: item.status.color }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="sm:px-10 px-4 font-bold text-gray">
                <div className="sm:mt-2 mt-1 sm:flex sm:justify-between">
                  <span className="sm:mr-8 mr-5 text-sm ">Subtotal</span>
                  <span className="sm:text-sm text-xs">
                    ₱{item.Subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="sm:mt-2 mt-1 sm:flex sm:justify-between">
                  <span className="sm:mr-8 mr-5 text-sm ">Tax Rate</span>
                  <span className="sm:text-sm text-xs">
                    ₱{item.valueAddedTax.toLocaleString()}
                  </span>
                </div>
                <div className="sm:mt-2 mt-1 sm:flex sm:justify-between">
                  <span className="sm:mr-8 mr-5 text-sm ">Total Tax</span>
                  <span className="sm:text-sm text-xs">
                    ₱{(item.Subtotal * item.valueAddedTax).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <Divider orientation="left">Total</Divider>
            <div className="text-right sm:px-6 px-4 flex sm:justify-end justify-start">
              <span className="font-bold sm:text-xl text-lg">
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
