import React, { useContext } from "react";
import { useSpring } from "react-spring";

//*Components
import Header from "../components/private/Header";
import {
  MyAccountForm,
  MyAccountSocial,
} from "../components/Forms/MyAccountForm";
import ChangeProfile from "../components/private/ChangeProfile";
import { ReducerContext } from "../Context/ReducerProvider";
import { UserContext } from "../Context/UserProvider";

interface userType {
  city: string;
  email: string;
  facebook: string;
  firstname: string;
  id: string;
  imageUrl: string;
  instagram: string;
  lastname: string;
  state: string;
  twitter: string;
  zipcode: string;
}

const userInfo: userType = {
  city: "",
  email: "",
  facebook: "",
  firstname: "",
  id: "",
  imageUrl: "",
  instagram: "",
  lastname: "",
  state: "",
  twitter: "",
  zipcode: "",
};

const MyAccount: React.FC = () => {
  //*Global state
  const { dispatch, toggleSocial, toggleProfile } = useContext(ReducerContext);

  const { userInformation } = useContext(UserContext);

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

  //*Animation slider
  const slideAnimation = useSpring({
    transform: toggleProfile ? `translateY(0%)` : `translateY(100%)`,
    opacity: toggleProfile ? 1 : 0,
    height: toggleProfile ? "100%" : "0%",
    width: toggleProfile ? "100%" : "0%",
  });

  return (
    <>
      <ChangeProfile style={slideAnimation} imageUrl={userInfo.imageUrl} />
      <Header pageName="My Account">
        <div className="container mx-auto px-6 md:flex">
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
                <MyAccountSocial userInfo={userInfo} />
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
            <MyAccountForm userInfo={userInfo} />
          </div>
        </div>
      </Header>
    </>
  );
};

export default MyAccount;
