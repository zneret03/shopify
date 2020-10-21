import React, { useContext } from "react";
import Header from "../components/private/Header";
import {
  MyAccountForm,
  MyAccountSocial,
} from "../components/Forms/MyAccountForm";
import { useSpring } from "react-spring";

//*Components
import ChangeProfile from "../components/private/ChangeProfile";
import { ReducerContext } from "../Context/ReducerProvider";

const MyAccount = () => {
  const { dispatch, toggleSocial, toggleProfile } = useContext(ReducerContext);

  console.log(toggleProfile);

  const isToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    dispatch({ type: "toggleSocial", payload: { toggleSocial: true } });
  };

  const isToggleChangeProfile = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch({ type: "toggleProfile", payload: { toggleProfile: true } });
  };

  const slideAnimation = useSpring({
    transform: toggleProfile ? `translateY(0)` : `translateY(100%)`,
    opacity: toggleProfile ? 1 : 0,
  });

  return (
    <>
      <ChangeProfile style={slideAnimation} />
      <Header pageName="My Account">
        <div className="container mx-auto px-6 md:flex">
          <div className="md:mr-8 md:w-2/6">
            <div className="text-center">
              <div className="pt-6 mb-3 flex justify-center ">
                <img
                  className="w-40 h-40 object-cover rounded-full cursor-pointer border-solid border-4 border-green-500"
                  src={require("../image/exampleProfile.jpg")}
                  onClick={(event) => isToggleChangeProfile(event)}
                  alt=""
                />
              </div>
              <div className="text-center">
                <span className="font-bold text-lg">Ian Drilon</span>
                <span className="text-sm block">DrilonIAn@yahoo.com</span>
              </div>
            </div>
            <div className="mt-3">
              {toggleSocial ? (
                <MyAccountSocial />
              ) : (
                <>
                  <button
                    onClick={(event) => isToggle(event)}
                    type="button"
                    className="w-full py-1 border hover:bg-gray-100 rounded"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="md:w-full pt-6">
            <MyAccountForm />
          </div>
        </div>
      </Header>
    </>
  );
};

export default MyAccount;
