import React, { useContext, useEffect } from "react";
import Header from "../components/private/Header";
import { notification } from "antd";
import { Frown } from "react-feather";
import { ProductContext } from "../Context/ProductProvider";
const Dashboard: React.FC = () => {
  const { criticalStocks } = useContext(ProductContext);

  //*Pop up notification for critical stocks
  const popNotification = () => {
    criticalStocks.length > 0 &&
      notification.open({
        message: "Warning!!!",
        description: `${criticalStocks.length} Critical Stocks`,
        icon: <Frown size="25" color="#FF0000" />,
      });
  };

  useEffect(popNotification, []);

  return (
    <>
      <Header pageName={"Dashboard"}>
        <span>Hi</span>
      </Header>
    </>
  );
};
export default Dashboard;
