import React, { useState } from "react";
import { X } from "react-feather";
import { withRouter } from "react-router-dom";

interface Props {
  close: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  history: any;
}

const SearchItem: React.SFC<Props> = ({ close, history }) => {
  const [search, setSearch] = useState<string>("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (search) {
      history.push(`/shop?productName=${search}`);
    }
  };

  return (
    <div className="font-mono">
      <div className="absolute w-full h-screen flex items-start justify-center bg-gray-900 bg-opacity-50 py-10">
        <div className="shadow rounded md:max-w-3xl max-w-lg w-full bg-white overflow-hidden">
          <span className="float-right cursor-pointer p-3">
            <X onClick={close} />
          </span>
          <div className="py-5 px-5">
            <form onSubmit={(event) => onSubmit(event)}>
              {/* <span className="text-2xl">Search Items</span> */}
              <input
                onChange={(event) => setSearch(event.target.value)}
                type="text"
                value={search}
                name="search"
                placeholder="Search Product Name"
                className="border w-full rounded text-sm py-2 px-4 border focus:border-red-500"
              />
              <button className="my-3 py-2 px-6 bg-black text-white float-right hover:bg-gray-900">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SearchItem);
