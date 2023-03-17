import React, {useRef, memo } from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
function ForgotPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const history = useHistory();
  let email = useRef(),
    password = useRef();
  const formHandler = async (e) => {
    e.preventDefault();
    const userCredentials = {
      email: email.current.value,
      password: password.current.value,
    };
    toast
      .promise(axios.post("http://localhost:5000/api/auth/forgotPassword", userCredentials), {
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
        } else {
          toast.success("Password set successfully 😊", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            history.push("/");
          }, 3000)
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
        history.push("/error");
      });
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Memories</h3>
          <div className="loginDesc">
            Reset Password
          </div>
        </div>
        <div className="loginRightForgotPassword">
          <form onSubmit={formHandler} className="loginBoxForgotPassword">
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
              type="submit"
              className="loginPageLoginBtn"
            >
            {"Reset Password"}
            </button>
            <div
              onClick={() => {
                setIsPasswordVisible(!isPasswordVisible);
              }}
              className="forgotPasswordPasswordVisibilityIcon"
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

export default memo(ForgotPassword);