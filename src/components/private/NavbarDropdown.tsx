import React from "react";
import { Link } from "react-router-dom";
interface PropsTypes {
  toggle: boolean;
  setToggle: any;
  path1: string;
  path2: string;
  path3?: string;
  text1: string;
  text2: string;
  text3?: string;
}

const NavbarDropdown: React.FC<PropsTypes> = ({
  toggle,
  setToggle,
  path1,
  path2,
  path3,
  text1,
  text2,
  text3,
}) => {
  return (
    <ul
      className={`${
        toggle ? "block" : "hidden"
      } shadow absolute bg-gray-900 px-4 py-3 mt-3 font-normal`}
    >
      <Link to={path1} className="text-gray-700">
        <li onClick={setToggle} className="mb-2 cursor-pointer text-white">
          {text1}
        </li>
      </Link>
      <Link to={path2} className="text-gray-700">
        <li onClick={setToggle} className="mb-2 cursor-pointer text-white">
          {text2}
        </li>
      </Link>
      <Link to={path3} className="text-gray-700">
        <li onClick={setToggle} className="cursor-pointer text-white">
          {text3}
        </li>
      </Link>
    </ul>
  );
};

export default NavbarDropdown;
