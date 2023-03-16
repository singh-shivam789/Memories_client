import React, { useContext, useRef, memo } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
function Login() {
  const { isFetching, dispatch } = useContext(AuthContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  let email = useRef(),
    password = useRef();
  const formHandler = async (e) => {
    e.preventDefault();
    const userCredentials = {
      email: email.current.value,
      password: password.current.value,
    };
    dispatch({ type: "LOGIN_START" });
    toast
      .promise(axios.post("https://memories-server-8vu8.onrender.com/auth/login", userCredentials), {
        pending: "Logging in...",
      })
      .then((res) => {
        if (res.data.message === "not found") {
          toast.warning("Cannot find any user with this email 😕", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(() => {
            dispatch({ type: "RESET" });
          }, 2000);
        } else {
          setTimeout(() => {
            window.localStorage.setItem("user", JSON.stringify(res.data));
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          }, 2000);
          toast.success("Logged in successfully 😊", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        password.current.value = "";
        setTimeout(() => {
          dispatch({ type: "LOGIN_FAILURE", payload: err });
        }, 2000);
      });
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Memories</h3>
          <div className="loginDesc">
            Connect with friends, create and share memories.
          </div>
        </div>
        <div className="loginRight">
          <form onSubmit={formHandler} className="loginBox">
            <input
              required
              ref={email}
              placeholder="Email"
              minLength="6"
              type="email"
              className="loginInput"
            />
            <input
              onChange={() => {
                setIsPasswordVisible(false);
              }}
              required
              minLength="6"
              ref={password}
              placeholder="Password"
              type={isPasswordVisible ? "text" : "password"}
              className="loginInput"
            />
            <button
              disabled={isFetching}
              type="submit"
              className="loginPageLoginBtn"
            >
              {isFetching ? <CircularProgress color={"inherit"} /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link
              disabled={isFetching}
              className="loginPageRegBtn"
              to="/register"
            >
              {isFetching ? (
                <CircularProgress color="white" />
              ) : (
                "Create a new Account"
              )}
            </Link>
            <div
              onClick={() => {
                setIsPasswordVisible(!isPasswordVisible);
              }}
              className="loginPasswordVisibilityIcon"
            >
              {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default memo(Login);
