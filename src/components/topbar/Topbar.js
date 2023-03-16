import "./topbar.css";
import { Link } from "react-router-dom";
import { Search, Person, Notifications, Chat } from "@material-ui/icons";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
          <span className="title">Memories</span>
        </Link>
      </div>

      <div className="topbarCentre">
        <div className="searchbar">
          <Search className="searchIcon"></Search>
          <input
            placeholder="Search for your friends, posts, or videos!"
            type="text"
          />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <div className="topbarLink">Homepage</div>
          <div className="topbarLink">Timeline</div>
        </div>
        <div className="topbarIcons">
          <div className="topbarIcon">
            <Person></Person>
            <span className="topbarIconNotificationCount">1</span>
          </div>
          <div className="topbarIcon">
            <Chat />
            <span className="topbarIconNotificationCount">1</span>
          </div>
          <div className="topbarIcon">
            <Notifications></Notifications>
            <span className="topbarIconNotificationCount">1</span>
          </div>
        </div>
        <div className="topbarProfilePictureContainer">
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + "person/" + user.profilePicture
                  : PF + "person/0.jpeg"
              }
              alt=""
              className="topbarProfilePicture"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
