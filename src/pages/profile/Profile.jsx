import axios from "axios";
import { memo, useContext, useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useHistory, useParams } from "react-router";
import { Button } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./profile.css";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [User, setUser] = useState({});

  const params = useParams();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `https://memoriesserver-production.up.railway.app/api/users?username=${params.username}`
      );
      setUser(res.data.user);
    };
    fetch();
  }, [params]);

  const editHandler = () => {
    history.push("/edit/" + User._id);
  };

  const logoutHandler = () => {
    toast.success("Logging out you... Hope you had a good time😊", {
      theme: "colored",
      autoClose: 2000,
    });
    setTimeout(() => {
      window.localStorage.clear();
      dispatch({ type: "LOG_OUT" });
    }, 2000);
  };

  const deleteProfileHandler = async () => {
    toast.success("Sorry to see you go 😔", {
      autoClose: 2000,
      type: "default",
      theme: "dark",
    });
    setTimeout(() => {
      try {
        const deleteUser = async () => {
          let res = await axios.delete(
            `https://memoriesserver-production.up.railway.app/api/users/${User._id}`
          );
        };
        deleteUser();
        window.localStorage.clear();
        window.location.reload();
      } catch (error) {}
    }, 2000);
  };
  return (
    <>
      <Topbar></Topbar>
      <div className="profile">
        <Sidebar></Sidebar>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="coverPic"
                src={
                  User.coverPicture
                    ? PF + User.coverPicture
                    : PF + "/noCover.webp"
                }
                alt=""
              />
              <div className="profilePicContainer">
                <img
                  src={
                    User.profilePicture
                      ? PF + "person/" + User.profilePicture
                      : PF + "person/0.jpeg"
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="profileInfo">
              <h4 className="profileUserName">{User.username}</h4>
              <span className="profileUserDesc">{User.desc}</span>
            </div>
            {currentUser._id === User._id && (
              <div className="logoutDeleteProfileBtns">
                <Button
                  onClick={editHandler}
                  style={{ border: "1px solid", marginRight: "15px" }}
                  color="default"
                >
                  Edit Profile
                </Button>
                <Button
                  onClick={logoutHandler}
                  style={{ border: "1px solid", marginRight: "15px" }}
                  color="primary"
                >
                  Logout
                </Button>
                <Button
                  onClick={deleteProfileHandler}
                  style={{ border: "1px solid", marginRight: "15px" }}
                  color="secondary"
                >
                  Delete Profile
                </Button>
              </div>
            )}
          </div>
          <div className="profileRightBottom">
            <Feed username={params.username} />
            <Rightbar user={User} />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default memo(Profile);
