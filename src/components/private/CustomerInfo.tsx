import React, { useState } from "react";
import { Divider } from "antd";
import { ShoppingBag, Check } from "react-feather";

interface PropTypes {
  getCustomerInfo: any[];
}

interface customerInputs {
  address: string;
  province: string;
  region: string;
}

const customerInput: customerInputs = {
  address: "",
  province: "",
  region: "",
};

interface PropsInput {
  defaultValue: string;
  setEditEmailInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

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

  /**Show and hide inputs */
  const showInput = (event: any) => {
    event.preventDefault();
    const contact = event.target.id === "editEmail";
    const address = event.target.id === "editAddress";

    contact && setEditEmailButton(!editEmailButton);
    address && setAddressButton(!editAddressButton);
  };

  //const [editAddressInput, setAddressInput] = useState("");
  const [editEmailInput, setEditEmailInput] = useState("");
  const [{ address, province, region }, setState] = useState(customerInput);

  //**Get onChange input */
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  /**Submit button for all inputs according to button id */
  const onSubmit = (event: any) => {
    event.preventDefault();
    const emailButton = event.target.id === "emailButton";
    const addressButton = event.target.id === "addressButton";

    emailButton && console.log(editEmailInput);
    if (addressButton) {
      console.log({ address, province, region });
    }
  };

  return (
    <>
      {getCustomerInfo.map((customerInfo: any) => (
        <form
          className="shadow px-5 py-5"
          key={customerInfo.id}
          onSubmit={(event) => onSubmit(event)}
        >
          <span className="font-bold text-lg">Customer Information</span>
          <Divider dashed />
          <div className="pt-6 pb-6">
            <div className="flex items-center justify-between">
              <img
                className="w-16 h-16 rounded-full object-cover"
                src={require("../../image/mockProfile.jpg")}
                alt=""
              />
              <div className="flex items-center">
                <ShoppingBag size="20" color="#8AC0EC" />
                <span className="text-blue-500 font-bold mx-1">
                  {customerInfo.items.length} orders
                </span>
              </div>
            </div>
            <div className="py-3">
              <span className="text-blue-500 font-bold">{`${customerInfo.firstName} ${customerInfo.lastName}`}</span>
            </div>
            <Divider />
            <div>
              <div className="flex items-center justify-between">
                <span className="uppercase font-bold text-xs">
                  Order Contact
                </span>
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
                      defaultValue={customerInfo.email}
                      onChange={(event) =>
                        setEditEmailInput(event.target.value)
                      }
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
                  <span className="text-blue-500">{customerInfo.email}</span>
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
                        defaultValue={customerInfo.address}
                        setEditEmailInput={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => onChange(event)}
                      />
                      <Input
                        name={"province"}
                        defaultValue={customerInfo.province}
                        setEditEmailInput={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => onChange(event)}
                      />
                      <Input
                        name={"region"}
                        defaultValue={customerInfo.region}
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
                    <span className="text-blue-500 block">
                      {customerInfo.address}
                    </span>
                    <span className="text-blue-500 block">
                      {customerInfo.province}
                    </span>
                    <span className="text-blue-500 block">
                      {customerInfo.region}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      ))}
    </>
  );
};

export default CustomerInfo;
