import React, { createContext, useEffect, useState } from "react";
import { app } from "../config/firebase";
interface Props {
  children: React.ReactNode;
}

interface IContext {
  items: object[];
  criticalStocks: object[];
}

const ProductContext = createContext({} as IContext);

const ProductProvider: React.FC<Props> = ({ children }) => {
  const [criticalStocks, setCriticalStocks] = useState<object[]>([]);
  const document = app.firestore();

  const fetchCriticProduct = () => {
    return document
      .collection("product")
      .where("quantity", "<", 10)
      .onSnapshot((onsnapshot) => {
        const productData: object[] = [];
        onsnapshot.docs.forEach((item: any) => {
          productData.push({ ...item.data(), id: item.id });
        });
        setCriticalStocks(productData);
      });
  };

  useEffect(fetchCriticProduct, []);

  const [items, setItems] = useState<object[]>([]);

  const fetchAllProducts = () => {
    return document.collection("product").onSnapshot((onsnapshot) => {
      const productData: object[] = [];
      onsnapshot.docs.forEach((item: any) => {
        productData.push({ ...item.data(), id: item.id });
      });
      setItems(productData);
    });
  };

  useEffect(fetchAllProducts, []);

  return (
    <ProductContext.Provider value={{ items, criticalStocks }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
