import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "react-feather";
import { signOut } from "./Sidebar";
import NavbarDropdown from "../private/NavbarDropdown";
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
  const [toggleInventory, setToggleInventory] = useState<boolean>(false);

  const toggle = (event: any) => {
    event.preventDefault();
    const product: boolean = event.target.id === "product";
    const inventory: boolean = event.target.id === "inventory";
    if (product) {
      if (!toggleProduct) {
        setToggleProduct(true);
        setToggleInventory(false);
      } else {
        setToggleProduct(false);
      }
    }

    if (inventory) {
      if (!toggleInventory) {
        setToggleInventory(true);
        setToggleProduct(false);
      } else {
        setToggleInventory(false);
      }
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
                  <div>
                    <span
                      className="mr-2 cursor-pointer text-white"
                      id="inventory"
                      onClick={(event) => toggle(event)}
                    >
                      Inventory
                    </span>
                    <NavbarDropdown
                      toggle={toggleInventory}
                      setToggle={() => setToggleInventory(!toggleInventory)}
                      path1="/dashboard/manage-category"
                      path2="/dashboard/inventory"
                      text1="Manage Category"
                      text2="Reports"
                    />
                  </div>
                  <Link to="/dashboard/order" className={`${linkColor} mr-2`}>
                    <span className="text-white">Orders</span>
                  </Link>
                  <div>
                    <span
                      className="mr-2 cursor-pointer text-white"
                      id="product"
                      onClick={(event) => toggle(event)}
                    >
                      Product
                    </span>
                    <NavbarDropdown
                      toggle={toggleProduct}
                      setToggle={() => setToggleProduct(!toggleProduct)}
                      path1="/dashboard/products/addProducts"
                      path2="/dashboard/products/viewProducts"
                      text1="Add Product"
                      text2="View Product"
                    />
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
                  <span
                    className="mr-2 cursor-pointer text-white"
                    id="inventory"
                    onClick={(event) => toggle(event)}
                  >
                    Inventory
                  </span>
                  <NavbarDropdown
                    toggle={toggleInventory}
                    setToggle={() => setToggleInventory(!toggleInventory)}
                    path1="/dashboard/manage-category"
                    path2="/dashboard/inventory"
                    text1="Manage Category"
                    text2="Reports"
                  />
                  <Link to="/order" className={linkColor}>
                    <span className="text-white">Orders</span>
                  </Link>
                  <div>
                    <span
                      className="mr-5 mt-1 cursor-pointer block hover:bg-blue-500 rounded py-1 px-2 text-white"
                      onClick={(event) => toggle(event)}
                      id="product"
                    >
                      Product
                    </span>
                    <NavbarDropdown
                      toggle={toggleProduct}
                      setToggle={() => setToggleProduct(!toggleProduct)}
                      path1="/dashboard/products/addProducts"
                      path2="/dashboard/products/viewProducts"
                      text1="Add Product"
                      text2="View Product"
                    />
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
