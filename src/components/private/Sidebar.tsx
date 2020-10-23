import React, { useContext, useState } from "react";
import { app } from "../../config/firebase";
import { AuthContext } from "../../auth/AuthProvider";
import { UserContext } from "../../Context/UserProvider";
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
import { getuserUid } from "../../utils/FilteredItems";

export const signOut = (
  event: React.MouseEvent<HTMLSpanElement, MouseEvent>
) => {
  event.preventDefault();
  app.auth().signOut();
};

interface userImageType {
  imageUrl: string;
}

const userImage: userImageType = {
  imageUrl: "",
};

const Sidebar: React.FC = () => {
  const currentUser: any = useContext(AuthContext);
  const { userInformation } = useContext(UserContext);
  const [menu, setMenu] = useState<boolean>(false);

  userInformation &&
    userInformation.map((info: any) => {
      return Object.assign(userImage, info);
    });

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

  //**Toggle products */
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

  //**Toggle inventory */
  const [inventory, setInventory] = useState(false);

  const openInventory = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    if (!inventory) {
      return setInventory(true);
    } else {
      return setInventory(false);
    }
  };

  //**Settings inventory */
  const [settings, setSettings] = useState(false);

  const openSettings = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    if (!settings) {
      return setSettings(true);
    } else {
      return setSettings(false);
    }
  };

  const [name, setName] = useState(null);

  //**Get username */
  getuserUid(currentUser, app).then((data: any) => {
    if (data) {
      setName(data);
    }
  });

  return (
    <aside className="sm:w-1/4 md:w-1/4 lg:w-1/5 fixed">
      <div className={`shadow-lg md:block bg-black h-screen overflow-auto`}>
        <div className="px-6">
          <div>
            <div className="pt-6 flex justify-center">
              <img
                className="w-32 h-32 object-cover rounded-full border-solid border-4 border-blue-500"
                src={
                  userImage.imageUrl
                    ? userImage.imageUrl
                    : require("../../image/Avatar/AvatarMale.png")
                }
                alt=""
              />
            </div>
            <div className="text-center mt-2">
              <span className="font-bold text-lg text-white">
                {name || currentUser.displayName ? (
                  <span>{`${name || currentUser.displayName}`} </span>
                ) : (
                  "Loading..."
                )}
              </span>
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
                <li
                  className="mb-5 cursor-pointer ml-2"
                  onClick={(event) => openInventory(event)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-2">
                        <Folder size="18" color="#FFF" />
                      </span>
                      <span className="text-white">Inventory</span>
                    </div>
                    <span>
                      {inventory ? (
                        <ChevronDown size="18" color="#FFF" />
                      ) : (
                        <ChevronRight size="18" color="#FFF" />
                      )}
                    </span>
                  </div>
                  <div
                    className={`${
                      inventory ? "block" : "hidden"
                    } ml-2 mt-2 font-normal`}
                  >
                    <ul>
                      <Link
                        to="/dashboard/manage-category"
                        className="flex items-center justify-between hover:bg-blue-500 px-2 rounded py-1"
                      >
                        <li className=" text-white">Manager Category</li>
                      </Link>
                      <Link
                        to="/dashboard/stockManagement"
                        className="flex items-center justify-between hover:bg-blue-500  px-2 rounded py-1"
                      >
                        <li className="text-white">Stock Management</li>
                      </Link>
                      <Link
                        to="/dashboard/inventory"
                        className="flex items-center justify-between hover:bg-blue-500  px-2 rounded py-1"
                      >
                        <li className="text-white">Reports</li>
                      </Link>
                    </ul>
                  </div>
                </li>
                <li className="mb-5 cursor-pointer">
                  <Link
                    to="/dashboard/order"
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
                        <li className=" text-white">Add Product</li>
                      </Link>
                      <Link
                        to="/dashboard/products/viewProducts"
                        className="flex items-center justify-between hover:bg-blue-500  px-2 rounded py-1"
                      >
                        <li className="text-white">View Product</li>
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
                <li
                  className="px-1 py-1 rounded cursor-pointer"
                  onClick={(event) => openSettings(event)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-2">
                        <Settings size="18" color="#FFF" />
                      </span>
                      <span className="text-white">Settings</span>
                    </div>
                    <span>
                      {settings ? (
                        <ChevronDown size="18" color="#FFF" />
                      ) : (
                        <ChevronRight size="18" color="#FFF" />
                      )}
                    </span>
                  </div>
                  <div
                    className={`${
                      settings ? "block" : "hidden"
                    } ml-2 mt-2 font-normal`}
                  >
                    <ul>
                      <Link
                        to="/dashboard/myAccount"
                        className="flex items-center justify-between hover:bg-blue-500 px-2 rounded py-1"
                      >
                        <li className=" text-white">My account</li>
                      </Link>
                    </ul>
                  </div>
                  <span>
                    <ChevronRight size="18" />
                  </span>
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
    </aside>
  );
};

export default Sidebar;
