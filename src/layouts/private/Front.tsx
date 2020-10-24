import React, { useState, useEffect } from "react";
import Sidebar from "../../components/private/Sidebar";
import Navbar from "../../components/private/Navbar";
import { OrderProvider } from "../../Context/OrderProvider";
import { TopSalesProvider } from "../../Context/TopSalesProvider";
import { ReducerProvider } from "../../Context/ReducerProvider";
interface Props {
  children: React.ReactNode;
}

const Front: React.FC<Props> = ({ children }) => {
  const [navbar, setNavbar] = useState<boolean>(false);

  const showNavbar = () => {
    if (window.innerWidth > 1023) {
      setNavbar(true);
      //console.log(window.innerWidth)
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    showNavbar();
    window.addEventListener("resize", showNavbar);
    return () => window.removeEventListener("resize", showNavbar);
  }, []);

  return (
    <ReducerProvider>
      <TopSalesProvider>
        <OrderProvider>
          <React.Fragment>
            <div className={`font-sans ${navbar ? "flex" : null}`}>
              {navbar ? <Sidebar /> : <Navbar />}
              {children}
            </div>
          </React.Fragment>
        </OrderProvider>
      </TopSalesProvider>
    </ReducerProvider>
  );
};

export default Front;
