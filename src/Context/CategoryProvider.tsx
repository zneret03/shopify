import React, { createContext, useEffect, useState } from "react";
import { app } from "../config/firebase";

interface Props {
  children: React.ReactNode;
}

interface IContext {
  fetchCategory: Object[];
}

const CategoryContext = createContext({} as IContext);

const CategoryProvider: React.FC<Props> = ({ children }) => {
  const [fetchCategory, setFetchCategory] = useState<Object[]>([]);

  useEffect(() => {
    const document = app.firestore();
    return document.collection("Category").onSnapshot((onSnapshot: any) => {
      const categoryInformation: Object[] = [];

      onSnapshot.docs.forEach((category: any) => {
        categoryInformation.push({ ...category.data(), id: category.id });
      });
      setFetchCategory(categoryInformation);
    });
  }, []);

  return (
    <CategoryContext.Provider value={{ fetchCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryProvider, CategoryContext };
