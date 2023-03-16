import React from "react";
import "./ErrorPage.css";
import { useHistory } from "react-router-dom";

const ErrorPage = () => {
  const history = useHistory();
  return (
    <div className="errorPage">
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Memories</h3>
            <div className="loginDesc">
              Connect with friends, create and share memories.
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column !important" }}
            className="loginRight"
          >
            <div className="top">
              <div
                style={{ justifyContent: "space-evenly" }}
                className="loginBox"
              >
                <h2>
                  We could not find the page you were looking for, or you are
                  here by an accident.
                </h2>
                <h2 style={{ color: "#93d7c1" }}>
                  Please try logging in again.
                </h2>
                <div style={{ justifySelf: "flex-end" }} className="bottom">
                  <button
                    style={{ width: "20%", justifySelf: "end" }}
                    onClick={() => {
                      history.push("/login");
                    }}
                    className="loginPageLoginBtn"
                  >
                    Log In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
