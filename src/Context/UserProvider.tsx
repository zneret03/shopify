import React, { createContext, useState, useEffect } from "react";
import { app } from "../config/firebase";

interface IContext {
  userInformation: Object[];
}

interface PropTypes {
  children: React.ReactNode;
}

const UserContext = createContext({} as IContext);

const UserProvider: React.FC<PropTypes> = ({ children }) => {
  const [userInformation, setUserInformation] = useState<Object[]>([]);
  const document = app.firestore();

  const fetchUserInformation = () => {
    return document.collection("user").onSnapshot((onSnapshot) => {
      const userData: Object[] = [];
      onSnapshot.docs.forEach((userInfo: any) => {
        userData.push({ ...userInfo.data(), id: userInfo.id });
      });
      setUserInformation(userData);
    });
  };

  useEffect(fetchUserInformation, []);

  return (
    <UserContext.Provider value={{ userInformation }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
