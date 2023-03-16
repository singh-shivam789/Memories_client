import { memo } from "react";
import "./onlineFriend.css";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

function OnlineFriend({ user }) {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          src={PF + user.profilePicture}
          alt=""
          className="rightbarProfileImg"
        />
        <span className="rightbarFriendstatus"></span>
      </div>
      <span className="rightbarFriendName">{user.username}</span>
    </li>
  );
}
export default memo(OnlineFriend);
