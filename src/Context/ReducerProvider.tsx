import React, { createContext, useReducer, useState } from "react";
import { app } from "../config/firebase";

interface IContext {
  toggleSocial: boolean;
  toggleProfile: boolean;
  userInformation: Object[];
  state: any;
  dispatch: any;
}

interface PropTypes {
  children: React.ReactNode;
}

const ReducerContext = createContext({} as IContext);

const ACTIONS = {
  toggleSocial: "toggleSocial",
  toggleProfile: "toggleProfile",
  fetchUser: "fetchUser",
};

const ReducerProvider: React.FC<PropTypes> = ({ children }) => {
  const [toggleSocial, setToggleSocial] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  const [userInformation, setUserInformation] = useState<Object[]>([]);

  const fetchUserInformation = (id: string) => {
    if (id) {
      const document = app.firestore().collection("user").doc(id);
      return document.onSnapshot((onSnapshot) => {
        const userData: Object[] = [];
        if (onSnapshot) {
          userData.push({ ...onSnapshot.data(), id: onSnapshot.id });
          setUserInformation(userData);
        }
      });
    }
  };

  //*returnign state actions
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTIONS.toggleSocial:
        return [...state, onCheckSocial(action.payload)];
      case ACTIONS.toggleProfile:
        return [...state, onCheckProfile(action.payload)];
      case ACTIONS.fetchUser:
        return [...state, fetchUserInformation(action.payload.id)];
    }
  };

  //*Check toggle Social if true or false
  const onCheckSocial = (check: any) => {
    console.log(check.toggleProfile);
    if (check.toggleSocial) return setToggleSocial(true);
    if (!check.toggleSocial) return setToggleSocial(false);
  };

  //*Check toggle profile if true or false
  const onCheckProfile = (check: any) => {
    if (check.toggleProfile) return setToggleProfile(true);
    if (!check.toggleProfile) return setToggleProfile(false);
  };

  const [state, dispatch] = useReducer<any>(reducer, []);

  return (
    <ReducerContext.Provider
      value={{ state, dispatch, toggleSocial, toggleProfile, userInformation }}
    >
      {children}
    </ReducerContext.Provider>
  );
};

export { ReducerProvider, ReducerContext };
