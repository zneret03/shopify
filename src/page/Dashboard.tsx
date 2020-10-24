import React, { useContext, useEffect } from "react";
import { notification } from "antd";

//*Components
import Header from "../components/private/Header";
import { ProductContext } from "../Context/ProductProvider";
import { DollarSign, Frown, Activity, Package, Box } from "react-feather";
import DashboardCard from "../components/private/DashboardCard";
import { filtered, paidItems, filterTotal } from "../utils/FilteredItems";
import { AuthContext } from "../auth/AuthProvider";
import { TopSalesContext } from "../Context/TopSalesProvider";
import TopSalesTable from "../components/private/TopSalesTable";
import BarChart from "../components/private/BarChart";
import DoughnutChart from "../components/private/DoughnutChart";

const today = new Date().toISOString().substr(0, 10);

const Obj = {
  start: today,
  end: today,
};

const Dashboard: React.FC = () => {
  const { items, criticalStocks } = useContext(ProductContext);
  const { dispatch, soldProduct, monthlySales } = useContext(TopSalesContext);
  const currentUser = useContext(AuthContext);

  //**return current user product posted */
  const filteredProduct = filtered(soldProduct, currentUser);
  //*return all users product
  const productAll = filtered(items, currentUser);
  //** Return paid items only */
  const paidOrders = paidItems(filteredProduct);
  //*returning total purchase
  const totalPurchase = filterTotal(paidOrders);
  //*Critical items
  const criticalItems = filtered(criticalStocks, currentUser);

  //**Assign start and end date into global state
  const despatchItem = () => {
    dispatch({ type: "topSales", payload: { start: Obj.start, end: Obj.end } });
  };

  useEffect(despatchItem, []);

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

  const cardData = [
    {
      title: "Daily Total Sales",
      numberData: `₱${totalPurchase.toLocaleString()}`,
      icon: <DollarSign color="#FFF" size="25" />,
      iconColor: "bg-red-300",
      cardColor: "bg-red-400",
    },
    {
      title: "Products",
      numberData: productAll.length,
      icon: <Package color="#FFF" size="25" />,
      iconColor: "bg-green-300",
      cardColor: "bg-green-400",
    },
    {
      title: "Total Stocks",
      numberData: productAll.reduce((a: any, b: any) => a + b.quantity, 0),
      icon: <Activity color="#FFF" size="25" />,
      iconColor: "bg-orange-300",
      cardColor: "bg-orange-400",
    },
    {
      title: "Critical Items",
      numberData: criticalItems.length,
      icon: <Box color="#FFF" size="25" />,
      iconColor: "bg-blue-300",
      cardColor: "bg-blue-400",
    },
  ];

  return (
    <>
      <Header pageName={"Dashboard"}>
        <div className="grid grid-rows gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
          {cardData.map((data: any, index: number) => (
            <DashboardCard
              key={index}
              icon={data.icon}
              title={data.title}
              numberData={data.numberData}
              iconColor={data.iconColor}
              cardColor={data.cardColor}
            />
          ))}
        </div>
        <div className="lg:flex lg:justify-between">
          <div className="lg:w-11/12 lg:mr-4 w-full shadow-lg rounded-sm">
            {paidOrders.length > 0 ? (
              <BarChart
                topSalesData={paidOrders}
                width="40vw"
                height="70vw"
                axes={true}
                legend={false}
                chartType="bar"
              />
            ) : (
              <div className="text-center py-4">
                <span className="text-lg">Daily Sales Analytics is Empty</span>
              </div>
            )}
          </div>
          <div className="lg:w-3/6 w-full shadow-lg rounded-sm">
            {monthlySales.length ? (
              <DoughnutChart
                soldProduct={monthlySales}
                width="35vw"
                height="30vw"
                axes={false}
                legend={false}
                chartType="doughnut"
              />
            ) : (
              <div className="text-center py-4">
                <span className="text-lg">
                  Monthly Sales Analytics is Empty
                </span>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="mt-4 shadow-lg py-6 px-6">
            <div className="px-4 mb-2">
              <span className="text-lg font-bold">Order Top Sales</span>
            </div>
            <TopSalesTable searchFilter={null} paidOrders={paidOrders} />
          </div>
        </div>
      </Header>
    </>
  );
};
export default Dashboard;
