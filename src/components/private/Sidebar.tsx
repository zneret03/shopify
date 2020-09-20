import React, { useContext, useState } from "react";
import { app } from "../../config/firebase";
import { AuthContext } from "../../auth/AuthProvider";
import {
  Settings,
  LogOut,
  Facebook,
  Twitter,
  Instagram,
  Home,
  Folder,
  ShoppingCart,
  Package,
  ChevronDown,
  ChevronRight,
} from "react-feather";
import { Divider } from "antd";
import { Link } from "react-router-dom";

export const signOut = (
  event: React.MouseEvent<HTMLSpanElement, MouseEvent>
) => {
  event.preventDefault();
  app.auth().signOut();
};

const Sidebar: React.FC = () => {
  const currentUser: any = useContext(AuthContext);
  // const data : object[] = []
  // data.push(currentUser)

  //Main toggle
  const [menu, setMenu] = useState<boolean>(false);

  const Menu = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.preventDefault();
    if (menu !== true) {
      return setMenu(true);
    } else {
      return setMenu(false);
    }
  };

  //Sale Channel toggle
  const [sale, setSale] = useState<boolean>(false);

  const saleChannel = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (sale !== true) {
      return setSale(true);
    } else {
      return setSale(false);
    }
  };

  //Products Toggle
  const [products, setProducts] = useState(false);

  const openProducts = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (products !== true) {
      return setProducts(true);
    } else {
      return setProducts(false);
    }
  };

  const [name, setName] = useState(null);

  //**Get username */
  const getuserUid = () => {
    return new Promise(async (resolve, reject) => {
      if (currentUser) {
        const document = app
          .firestore()
          .collection("user")
          .doc(currentUser.uid);
        const uid = await document.get();
        return resolve(`${uid.data().firstname} ${uid.data().lastname}`);
      } else {
        reject("array is empty");
      }
    });
  };

  getuserUid()
    .then((data: any) => {
      if (data) {
        setName(data);
      }
    })
    .catch((error) => {
      console.log(error.message);
    });

  return (
    <>
      <div className="sm:w-1/4 md:w-1/4 lg:w-1/5 fixed">
        <div className={`shadow-lg md:block bg-black h-screen overflow-auto`}>
          <div className="px-6">
            <div>
              <div className="pt-6 flex justify-center">
                <img
                  className="w-32 h-32 object-cover rounded-full"
                  src={require("../../image/exampleProfile.jpg")}
                  alt=""
                />
              </div>
              {name || currentUser.displayName ? (
                <div className="text-center mt-2">
                  <span className="font-bold text-lg text-white">{`${
                    name || currentUser.displayName
                  }`}</span>
                </div>
              ) : (
                <div className="text-center mt-2">
                  <span className="text-sm text-white">Loading...</span>
                </div>
              )}
              <div className="text-center" key="currentUser">
                <span className="text-sm text-gray-200 block">
                  {currentUser.email}
                </span>
              </div>
              <Divider />
              <div
                className={`${
                  menu ? "text-gray-600" : ""
                } flex items-center justify-between px-1 cursor-pointer`}
                onClick={(event) => Menu(event)}
              >
                <span className="uppercase font-bold text-white">Menu</span>
                <span>
                  {menu ? (
                    <ChevronDown size="18" color="#FFF" />
                  ) : (
                    <ChevronRight size="18" color="#FFF" />
                  )}
                </span>
              </div>
              <div className={`${menu ? "block" : "hidden"} font-bold mt-4`}>
                <ul>
                  <li className="mb-5 cursor-pointer">
                    <Link
                      to="/dashboard"
                      className="flex items-center rounded px-2 py-1 hover:bg-blue-500 focus:bg-blue-500"
                    >
                      <span className="mr-2">
                        <Home size="18" color="#FFF" />
                      </span>
                      <span className="text-white">Home</span>
                    </Link>
                  </li>
                  <li className="mb-5 cursor-pointer">
                    <Link
                      to="/inventory"
                      className="flex items-center rounded px-2 py-1 hover:bg-blue-500 focus:bg-blue-500"
                    >
                      <span className="mr-2">
                        <Folder size="18" color="#FFF" />
                      </span>
                      <span className="text-white">Inventory</span>
                    </Link>
                  </li>
                  <li className="mb-5 cursor-pointer">
                    <Link
                      to="/order"
                      className="flex items-center rounded px-2 py-1 hover:bg-blue-500 focus:bg-blue-500"
                    >
                      <span className="mr-2">
                        <ShoppingCart size="18" color="#FFF" />
                      </span>
                      <span className="text-white">Orders</span>
                    </Link>
                  </li>
                  <li
                    className="mb-5 cursor-pointer ml-2"
                    onClick={(event) => openProducts(event)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="mr-2">
                          <Package size="18" color="#FFF" />
                        </span>
                        <span className="text-white">Products</span>
                      </div>
                      <span>
                        {products ? (
                          <ChevronDown size="18" color="#FFF" />
                        ) : (
                          <ChevronRight size="18" color="#FFF" />
                        )}
                      </span>
                    </div>
                    <div
                      className={`${
                        products ? "block" : "hidden"
                      } ml-2 mt-2 font-normal`}
                    >
                      <ul>
                        <Link
                          to="/dashboard/products/addProducts"
                          className="flex items-center justify-between hover:bg-blue-500 px-2 rounded py-1"
                        >
                          <li className=" text-white">Add Products</li>
                        </Link>
                        <Link
                          to="/dashboard/products/viewProducts"
                          className="flex items-center justify-between hover:bg-blue-500  px-2 rounded py-1"
                        >
                          <li className="text-white">View Products</li>
                        </Link>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <Divider />
              <div
                className={`${
                  sale ? "text-gray-600" : ""
                } mt-5 flex items-center justify-between px-1 cursor-pointer`}
                onClick={(event) => saleChannel(event)}
              >
                <span className="uppercase font-bold text-white">
                  Sale Channel
                </span>
                <span>
                  {sale ? (
                    <ChevronDown size="18" color="#FFF" />
                  ) : (
                    <ChevronRight size="18" color="#FFF" />
                  )}
                </span>
              </div>
              <div className="mt-4 font-bold">
                <ul className={`${sale ? "block" : "hidden"}`}>
                  <li className="mb-5 hover:bg-blue-500 px-2 py-1 rounded flex items-center cursor-pointer">
                    <span className="mr-2">
                      <Facebook size="18" color="#FFF" />
                    </span>
                    <span className="text-white">Facebook</span>
                  </li>
                  <li className="mb-5 hover:bg-blue-500 px-2 py-1 rounded flex items-center cursor-pointer">
                    <span className="mr-2">
                      <Twitter size="18" color="#FFF" />
                    </span>
                    <span className="text-white">Twitter</span>
                  </li>
                  <li className="mb-5 hover:bg-blue-500 px-2 py-1 rounded flex items-center cursor-pointer">
                    <span className="mr-2">
                      <Instagram size="18" color="#FFF" />
                    </span>
                    <span className="text-white">Instagram</span>
                  </li>
                </ul>
                <Divider />
                <ul>
                  <li className="mb-5 px-1 py-1 rounded cursor-pointer">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <span className="mr-2">
                          <Settings size="18" color="#FFF" />
                        </span>
                        <span className="text-white">Settings</span>
                      </div>
                      <span>
                        <ChevronRight size="18" />
                      </span>
                    </div>
                  </li>
                  <li
                    onClick={(event) => signOut(event)}
                    className="mb-5 hover:bg-gray-900 px-1 py-1 rounded flex items-center cursor-pointer"
                  >
                    <span className="mr-2">
                      <LogOut size="18" color="#FFF" />
                    </span>
                    <span className="text-white">Logout</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
