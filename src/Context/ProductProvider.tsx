import React, { createContext, useEffect, useState, useReducer } from "react";
import { app } from "../config/firebase";
interface Props {
  children: React.ReactNode;
}

interface IContext {
  state: any;
  dispatch: any;
  items: object[];
  criticalStocks: object[];
  fetchProd: Object[];
}

const ACTIONS = {
  product: "fetchProduct",
};

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

  const [fetchProd, setFetchProd] = useState([]);

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTIONS.product:
        return [...state, fetchProduct(action.payload.id)];
    }
  };

  const fetchProduct = (id: string) => {
    if (id) {
      const document = app.firestore().collection("product").doc(id);
      return document.onSnapshot((snapshot) => {
        const items_array: object[] = [];
        if (snapshot) {
          items_array.push({ ...snapshot.data() });
          setFetchProd(items_array);
        }
      });
    }
  };

  const [state, dispatch] = useReducer<any>(reducer, []);

  return (
    <ProductContext.Provider
      value={{ items, criticalStocks, fetchProd, state, dispatch }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
