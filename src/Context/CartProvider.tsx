import React, { createContext, useEffect, useState } from "react";
import { app } from "../config/firebase";
import { months } from "../utils/mockData";

interface Props {
  children: React.ReactNode;
}

interface IContext {
  cartItems: object[];
}

const CartContext = createContext({} as IContext);

const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<object[]>([]);

  const today = new Date();
  const dateToday = `${
    months[today.getMonth()]
  } ${today.getDate()}, ${today.getFullYear()}`;

  const fetchDataTransaction = () => {
    const document = app.firestore();
    return document
      .collection("transaction")
      .where("date_created", "==", dateToday)
      .onSnapshot((onsnapshot) => {
        const productData: object[] = [];
        onsnapshot.docs.forEach((item: any) => {
          productData.push({ ...item.data(), id: item.id });
        });
        setCartItems(productData);
      });
  };

  useEffect(fetchDataTransaction, []);

  return (
    <CartContext.Provider value={{ cartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
