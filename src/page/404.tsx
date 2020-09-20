import React from "react";
import { GitHub } from "react-feather";
import { Link } from "react-router-dom";

const NoRouteMatch: React.FC = () => {
  return (
    <>
      <div className="h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-gray-800 text-lg font-mono font-bold tracking-wide">
            UNDER CONSTRUCTION
          </h1>
          <p className="text-gray-500 text-xs mt-5 font-mono">
            This site is under maintenance sorry for inconvenience
          </p>
          <p className="text-gray-500 text-xs font-mono">
            Back to{" "}
            <Link className="hover:text-red-500 hover:underline " to="/">
              home
            </Link>
          </p>
          <img
            className="mt-10 mr-16"
            src={require("../image/404.png")}
            alt=""
          />
          <div className="flex justify-center mt-20">
            <div
              className="border rounded-full py-3 px-3"
              style={{ borderColor: "#005D7F" }}
            >
              <a href="https://github.com/zneret03/bethlehem">
                <GitHub color="#005D7F" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoRouteMatch;
