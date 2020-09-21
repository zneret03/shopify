import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "react-feather";
import { signOut } from "./Sidebar";
const Navbar: React.FC = () => {
  const [responsive, setResponsive] = useState<boolean>(false);

  useEffect(() => {
    const navbarResize = () => {
      if (window.innerWidth > 472) {
        setResponsive(true);
      } else {
        setResponsive(false);
      }
    };
    navbarResize();
    window.addEventListener("resize", navbarResize);
    return () => window.removeEventListener("resize", navbarResize);
  }, []);

  const [toggleProduct, setToggleProduct] = useState<boolean>(false);

  const toggle = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.preventDefault();
    if (toggleProduct !== true) {
      setToggleProduct(true);
    } else {
      setToggleProduct(false);
    }
  };

  const [menu, setMenu] = useState<boolean>(false);

  const toggleManu = (
    event: React.MouseEvent<HTMLOrSVGElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (menu !== true) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  };

  const linkColor =
    "flex items-center rounded px-2 py-1 hover:bg-blue-500 focus:bg-blue-500";

  return (
    <div>
      <div className="w-full bg-black">
        <div className="shadow">
          <div className="container mx-auto px-3 py-4">
            {responsive ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center font-bold">
                  <Link to="/dashboard" className={`${linkColor} mr-2`}>
                    <span className="text-white">Home</span>
                  </Link>
                  <Link to="/inventory" className={`${linkColor} mr-2`}>
                    <span className="text-white">Inventory</span>
                  </Link>
                  <Link to="/order" className={`${linkColor} mr-2`}>
                    <span className="text-white">Orders</span>
                  </Link>
                  <div>
                    <span
                      className="mr-2 cursor-pointer text-white"
                      onClick={(event) => toggle(event)}
                    >
                      Product
                    </span>
                    <ul
                      className={`${
                        toggleProduct ? "block" : "hidden"
                      } shadow absolute bg-gray-900 px-4 py-3 mt-3`}
                    >
                      <Link to="/dashboard/products/addProducts">
                        <li
                          onClick={() => setToggleProduct(!toggleProduct)}
                          className="mb-2 font-normal text-white"
                        >
                          Add Products
                        </li>
                      </Link>
                      <Link to="/dashboard/products/viewProducts">
                        <li
                          onClick={() => setToggleProduct(!toggleProduct)}
                          className="font-normal text-white"
                        >
                          View Products
                        </li>
                      </Link>
                    </ul>
                  </div>
                  <Link to="" className={`${linkColor} mr-2 `}>
                    <span className="text-white">Settings</span>
                  </Link>
                  <Link to="" className={`${linkColor}`}>
                    <span className="text-white" onClick={signOut}>
                      Logout{" "}
                    </span>
                  </Link>
                </div>
                <div>
                  <img
                    className="w-8 h-8 object-cover rounded-full"
                    src={require("../../image/exampleProfile.jpg")}
                    alt=""
                  />
                </div>
              </div>
            ) : (
              <div>
                <span
                  className="cursor-pointer"
                  onClick={(event) => toggleManu(event)}
                >
                  <Menu className="ml-2" color="#FFF" />
                </span>
                <div className={`${menu ? "block" : "hidden"}`}>
                  <Link to="/dashboard" className={linkColor}>
                    <span className="text-white">Home</span>
                  </Link>
                  <Link to="/inventory" className={linkColor}>
                    <span className="text-white">Inventory</span>
                  </Link>
                  <Link to="/order" className={linkColor}>
                    <span className="text-white">Orders</span>
                  </Link>
                  <div>
                    <span
                      className="mr-5 mt-1 cursor-pointer block hover:bg-blue-500 rounded py-1 px-2 text-white"
                      onClick={(event) => toggle(event)}
                    >
                      Product
                    </span>
                    <ul
                      className={`${
                        toggleProduct ? "block" : "hidden"
                      } shadow absolute bg-gray-900 px-4 py-3 mt-3`}
                    >
                      <Link
                        to="/dashboard/products/addProducts"
                        className="text-gray-700"
                      >
                        <li
                          onClick={() => setToggleProduct(!toggleProduct)}
                          className="mb-2 cursor-pointer text-white"
                        >
                          Add Products
                        </li>
                      </Link>
                      <Link
                        to="/dashboard/products/viewProducts"
                        className="text-gray-700"
                      >
                        <li
                          onClick={() => setToggleProduct(!toggleProduct)}
                          className="cursor-pointer text-white"
                        >
                          View Products
                        </li>
                      </Link>
                    </ul>
                  </div>
                  <Link to="" className={linkColor}>
                    <span className="text-white">Settings</span>
                  </Link>
                  <Link to="" className={linkColor}>
                    <span className="text-white" onClick={() => signOut}>
                      Logout{" "}
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
