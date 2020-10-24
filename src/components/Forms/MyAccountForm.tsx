import React, { useContext, useState } from "react";
import { Divider } from "antd";
import { Facebook, Twitter, Instagram } from "react-feather";
import { Spin } from "antd";

//*Components
import httpRequest from "../../api/httpRequest";
import { ReducerContext } from "../../Context/ReducerProvider";
import { AuthContext } from "../../auth/AuthProvider";

interface socialTypes {
  facebook: string;
  twitter: string;
  instagram: string;
}

interface PropTypes {
  userInfoArray: Object[];
}

//*Reusable function of rest api
const request = async (config: any, name: string) => {
  await httpRequest.put(
    `/.netlify/functions/index?name=${name}&&component=userInformationComponent`,
    config
  );
};

//*Returning input value on listen
const inputListener = (prevState: any, name: string, value: string) => {
  return { ...prevState, [name]: value };
};

//*Convert Array Object into Object
const objectAssign = (ObjectArray: Object[], obj: any) => {
  return ObjectArray.map((info: any) => {
    return Object.assign(obj, info);
  });
};

//*For MyAccount Social
const MyAccountSocial: React.FC<PropTypes> = ({ userInfoArray }) => {
  const { dispatch, toggleSocial } = useContext(ReducerContext);
  const currentUser: any = useContext(AuthContext);
  const [Spinner, setSpinner] = useState(false);
  const social: socialTypes = {
    facebook: "",
    twitter: "",
    instagram: "",
  };

  userInfoArray && objectAssign(userInfoArray, social);
  const [{ facebook, twitter, instagram }, setState] = useState(social);

  //*On Change function
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setState((prevState) => inputListener(prevState, name, value));
  };

  const Loading = () => setSpinner(true);

  //*On Submit function
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    Loading();

    const config = {
      id: currentUser.uid,
      facebook,
      twitter,
      instagram,
    };

    request(config, "updateSocial").then(() => {
      setTimeout(() => {
        setSpinner(false);
      }, 4000);
    });
  };

  return (
    <Spin spinning={Spinner}>
      <form
        className="grid grid-rows gap-2"
        onSubmit={(event) => onSubmit(event)}
      >
        <div className="flex items-center">
          <i className="mr-2">
            <Facebook size="20" />
          </i>
          <input
            type="url"
            defaultValue={facebook}
            name="facebook"
            className="border py-1 px-3 w-full rounded-sm focus:outline-none focus:shadow-outline"
            onChange={(event) => onChange(event)}
            placeholder="facebook"
          />
        </div>
        <div className="flex items-center">
          <i className="mr-2">
            <Twitter size="20" />
          </i>
          <input
            type="url"
            defaultValue={twitter}
            name="twitter"
            className="border py-1 px-3 w-full rounded-sm focus:outline-none focus:shadow-outline"
            onChange={(event) => onChange(event)}
            placeholder="twitter"
          />
        </div>
        <div className="flex items-center">
          <i className="mr-2">
            <Instagram size="20" />
          </i>
          <input
            type="url"
            defaultValue={instagram}
            name="instagram"
            className="border py-1 px-3 w-full rounded-sm focus:outline-none focus:shadow-outline"
            onChange={(event) => onChange(event)}
            placeholder="instagram"
          />
        </div>
        <div className="flex justify-end mt-3">
          <button
            className="px-4 mr-1 py-1 rounded border hover:bg-gray-100"
            onClick={() =>
              dispatch({
                type: "toggleSocial",
                payload: { toggleSocial: !toggleSocial },
              })
            }
          >
            cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1 rounded bg-green-400 hover:bg-green-300 text-white"
          >
            save
          </button>
        </div>
      </form>
    </Spin>
  );
};

interface userInfoTypes {
  firstname: string;
  lastname: string;
  email: string;
  city: string;
  state: string;
  zipcode: string;
}
//*For My Account Form

const MyAccountForm: React.FC<PropTypes> = ({ userInfoArray }) => {
  const currentUser: any = useContext(AuthContext);
  const userInfo: userInfoTypes = {
    firstname: "",
    lastname: "",
    email: "",
    city: "",
    state: "",
    zipcode: "",
  };

  userInfoArray && objectAssign(userInfoArray, userInfo);

  const [
    { firstname, lastname, email, city, state, zipcode },
    setState,
  ] = useState(userInfo);

  //*On Change function
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setState((prevState) => inputListener(prevState, name, value));
  };

  const [readOnly, setReadOnly] = useState(true);

  const isReadOnly = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.preventDefault();
    readOnly ? setReadOnly(false) : setReadOnly(true);
  };

  const [Spinner, setSpinner] = useState(false);

  const Loading = () => setSpinner(true);

  //*On Submit function
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Loading();
    const config = {
      id: currentUser.uid,
      firstname,
      lastname,
      email,
      city,
      state,
      zipcode,
    };
    request(config, "updateInformation").then(() => {
      setTimeout(() => {
        setSpinner(false);
      }, 4000);
    });
  };

  return (
    <Spin spinning={Spinner}>
      <form onSubmit={(event) => onSubmit(event)}>
        <span className="font-bold text-xl text-gray-500">General Info</span>
        <div className="mt-4">
          <section className="grid md:grid-cols-3 grid-rows gap-3">
            <div>
              <span className="block font-bold text-gray-400 mb-2">
                Firstname
              </span>
              <input
                type="text"
                defaultValue={firstname}
                name="firstname"
                className="rounded-sm border py-1 px-3 w-full focus:outline-none focus:shadow-outline"
                onChange={(event) => onChange(event)}
                placeholder="First Name"
              />
            </div>
            <div>
              <span className="block font-bold text-gray-400 mb-2">
                Lastname
              </span>
              <input
                type="text"
                defaultValue={lastname}
                name="lastname"
                className="rounded-sm border py-1 px-3 w-full focus:outline-none focus:shadow-outline"
                onChange={(event) => onChange(event)}
                placeholder="Last Name"
              />
            </div>
          </section>
          <section className="mt-4">
            <span className="block font-bold mb-2 text-gray-400">Email</span>
            <div className="grid md:grid-cols-3 grid-rows gap-3 flex items-center">
              <input
                type="email"
                name="email"
                readOnly={readOnly}
                defaultValue={email}
                className={`${
                  readOnly ? "bg-gray-200" : "bg-white"
                } rounded-sm border py-1 px-3 w-full focus:outline-none focus:shadow-outline`}
                onChange={(event) => onChange(event)}
                placeholder="Email"
              />
              <span
                className="font-bold text-red-500 cursor-pointer"
                onClick={(event) => isReadOnly(event)}
              >
                Change email
              </span>
            </div>
          </section>
          <Divider />
          <span className="font-bold text-xl text-gray-500">
            Personal Address
          </span>
          <div className="mt-4">
            <section className="grid md:grid-cols-3 grid-rows gap-3">
              <div>
                <span className="block font-bold text-gray-400 mb-2">City</span>
                <input
                  type="text"
                  name="city"
                  defaultValue={city}
                  className="rounded-sm border py-1 px-3 w-full focus:outline-none focus:shadow-outline"
                  onChange={(event) => onChange(event)}
                  placeholder="City"
                />
              </div>
              <div>
                <span className="block font-bold text-gray-400 mb-2">
                  State
                </span>
                <input
                  type="text"
                  name="state"
                  defaultValue={state}
                  className="rounded-sm border py-1 px-3 w-full focus:outline-none focus:shadow-outline"
                  onChange={(event) => onChange(event)}
                  placeholder="State"
                />
              </div>
              <div>
                <span className="block font-bold text-gray-400 mb-2">
                  Zipcode
                </span>
                <input
                  type="text"
                  name="zipcode"
                  defaultValue={zipcode}
                  className="rounded-sm border py-1 px-3 w-full focus:outline-none focus:shadow-outline"
                  onChange={(event) => onChange(event)}
                  placeholder="Zipcode"
                />
              </div>
            </section>
          </div>
          <section className="mt-5 flex justify-end">
            <button
              type="submit"
              className="py-1 px-8 bg-red-400 hover:bg-red-300 rounded text-white"
            >
              Save
            </button>
          </section>
        </div>
      </form>
    </Spin>
  );
};

export { MyAccountForm, MyAccountSocial };
