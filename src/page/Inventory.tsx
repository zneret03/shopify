import React, { useState } from "react";
import { Menu } from "antd";
//*Components
import Header from "../components/private/Header";
import { inventoryNavigation } from "../utils/NavMockData";
import CriticalStocks from "../components/private/CriticalStocks";
import TopSales from "../components/private/TopSales";
import Unfulfilled from "../components/private/Unfulfilled";

const Inventory: React.FC = () => {
  const [current, setCurrent] = useState("criticalVaritans");

  const showComponents = (event: any) => {
    const critical = event.key === "criticalVaritans";
    const top = event.key === "topSales";
    const unfulfilled = event.key === "unfulfilleddItems";

    if (critical) {
      current && setCurrent(event.key);
    }

    if (top) {
      current && setCurrent(event.key);
    }

    if (unfulfilled) {
      current && setCurrent(event.key);
    }
  };

  return (
    <>
      <Header pageName={"Inventory"}>
        <div className="flex items-center mb-5">
          {inventoryNavigation.map((nav: any, index: number) => (
            <Menu mode="horizontal" selectedKeys={[current]} key={index}>
              <Menu.Item
                onClick={(event) => showComponents(event)}
                id={nav.id}
                key={nav.key}
              >
                {nav.name}
              </Menu.Item>
            </Menu>
          ))}
        </div>
        {current === "criticalVaritans" && <CriticalStocks />}
        {current === "topSales" && <TopSales />}
        {current === "unfulfilleddItems" && <Unfulfilled />}
      </Header>
    </>
  );
};

export default Inventory;
