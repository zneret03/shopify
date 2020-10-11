import React, { createContext, useReducer, useState } from "react";
import { app } from "../config/firebase";
interface iContext {
  state: any;
  dispatch: any;
  soldProduct: Object[];
}

interface Proptypes {
  children: any;
}

const ACTIONS = {
  topSales: "topSales",
};

const TopSalesContext = createContext({} as iContext);

const TopSalesProvider: React.FC<Proptypes> = ({ children }) => {
  const document = app.firestore();

  const [soldProduct, setSoldProduct] = useState([]);

  const fetchTopSales = (start: string, end: string) => {
    return document
      .collection("transaction")
      .where("date_created", ">=", start)
      .where("date_created", "<=", end)
      .limit(10)
      .onSnapshot((onsnapshot) => {
        const productData: Object[] = [];
        onsnapshot.docs.forEach((item: any) => {
          productData.push({ ...item.data(), id: item.id });
        });
        setSoldProduct(productData);
      });
  };

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTIONS.topSales:
        return [
          ...state,
          fetchTopSales(action.payload.start, action.payload.end),
        ];
    }
  };

  const [state, dispatch] = useReducer<any>(reducer, []);

  return (
    <TopSalesContext.Provider value={{ state, dispatch, soldProduct }}>
      {children}
    </TopSalesContext.Provider>
  );
};

export { TopSalesProvider, TopSalesContext };
