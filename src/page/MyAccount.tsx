import React, { useContext, useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { ChevronRight, ChevronDown } from "react-feather";
//*Components
import Header from "../components/private/Header";
import {
  MyAccountForm,
  MyAccountSocial,
} from "../components/Forms/MyAccountForm";
import ChangeProfile from "../components/private/ChangeProfile";
import { ReducerContext } from "../Context/ReducerProvider";
import { AuthContext } from "../auth/AuthProvider";

interface userType {
  imageUrl: string;
}

const userInfo: userType = {
  imageUrl: "",
};

const MyAccount: React.FC = () => {
  //*Global state
  const { dispatch, toggleSocial, toggleProfile, userInformation } = useContext(
    ReducerContext
  );

  const currentUser: any = useContext(AuthContext);

  userInformation &&
    userInformation.map((data: any) => {
      return Object.assign(userInfo, data);
    });

  //*Toggle Social media
  const isToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    dispatch({ type: "toggleSocial", payload: { toggleSocial: true } });
  };

  //*Toggle profile
  const isToggleChangeProfile = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch({ type: "toggleProfile", payload: { toggleProfile: true } });
  };

  const [toggle, setToggle] = useState(false);

  const toggleAccount = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!toggle) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  const dispatchUser = () => {
    dispatch({ type: "fetchUser", payload: { id: currentUser.uid } });
  };

  useEffect(dispatchUser, [currentUser.uid]);

  //*Animation slider
  const slideAnimation = useSpring({
    transform: toggleProfile ? `translateY(0%)` : `translateY(100%)`,
    opacity: toggleProfile ? 1 : 0,
    height: toggleProfile ? "100%" : "0%",
    width: toggleProfile ? "100%" : "0%",
  });

  //*opacity
  const toggleMyAccount = useSpring({
    opacity: toggle ? 1 : 0,
  });

  return (
    <>
      <ChangeProfile style={slideAnimation} imageUrl={userInfo.imageUrl} />
      <Header pageName="My Account">
        <div className="shadow-lg rounded w-full px-6 py-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={(event) => toggleAccount(event)}
          >
            <span className="font-bold text-lg">Account Setting</span>
            {toggle ? <ChevronDown size="20" /> : <ChevronRight size="20" />}
          </div>
          {toggle && (
            <animated.div
              style={toggleMyAccount}
              className="container mx-auto px-6 py-8 overflow-hidden md:flex"
            >
              <div className="md:mr-8 md:w-2/6">
                <div className="text-center">
                  <div className="pt-6 mb-3 flex justify-center ">
                    <img
                      className="w-40 h-40 object-cover rounded-full cursor-pointer border-solid border-4"
                      src={
                        userInfo.imageUrl
                          ? userInfo.imageUrl
                          : require("../image/Avatar/AvatarMale.png")
                      }
                      onClick={(event) => isToggleChangeProfile(event)}
                      alt=""
                    />
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-lg">Ian Drilon</span>
                    <span className="text-sm block">DrilonIan@yahoo.com</span>
                  </div>
                </div>
                <div className="mt-3">
                  {toggleSocial ? (
                    <MyAccountSocial userInfoArray={userInformation} />
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
                <MyAccountForm userInfoArray={userInformation} />
              </div>
            </animated.div>
          )}
        </div>
      </Header>
    </>
  );
};

export default MyAccount;
