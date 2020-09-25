import React from "react";
import { Link } from "react-router-dom";

interface PropsType {
  path: string;
  title: string;
  text: string;
  className: string;
}

const Button: React.FC<PropsType> = ({ path, text, title, className }) => {
  return (
    <div className={className}>
      <div className="text-center">
        <span className="block mb-4">{title}</span>
        <Link
          to={path}
          className="uppercase tracking-wide font-bold border py-2 px-8 mt-2 bg-gray-900 text-white hover:text-white hover:bg-gray-700 rounded"
        >
          {text}
        </Link>
      </div>
    </div>
  );
};

export default Button;
