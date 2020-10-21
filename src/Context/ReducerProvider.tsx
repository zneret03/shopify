import React, { createContext, useReducer, useState } from "react";

interface IContext {
  toggleSocial: boolean;
  toggleProfile: boolean;
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
};

const ReducerProvider: React.FC<PropTypes> = ({ children }) => {
  const [toggleSocial, setToggleSocial] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);

  //*returnign state actions
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTIONS.toggleSocial:
        return [...state, onCheckSocial(action.payload)];
      case ACTIONS.toggleProfile:
        return [...state, onCheckProfile(action.payload)];
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
      value={{ state, dispatch, toggleSocial, toggleProfile }}
    >
      {children}
    </ReducerContext.Provider>
  );
};

export { ReducerProvider, ReducerContext };
