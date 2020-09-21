import React from "react";
import LandingPage from "../components/public/LandingPage";
import NewArival from "../components/public/NewArival";
import Items from "../components/public/Items";
import Category from "../components/public/Category";

const Home: React.FC = () => {
  return (
    <div>
      <div className="font-mono">
        <LandingPage />
        <div className="container mx-auto sm:px-10 px-5">
          <NewArival />
          <Items />
          <Category />
        </div>
      </div>
    </div>
  );
};

export default Home;
