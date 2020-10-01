import React, { createContext, useEffect, useState } from "react";
import { app } from "../config/firebase";
import { months } from "../utils/mockData";

interface Props {
  children: React.ReactNode;
}

interface IContext {
  cartItems: Object[];
  topSales: Object[];
}

const CartContext = createContext({} as IContext);

const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Object[]>([]);
  const [topSales, setTopSales] = useState<Object[]>([]);

  const today = new Date();
  const dateToday = `${
    months[today.getMonth()]
  } ${today.getDate()}, ${today.getFullYear()}`;

  const fetchTopSales = () => {
    const document = app.firestore();
    return document
      .collection("transaction")
      .orderBy("product", "asc")
      .limit(10)
      .onSnapshot((onsnapshot) => {
        const productData: Object[] = [];
        onsnapshot.docs.forEach((item: any) => {
          productData.push({ ...item.data(), id: item.id });
        });
        setTopSales(productData);
      });
  };

  useEffect(fetchTopSales, []);

  const fetchDataTransaction = () => {
    const document = app.firestore();
    return document
      .collection("transaction")
      .where("date_created", "==", dateToday)
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
    <CartContext.Provider value={{ cartItems, topSales }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
