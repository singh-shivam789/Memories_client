import axios from "axios";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useTransition, animated } from "react-spring";
import { memo, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";
function Register() {
  const fileRef = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const desc = useRef();
  const from = useRef();
  const city = useRef();
  const relationship = useRef();
  const form = useRef();
  const history = useHistory();
  const [hasRegistered, setHasRegisted] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConformPasswordVisible] =
    useState(false);
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const transition = useTransition(hasRegistered, {
    from: { x: 0, y: 800, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 0, y: 800, opacity: 0 },
  });
  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };
  const registerSubmitHandler = async function (event) {
    event.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      toast.warn("Both passwords must be same!");
    } else {
      const userData = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      toast
        .promise(
          axios.post(
            `https://memoriesserver-production.up.railway.app/api/auth/register`,
            userData
          ),
          {
            pending: "Trying to sign you up...",
          }
        )
        .then((res) => {
          if (res.data.code === 11000) {
            toast.warn(`Username or Email already in use!`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          } else {
            toast.success("Account successfully created 😊", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setHasRegisted(true);
            setUser(res.data.user);
          }
        })
        .catch((err) => {});
    }
  };

  const userDescSubmitHandler = async function (event) {
    event.preventDefault();
    const userData = {
      desc: desc.current.value,
      from: from.current.value,
      city: city.current.value,
      relationship: relationship.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = user._id + "_" + Date.now() + "_" + file.name;
      data.append("name", fileName);
      data.append("file", file);
      userData.profilePicture = fileName;
      try {
        await axios.post(
          "https://memoriesserver-production.up.railway.app/api/users/upload",
          data
        );
      } catch (err) {}
    }
    toast
      .promise(
        axios.put(
          `https://memoriesserver-production.up.railway.app/api/users/${user._id}`,
          userData
        ),
        {
          pending: "Trying to update your info...",
          error: "Something went wrong ☹️",
        }
      )
      .then((res) => {
        toast.success("Successfully updated your info", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        toast.error(err, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });

    setTimeout(() => {
      history.push("/login");
    }, 2000);
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
        {!hasRegistered && (
          <div className="loginRightNotRegistered">
            <form
              ref={form}
              onSubmit={registerSubmitHandler}
              className="loginBox"
            >
              <input
                required
                ref={username}
                type={"text"}
                placeholder="Username "
                className="loginInput"
              />
              <input
                required
                ref={email}
                type={"email"}
                placeholder="Email"
                className="loginInput"
              />
              <input
                onChange={() => {
                  setIsPasswordVisible(false);
                }}
                required
                ref={password}
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                className="loginInput"
                minLength={"6"}
                maxLength={"20"}
              />
              <input
                onChange={() => {
                  setIsConformPasswordVisible(false);
                }}
                required
                ref={confirmPassword}
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                className="loginInput"
                minLength={"6"}
                maxLength={"20"}
              />
              <button type="submit" className="regPageSignupBtn">
                Sign Up
              </button>
              <Link className="regPageLoginBtn" to="/login">
                Log into Account
              </Link>
              <div
                onClick={() => {
                  setIsPasswordVisible(!isPasswordVisible);
                }}
                className="passwordVisibilityIcon"
              >
                {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
              <div
                onClick={() => {
                  setIsConformPasswordVisible(!isConfirmPasswordVisible);
                }}
                className="confirmPasswordVisibilityIcon"
              >
                {isConfirmPasswordVisible ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </div>
            </form>
          </div>
        )}

        {transition((style, item) =>
          item ? (
            <animated.div style={style} className="loginRightRegistered">
              <form
                onSubmit={userDescSubmitHandler}
                encType="multipart/form-data"
                className="loginBoxImgDesc"
              >
                <div className="userImg">
                  <h4 style={{ color: "#93d7c1" }}>
                    Want to set up your profile picture?
                  </h4>

                  <label className="profilePic" htmlFor="file">
                    {file ? (
                      <img
                        onClick={() => {
                          setFile(null);
                          fileRef.current.value = "";
                        }}
                        src={URL.createObjectURL(file)}
                        alt=""
                      />
                    ) : (
                      <CameraAltIcon className="regCameraIcon" />
                    )}
                  </label>
                  <input
                    ref={fileRef}
                    style={{ display: "none" }}
                    onChange={saveFile}
                    type="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                  />
                </div>
                <div className="userDesc">
                  <div className="desc">
                    <label htmlFor="desc">
                      <h4 style={{ fontWeight: "bold", color: "grey" }}>
                        Tell us a little something about you:
                      </h4>
                    </label>
                    <input type="text" id="desc" ref={desc} />
                  </div>
                  <div className="from">
                    <label htmlFor="from">
                      <h4 style={{ fontWeight: "bold", color: "grey" }}>
                        Which country are you from:
                      </h4>
                    </label>
                    <input type="text" id="from" ref={from} />
                  </div>
                  <div className="city">
                    <label htmlFor="city">
                      <h4 style={{ fontWeight: "bold", color: "grey" }}>
                        In which City are you currently living :
                      </h4>
                    </label>
                    <input type="text" id="city" ref={city} />
                  </div>
                  <div className="relationship">
                    <label htmlFor="relationship">
                      <h4 style={{ fontWeight: "bold", color: "grey" }}>
                        Relationship Status:
                      </h4>
                    </label>
                    <input type="text" id="relationship" ref={relationship} />
                  </div>
                </div>
                <button type="submit" className="regPageConfirmBtn">
                  Confirm
                </button>
              </form>
            </animated.div>
          ) : (
            ""
          )
        )}
      </div>
      <ToastContainer id="" />
    </div>
  );
}

export default memo(Register);
