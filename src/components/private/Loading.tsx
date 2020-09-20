import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="absolute w-full h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <span className="text-white">Please wait...</span>
    </div>
  );
};

export default Loading;
