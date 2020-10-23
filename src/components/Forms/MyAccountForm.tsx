import React, { useContext } from "react";
import { Divider } from "antd";
import { Facebook, Twitter, Instagram } from "react-feather";
import { ReducerContext } from "../../Context/ReducerProvider";

interface PropType {
  userInfo: any;
}

const MyAccountSocial: React.FC<PropType> = ({ userInfo }) => {
  const { dispatch, toggleSocial } = useContext(ReducerContext);

  const { facebook, instagram, twitter } = userInfo;

  return (
    <form className="grid grid-rows gap-2">
      <div className="flex items-center">
        <i className="mr-2">
          <Facebook size="20" />
        </i>
        <input
          type="text"
          defaultValue={facebook}
          className="border py-1 px-3 w-full rounded-sm focus:outline-none focus:shadow-outline"
          placeholder="facebook"
        />
      </div>
      <div className="flex items-center">
        <i className="mr-2">
          <Twitter size="20" />
        </i>
        <input
          type="text"
          defaultValue={twitter}
          className="border py-1 px-3 w-full rounded-sm focus:outline-none focus:shadow-outline"
          placeholder="twitter"
        />
      </div>
      <div className="flex items-center">
        <i className="mr-2">
          <Instagram size="20" />
        </i>
        <input
          type="text"
          defaultValue={instagram}
          className="border py-1 px-3 w-full rounded-sm focus:outline-none focus:shadow-outline"
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
        <button className="px-4 py-1 rounded bg-green-400 hover:bg-green-300 text-white">
          save
        </button>
      </div>
    </form>
  );
};

const MyAccountForm: React.FC<PropType> = ({ userInfo }) => {
  const { firstname, lastname, email, city, state, zipcode } = userInfo;

  return (
    <form>
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
              className="rounded-sm border py-1 px-3 w-full focus:outline-none focus:shadow-outline"
              placeholder="First Name"
            />
          </div>
          <div>
            <span className="block font-bold text-gray-400 mb-2">Lastname</span>
            <input
              type="text"
              defaultValue={lastname}
              className="rounded-sm border py-1 px-3 w-full focus:outline-none focus:shadow-outline"
              placeholder="Last Name"
            />
          </div>
        </section>
        <section className="mt-4">
          <span className="block font-bold mb-2 text-gray-400">Email</span>
          <div className="grid md:grid-cols-3 grid-rows gap-3 flex items-center">
            <input
              type="email"
              defaultValue={email}
              className="rounded-sm border py-1 px-3 w-full focus:outline-none focus:shadow-outline"
              placeholder="Email"
            />
            <span className="font-bold text-red-500">Change email</span>
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
                defaultValue={city}
                className="rounded-sm border py-1 px-3 w-full focus:outline-none focus:shadow-outline"
                placeholder="City"
              />
            </div>
            <div>
              <span className="block font-bold text-gray-400 mb-2">State</span>
              <input
                type="text"
                defaultValue={state}
                className="rounded-sm border py-1 px-3 w-full focus:outline-none focus:shadow-outline"
                placeholder="State"
              />
            </div>
            <div>
              <span className="block font-bold text-gray-400 mb-2">
                Zipcode
              </span>
              <input
                type="text"
                defaultValue={zipcode}
                className="rounded-sm border py-1 px-3 w-full focus:outline-none focus:shadow-outline"
                placeholder="Zipcode"
              />
            </div>
          </section>
        </div>
        <section className="mt-5 flex justify-end">
          <button
            type="button"
            className="py-1 px-8 bg-red-400 hover:bg-red-300 rounded text-white"
          >
            Save
          </button>
        </section>
      </div>
    </form>
  );
};

export { MyAccountForm, MyAccountSocial };
