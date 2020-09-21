import React, { useState, useEffect } from "react";
import Header from "../components/private/Header";
import { app } from "../config/firebase";
import Back from "../utils/Back";
/**Components */
import OrderInfo from "../components/private/OrderInfo";
import CustomerInfo from "../components/private/CustomerInfo";

const OrderInformation: React.FC = (props: any) => {
  const params = new URLSearchParams(props.location.search);
  const getId = params.get("id");
  const customerId = params.get("customerId");
  const document = app.firestore();

  const [getOrder, setGetOrder] = useState({ orderArr: [] });
  const [getCustomerInfo, setGetCustomerInfo] = useState({ customerArr: [] });

  const getCustomerData = (id: string) => {
    const customerArray = [];
    const fetchCustomer = document.collection("customerInformation").doc(id);
    return fetchCustomer.onSnapshot((getCustomerData) => {
      customerArray.push({
        ...getCustomerData.data(),
        id: getCustomerData.id,
      });

      getCustomerData &&
        setGetCustomerInfo({ customerArr: [...customerArray] });
    });

    //console.log(getCustomerData.data());
  };

  const fetchProduct = () => {
    (async () => {
      const itemsArray = [];
      const getItems = document.collection("transaction").doc(getId);
      const itemsData = await getItems.get();
      itemsArray.push({ ...itemsData.data(), id: itemsData.id });
      if (itemsData) {
        setGetOrder({ orderArr: [...itemsArray] });
        getCustomerData(itemsData.data().customerId);
      }
    })();
  };

  useEffect(fetchProduct, [getId]);

  if (
    getOrder.orderArr.length <= 0 &&
    getCustomerInfo.customerArr.length <= 0
  ) {
    return (
      <div className="h-screen w-screen md:pl-64 flex items-center justify-center">
        Please wait...
      </div>
    );
  }

  /**Adding order information add edit and delete */
  return (
    <>
      <Header pageName={`Order Information`}>
        <Back path={`/order/customerOrders?id=${customerId}`} />
        <div className="lg:flex">
          {/**Order Details */}
          {getOrder.orderArr && <OrderInfo getOrder={getOrder.orderArr} />}
          {/**Customer Information */}
          <div className="lg:w-1/2 w-full rounded lg:p-0 pt-4">
            {getCustomerInfo.customerArr && (
              <CustomerInfo getCustomerInfo={getCustomerInfo.customerArr} />
            )}
          </div>
        </div>
      </Header>
    </>
  );
};

export default OrderInformation;
