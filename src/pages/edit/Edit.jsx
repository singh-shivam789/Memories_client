import axios from "axios";
import React, { useContext, useEffect, useRef, useState, memo } from "react";
import { ToastContainer, toast } from "react-toastify";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { useHistory, useParams } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { AuthContext } from "../../context/AuthContext";
function Edit() {
  const { dispatch, user: currentUser } = useContext(AuthContext);
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const fileRef = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const desc = useRef();
  const from = useRef();
  const city = useRef();
  const relationship = useRef();
  const form = useRef();
  const history = useHistory();
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("/users?userId=" + userId);
      setUser(res.data.user);
    };
    getUser();
  }, [userId]);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  const userDescSubmitHandler = async function (event) {
    event.preventDefault();
    const userData = {
      username:
        username.current.value.trim() === ""
          ? user.username
          : username.current.value,
      email:
        email.current.value.trim() === "" ? user.email : email.current.value,
      password: password.current.value,
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
        await axios.post("/users/upload", data);
      } catch (err) {}
    }

    toast
      .promise(axios.put(`/users/${user._id}`, userData), {
        pending: "Trying to update your info...",
      })
      .then((res) => {
        toast.success("Successfully updated your info...", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch({ type: "EDIT_USER", payload: res.data.user });
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setTimeout(() => {
          history.push("/profile/" + res.data.user.username);
        }, 2000)
      })
      .catch((err) => {
        toast.error(err.response.data, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <ArrowBackIcon
            className="backIcon"
            onClick={() => {
              history.goBack();
            }}
          />
          <h3 className="loginLogo">Memories</h3>
          <div className="loginDesc">Edit Your Profile</div>
        </div>
        <div className="loginRightRegistered">
          <form
            ref={form}
            style={{ height: "100vh" }}
            onSubmit={userDescSubmitHandler}
            encType="multipart/form-data"
            className="loginBoxImgDesc"
          >
            <div style={{ height: "40%" }} className="userImg">
              <h4 style={{ color: "#93d7c1" }}>Change your Profile Picture</h4>

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
            <div style={{ height: "60%" }} className="userDesc">
              <div className="username">
                <label htmlFor="username">
                  <h4 style={{ fontWeight: "bold", color: "grey" }}>
                    Your Username:
                  </h4>
                </label>
                <input type="text" id="username" ref={username} />
              </div>
              <div className="email">
                <label htmlFor="email">
                  <h4 style={{ fontWeight: "bold", color: "grey" }}>
                    Your Email:
                  </h4>
                </label>
                <input type="email" id="email" ref={email} minLength="6" />
              </div>
              <div className="password">
                <label htmlFor="password">
                  <h4 style={{ fontWeight: "bold", color: "grey" }}>
                    Your password:
                  </h4>
                </label>
                <input
                  type="password"
                  id="password"
                  ref={password}
                  minLength="6"
                  maxLength={"15"}
                />
              </div>
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
            <button
              type="reset"
              onClick={(e) => {
                e.preventDefault();
                form.current.reset();
                setFile(null);
                fileRef.current.value = "";
              }}
              style={{ backgroundColor: "red", marginBottom: "10px" }}
              className="regPageConfirmBtn"
            >
              Reset
            </button>
            <button type="submit" className="regPageConfirmBtn">
              Confirm
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default memo(Edit);
