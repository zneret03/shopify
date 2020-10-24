import React, { useState } from "react";
import { ArrowLeftCircle } from "react-feather";
import { Divider } from "antd";
import { Link } from "react-router-dom";
import { app } from "../../config/firebase";
import { Info } from "react-feather";
import axios from "axios";
import { animated } from "react-spring";
import { withRouter } from "react-router-dom";

interface Props {
  history: any;
  animateSignIn: any;
  back: (event: React.MouseEvent<SVGAElement, MouseEvent>) => void;
}

const SignUp: React.FC<Props> = ({ back, animateSignIn, history }) => {
  //initial state
  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    city: "",
    state: "",
    zipcode: "",
    password: "",
  };

  const [
    { firstname, lastname, email, city, state, zipcode, password },
    setState,
  ] = useState(initialState);
  const [message, setMessage] = useState<string>("");

  //input OnChange
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  //clear state
  const clearState = () => {
    setState({ ...initialState });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        if (cred.user) {
          axios
            .post(
              "/.netlify/functions/index?name=signIn&&component=userInformationComponent",
              {
                id: cred.user.uid,
                email: email,
                firstname: firstname,
                lastname: lastname,
                city: city,
                state: state,
                zipcode: zipcode,
              }
            )
            .then(() => {
              history.push("/dashboard");
              console.log("successful");
              clearState();
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
    <>
      <div>
        <ArrowLeftCircle
          className="cursor-pointer hover:text-red-500"
          onClick={back}
        />
      </div>
      <div className="text-center mb-5">
        <span className="font-bold text-3xl">Sign up</span>
      </div>
      <form action="" onSubmit={(event) => onSubmit(event)}>
        <animated.div style={animateSignIn}>
          <div className="mb-4">
            <input
              type="text"
              required
              name="firstname"
              value={firstname}
              onChange={(event) => onChange(event)}
              className="border block py-2 w-full px-4 rounded hover:border-gray-500 focus:border-gray-500"
              placeholder="Firstname"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              required
              name="lastname"
              value={lastname}
              onChange={(event) => onChange(event)}
              className="border block py-2 w-full px-4 rounded hover:border-gray-500 focus:border-gray-500"
              placeholder="Lastname"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              required
              name="email"
              value={email}
              onChange={(event) => onChange(event)}
              className="border block py-2 w-full px-4 rounded hover:border-gray-500 focus:border-gray-500"
              placeholder="Email"
            />
          </div>
          <div className="mb-4 grid grid-cols-3 gap-2">
            <input
              type="text"
              required
              name="city"
              value={city}
              onChange={(event) => onChange(event)}
              className="border block py-2 w-full px-4 rounded hover:border-gray-500 focus:border-red-500"
              placeholder="City"
            />
            <input
              type="text"
              required
              name="state"
              value={state}
              onChange={(event) => onChange(event)}
              className="border block py-2 w-full px-4 rounded hover:border-gray-500 focus:border-red-500"
              placeholder="State"
            />
            <input
              type="text"
              required
              name="zipcode"
              value={zipcode}
              onChange={(event) => onChange(event)}
              className="border block py-2 w-full px-4 rounded hover:border-gray-500 focus:border-gray-500"
              placeholder="Zipcode"
            />
          </div>
          <div>
            <input
              type="password"
              required
              name="password"
              value={password}
              onChange={(event) => onChange(event)}
              className="border block py-2 w-full px-4 rounded hover:border-gray-500 focus:border-gray-500"
              placeholder="Password"
            />
          </div>
        </animated.div>
        <Divider />
        <div className="text-center">
          {message && (
            <div className="text-left bg-red-100 border-l-4 border-gray-500 text-gray-700 mb-2 p-1">
              <div className="flex items-center ml-2">
                <span className="mr-1">
                  <Info size="15" />
                </span>
                <span className="font-bold">Information</span>
              </div>
              <span className="ml-2 block">{message}</span>
            </div>
          )}

          <button className="py-2 w-full bg-black text-white hover:bg-gray-500">
            Sign Up
          </button>

          <div className="text-center mt-4 text-sm">
            By signing up, you agree to the
            <Link className="underline mr-2 text-gray-700">
              {" "}
              Terms of Service{" "}
            </Link>
            ands
            <Link className="underline ml-2 text-gray-700">Privacy Policy</Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default withRouter(SignUp);
