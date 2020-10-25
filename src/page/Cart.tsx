import React, { useContext, useEffect } from "react";
import { Divider, notification } from "antd";
import { withRouter } from "react-router-dom";
import { app } from "../config/firebase";

//*Components
import { pendingItems } from "../utils/FilteredItems";
import { CartContext } from "../Context/CartProvider";
import Back from "../utils/Back";
import Button from "../utils/Button";
import { months } from "../utils/mockData";
import { Smile } from "react-feather";

interface PropsType {
  history: any;
}

const Cart: React.FC<PropsType> = ({ history }) => {
  const { cartItems } = useContext(CartContext);
  const pending = pendingItems(cartItems);

  console.log(cartItems);

  const tax_total = pending.reduce(
    (a: any, b: any) => a + b.Subtotal * b.valueAddedTax,
    0
  );
  const subTotal = pending.reduce((a: any, b: any) => a + b.Subtotal, 0);
  const total = subTotal - tax_total;

  //*Click checkout button redirect to Checkout form
  const openCheckOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (subTotal) {
      history.push("/cart/checkOut");
    }
  };

  //*Pop up notification
  const openNotification = () => {
    notification.open({
      message: "Notice",
      description:
        "If you dont checkout your item, this will disappear after 24hrs",
      icon: <Smile size="25" color="#ADD8E6" />,
    });
  };

  useEffect(openNotification, []);

  //*Delete items
  const deleteCartItems = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();

    try {
      if (id) {
        const document = app.firestore().collection("transaction").doc(id);
        await document.delete();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //*Date
  const today = new Date();
  const dateToday = `${
    months[today.getMonth()]
  } ${today.getDate()}, ${today.getFullYear()}`;

  return (
    <>
      <div className="container mx-auto px-3">
        <div className="md:flex md:justify-between py-8">
          <div>
            <Back path="/shop" />
            <div className="flex items-center">
              <span className="text-2xl mr-5 text-black">Shopping Bag</span>
              <span className="text-sm text-gray-500 text-black">
                {dateToday}
              </span>
            </div>
            <div className="mt-6">
              <div className="grid grid-rows gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {pending.map(
                  (items: any, index: number) =>
                    items.quantity > 0 && (
                      <div
                        className={`${
                          items.status.color === "#ff4444" ? "block" : "hidden"
                        } border`}
                        key={index}
                      >
                        <div className="bg-gray-200 py-6 px-6 relative">
                          <div className="absolute top-0 right-0 px-2">
                            <button
                              onClick={(event) =>
                                deleteCartItems(event, items.id)
                              }
                            >
                              x
                            </button>
                          </div>
                          <img
                            className="w-40 h-40 object-contain mx-auto"
                            src={items.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="px-4 py-2 font-segoe-UI">
                          <div className="flex justify-between">
                            <span className="block text-xs text-gray-600 mb-4">
                              {items.purpose}
                            </span>
                            <div
                              className="rounded-full bg-gray-500 h-2 w-2 mt-2"
                              style={{ backgroundColor: items.status.color }}
                            ></div>
                          </div>
                          <span className="block text-xs   text-gray-600 uppercase tracking-wide mb-1">
                            {items.productName}
                          </span>
                          <div className="flex items-center justify-between">
                            <span className="text-black text-xs text-gray-800">
                              ₱{items.Subtotal.toLocaleString()}
                            </span>
                            <span className="block text-xs text-gray-800 uppercase">
                              {items.gender}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
            {pending.length <= 0 && (
              <Button
                text="ontinue Shopping"
                title="Your Shopping bag is empty"
                path="/shop"
                className="text-center md:absolute md:inset-x-0"
              />
            )}
          </div>
          <div className="md:w-1/4 w-full md:ml-4 md:mt-0 mt-6 sm:mt-6">
            <span className="text-2xl text-black">Product Summary</span>
            <Divider />
            <div>
              <div className="flex justify-between">
                <span className=" mb-2">Subtotal :</span>
                <span className="font-bold text-sm">
                  ₱{subTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className=" mb-2">Sales Tax :</span>
                <span className="font-bold text-sm">
                  ₱{tax_total.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between mt-6">
                <span>Total :</span>
                <span className="font-bold text-xl">
                  ₱{total.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="text-center mt-10">
              <button
                onClick={(event) => openCheckOut(event)}
                className="border py-3 w-full rounded-full text-lg hover:bg-gray-300 hover:text-white"
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Cart);
