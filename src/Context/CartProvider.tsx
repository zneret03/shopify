import React, { createContext, useEffect, useState } from "react";
import { app } from "../config/firebase";
import { MyDateString } from "../utils/mockData";
interface Props {
  children: React.ReactNode;
}

interface IContext {
  cartItems: Object[];
  unfulfilled: Object[];
}

const CartContext = createContext({} as IContext);

const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Object[]>([]);
  const [unfulfilled, setUnfulfilled] = useState<Object[]>([]);

  const fetchUnFulFilled = () => {
    const document = app.firestore();
    return document
      .collection("transaction")
      .where("status.itemStatus", "==", "pending")
      .onSnapshot((onsnapshot) => {
        const productData: Object[] = [];
        onsnapshot.docs.forEach((item: any) => {
          productData.push({ ...item.data(), id: item.id });
        });
        setUnfulfilled(productData);
      });
  };

  useEffect(fetchUnFulFilled, []);

  const fetchDataTransaction = () => {
    const document = app.firestore();
    return document
      .collection("transaction")
      .where("date_created", "==", MyDateString)
      .onSnapshot((onsnapshot) => {
        const productData: Object[] = [];
        onsnapshot.docs.forEach((item: any) => {
          productData.push({ ...item.data(), id: item.id });
        });
        setCartItems(productData);
      });
  };

  useEffect(fetchDataTransaction, []);

  return (
    <CartContext.Provider value={{ cartItems, unfulfilled }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
