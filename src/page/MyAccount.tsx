import React, { useState } from "react";
import Header from "../components/private/Header";
import {
  MyAccountForm,
  MyAccountSocial,
} from "../components/Forms/MyAccountForm";

const MyAccount = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const isToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (!toggle) return setToggle(true);
    if (toggle) return setToggle(false);
  };

  return (
    <Header pageName="My Account">
      <div className="container mx-auto px-6 md:flex">
        <div className="md:mr-8 md:w-2/6">
          <div className="text-center">
            <div className="pt-6 mb-3 flex justify-center">
              <img
                className="w-40 h-40 object-cover rounded-full border-solid border-4 border-green-500"
                src={require("../image/exampleProfile.jpg")}
                alt=""
              />
            </div>
            <div className="text-center">
              <span className="font-bold text-lg">Ian Drilon</span>
              <span className="text-sm block">DrilonIAn@yahoo.com</span>
            </div>
          </div>
          <div className="mt-3">
            {toggle ? (
              <MyAccountSocial
                onClick={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => isToggle(event)}
              />
            ) : (
              <button
                onClick={(event) => isToggle(event)}
                type="button"
                className="w-full py-1 border hover:bg-gray-100 rounded"
              >
                Edit
              </button>
            )}
          </div>
        </div>
        <div className="md:w-full pt-6">
          <MyAccountForm />
        </div>
      </div>
    </Header>
  );
};

export default MyAccount;
