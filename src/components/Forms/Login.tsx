import React, { useState, useContext } from "react";
import { Facebook, GitHub, Chrome } from "react-feather";
import { Divider } from "antd";
import { withRouter, Redirect } from "react-router-dom";
import { useSpring } from "react-spring";

//*Components
import Modal from "./Modal";
import SignUp from "./SingUp";
import PasswordReset from "./PasswordRest";
import { AuthContext } from "../../auth/AuthProvider";
import { app, provider } from "../../config/firebase";

interface Props {
  close?: (event: React.MouseEvent<SVGAElement, MouseEvent>) => void;
  history: any;
}

const Login: React.FC<Props> = ({ close, history }) => {
  const context: any = useContext(AuthContext);

  //user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ status: false, message: "" });

  //submit form
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        if (context) {
          history.push("/dashboard");
        }
      })
      .catch((err) => setMessage({ status: true, message: err.message }));
  };

  //* Open Modal event
  const [signUp, setSignUp] = useState(false);

  const openSignUp = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (signUp !== true) return setSignUp(true);
  };

  //* Back to Login event
  const backLogin = (event: React.MouseEvent<SVGAElement, MouseEvent>) => {
    event.preventDefault();
    if (signUp === true) return setSignUp(false);
    if (passwordReset === true) return setPasswordReset(false);
  };

  //* Open Password reset Event
  const [passwordReset, setPasswordReset] = useState(false);

  const animateSignIn = useSpring({
    opacity: signUp ? 1 : 0,
  });

  const openPasswordReset = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (passwordReset !== true) return setPasswordReset(true);
  };

  //** Facebook authentication
  const facebookAuthProviderEvent = (
    event: React.MouseEvent<HTMLOrSVGElement>
  ) => {
    event.preventDefault();

    provider.facebook.setCustomParameters({
      display: "popup",
    });

    app
      .auth()
      .signInWithPopup(provider.facebook)
      .catch((error: any) => {
        if (error) {
          setMessage({ status: true, message: error.message });
        }
      });
  };

  //** Google authentication
  const googleAuthProviderEvent = (
    event: React.MouseEvent<HTMLOrSVGElement>
  ) => {
    event.preventDefault();

    provider.google.setCustomParameters({
      display: "popup",
    });

    app
      .auth()
      .signInWithPopup(provider.google)
      .catch((error: any) => {
        if (error) {
          setMessage({ status: true, message: error.message });
        }
      });
  };

  //** Github authentication
  const githubAuthProviderEvent = (
    event: React.MouseEvent<HTMLOrSVGElement>
  ) => {
    event.preventDefault();

    provider.github.setCustomParameters({
      display: "popup",
    });

    app
      .auth()
      .signInWithPopup(provider.github)
      .catch((error: any) => {
        if (error) {
          setMessage({ status: true, message: error.message });
        }
      });
  };

  if (context) {
    return <Redirect to="/dashboard" />;
  }

  //*Reset Password
  if (passwordReset) {
    return (
      <Modal close={close}>
        <PasswordReset back={(event) => backLogin(event)} />
      </Modal>
    );
  }

  //* SignUp
  if (signUp) {
    return (
      <Modal close={close}>
        <SignUp
          animateSignIn={animateSignIn}
          back={(event) => backLogin(event)}
        />
      </Modal>
    );
  }

  return (
    <div className="font-mono">
      <Modal close={close}>
        <>
          <div className="text-center">
            <span className="font-bold text-gray-500 text-sm font-sans">
              Sign in with
            </span>
            <ul className="flex justify-center mt-3">
              <li className="mr-3 py-1 px-1 rounded hover:bg-blue-800 bg-blue-700 cursor-pointer">
                <Facebook
                  color="#FFF"
                  onClick={(event) => facebookAuthProviderEvent(event)}
                />
              </li>
              <li className="mr-3 py-1 px-1 rounded hover:bg-gray-700 bg-gray-900 cursor-pointer">
                <GitHub
                  color="#FFF"
                  onClick={(event) => githubAuthProviderEvent(event)}
                />
              </li>
              <li className="mr-3 py-1 px-1 rounded hover:bg-red-700 bg-red-500 cursor-pointer">
                <Chrome
                  color="#FFF"
                  onClick={(event) => googleAuthProviderEvent(event)}
                />
              </li>
            </ul>
          </div>
          <Divider />
          <div className="text-center text-gray-500 mb-5">
            <span className="font-bold text-sm font-sans">or sign in with</span>
          </div>
          <form action="" onSubmit={(event) => onSubmit(event)}>
            <div className="mb-4">
              <input
                type="email"
                required
                className="border block py-2 w-full px-4 rounded hover:border-gray-500 focus:border-gray-500"
                id="email"
                placeholder="example@yahoo.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <input
                required
                type="password"
                className="border block py-2 w-full px-4 rounded hover:border-gray-500 focus:border-gray-500"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="text-center mt-5">
              {message.status && (
                <div className="text-left bg-red-100 border-l-4 border-gray-500 text-gray-700 p-2 mb-2 font-sans">
                  <span className="font-bold">Warning!!!</span>
                  <span className="block text-sm">{message.message}</span>
                </div>
              )}

              <button className="py-2 w-full bg-black text-white hover:bg-gray-500">
                Sign In
              </button>
              <div className="mt-3">
                <button
                  onClick={(event) => openSignUp(event)}
                  className="cursor-pointer hover:text-blue-500 hover:underline"
                >
                  Create account
                </button>
              </div>
              <Divider />
              <div>
                <button
                  onClick={(event) => openPasswordReset(event)}
                  className="text-sm hover:text-red-500 hover:underline cursor-pointer"
                >
                  Forgotten your password?
                </button>
              </div>
            </div>
          </form>
        </>
      </Modal>
    </div>
  );
};

export default withRouter(Login);
