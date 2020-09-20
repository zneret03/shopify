import React, { createContext, useEffect, useState } from "react";
import { app } from "../config/firebase";
interface Props {
  children: React.ReactNode;
}

interface IContext {
  customerInfo: object[];
}

const OrderContext = createContext({} as IContext);

const OrderProvider: React.FC<Props> = ({ children }) => {
  const [customerInfo, setCustomerInfo] = useState<object[]>([]);

  useEffect(() => {
    const document = app.firestore();
    return document
      .collection("customerInformation")
      .onSnapshot((onsnapshot) => {
        const customerInformationData: object[] = [];
        onsnapshot.docs.forEach((item: any) => {
          customerInformationData.push({ ...item.data(), id: item.id });
        });
        setCustomerInfo(customerInformationData);
      });
  }, []);

  return (
    <OrderContext.Provider value={{ customerInfo }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider, OrderContext };
