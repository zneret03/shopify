import React from "react";
const CallToAction: React.SFC = () => {
  return (
    <>
      <div className="mt-10">
        <div
          className="flex items-center flex-wrap justify-center justify-between py-10 lg:px-64 px-16"
          style={{ backgroundColor: "#ECF037" }}
        >
          <div className="leading-10 text-black">
            <span className="block sm:text-3xl text-2xl font-bold">
              DISCOVER SOME MORE!
            </span>
            <span className="block sm:text-sm text-xs">
              You gonna love this one!
            </span>
          </div>
          <div className="sm:mt-0 mt-5">
            <div className="font-sans sm:flex sm:items-center sm:flex-row flex-col">
              <input
                className="sm:px-6 w-full px-3 sm:py-2 py-1 text-xl"
                type="text"
                placeholder="Email Address"
              />
              <button className="sm:py-3 py-3 sm:px-4 w-full sm:mt-0 mt-2 bg-black text-white hover:bg-gray-500 uppercase font-bold tracking-widest">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallToAction;
