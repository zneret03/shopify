import React, { useState } from "react";
import { Divider } from "antd";
import { ShoppingBag, Check } from "react-feather";
import axios from "axios";

//**customerInfo types */
interface PropTypes {
  getCustomerInfo: any[];
}

//**Input types */
interface PropsInput {
  defaultValue: string;
  setEditEmailInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

//**Inputs types */
interface customerInputs {
  items: any[];
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  province: string;
  region: string;
}

//**Assigning input types */
const customerInput: customerInputs = {
  items: [],
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  province: "",
  region: "",
};

//**Inputs reusable purposes */
const Input: React.FC<PropsInput> = ({
  defaultValue,
  setEditEmailInput,
  name,
}) => {
  return (
    <input
      type="text"
      name={name}
      defaultValue={defaultValue}
      onChange={(event) => setEditEmailInput(event)}
      className="border py-1 rounded px-2 hover:border-blue-500 focus:border-blue-500 my-1"
    />
  );
};

const CustomerInfo: React.FC<PropTypes> = ({ getCustomerInfo }) => {
  const [editEmailButton, setEditEmailButton] = useState(false);
  const [editAddressButton, setAddressButton] = useState(false);

  //**Show and hide inputs */
  const showInput = (event: any) => {
    event.preventDefault();
    const contact = event.target.id === "editEmail";
    const address = event.target.id === "editAddress";

    contact && setEditEmailButton(!editEmailButton);
    address && setAddressButton(!editAddressButton);
  };

  const [
    { items, id, email, firstName, lastName, address, province, region },
    setState,
  ] = useState(customerInput);

  //**Get onChange input */
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  //**Get all data and assign to inputs */
  getCustomerInfo &&
    getCustomerInfo.map((customerInfo: any) => {
      return Object.assign(customerInput, customerInfo);
    });

  //**Submit button for all inputs according to button id */
  const onSubmit = (event: any) => {
    event.preventDefault();
    const emailButton = event.target.id === "emailButton";
    const addressButton = event.target.id === "addressButton";

    if (emailButton) {
      const config = { id, email };
      httpRequest(config);
      setEditEmailButton(!editEmailButton);
    }

    if (addressButton) {
      const config = {
        id,
        address,
        province,
        region,
      };
      httpRequest(config);
      setAddressButton(!addressButton);
    }
  };

  const httpRequest = (config: any) => {
    try {
      axios({
        method: "PUT",
        url: "/api/index?name=updateCustomerInformation",
        data: config,
      }).then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="shadow px-5 py-5" key={id}>
        <span className="font-bold text-lg">Customer Information</span>
        <Divider dashed />
        <div className="pt-6 pb-6">
          <div className="flex items-center justify-between">
            <img
              className="lg:w-16 lg:h-16 sm:w-24 sm:h-24 w-16 h-16 rounded-full object-cover"
              src={require("../../image/mockProfile.jpg")}
              alt=""
            />
            <div className="flex items-center">
              <ShoppingBag size="20" color="#8AC0EC" />
              <span className="text-blue-500 font-bold mx-1 lg:text-sm sm:text-xl text-sm">
                {items.length} orders
              </span>
            </div>
          </div>
          <div className="py-3">
            <span className="text-blue-500 font-bold lg:text-sm sm:text-xl text-sm">{`${firstName} ${lastName}`}</span>
          </div>
          <Divider />
          <div>
            <div className="flex items-center justify-between">
              <span className="uppercase font-bold text-xs">Order Contact</span>
              <button
                type="button"
                id="editEmail"
                className="text-blue-500"
                onClick={(event) => showInput(event)}
              >
                Edit
              </button>
            </div>
            <div className="py-3">
              {editEmailButton ? (
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    name="email"
                    defaultValue={email}
                    onChange={(event) => onChange(event)}
                    className="border py-1 rounded px-2 hover:border-blue-500 focus:border-blue-500"
                  />
                  <Check
                    className="cursor-pointer"
                    size="20"
                    color="#00C851"
                    onClick={(event) => onSubmit(event)}
                    id="emailButton"
                  />
                </div>
              ) : (
                <span className="text-blue-500">{email}</span>
              )}
            </div>
          </div>
          <Divider />
          <div>
            <div className="flex items-center justify-between">
              <span className="uppercase font-bold text-xs">
                Shipping Address
              </span>
              <button
                type="button"
                id="editAddress"
                className="text-blue-500"
                onClick={(event) => showInput(event)}
              >
                Edit
              </button>
            </div>
            <div className="py-3">
              {editAddressButton ? (
                <div className="flex items-center justify-between">
                  <div>
                    <Input
                      name={"address"}
                      defaultValue={address}
                      setEditEmailInput={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => onChange(event)}
                    />
                    <Input
                      name={"province"}
                      defaultValue={province}
                      setEditEmailInput={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => onChange(event)}
                    />
                    <Input
                      name={"region"}
                      defaultValue={region}
                      setEditEmailInput={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => onChange(event)}
                    />
                  </div>
                  <Check
                    className="cursor-pointer"
                    size="45"
                    color="#00C851"
                    onClick={(event) => onSubmit(event)}
                    id="addressButton"
                  />
                </div>
              ) : (
                <>
                  <span className="text-blue-500 block">{address}</span>
                  <span className="text-blue-500 block">{province}</span>
                  <span className="text-blue-500 block">{region}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerInfo;
