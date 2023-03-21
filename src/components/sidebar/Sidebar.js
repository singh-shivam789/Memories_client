import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilled,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import Friend from "../friend/Friend";
import { useEffect, useState, memo } from "react";
import axios from "axios";

function Sidebar() {
  let [Users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      let res = await axios.get(
        "https://memoriesserver-production.up.railway.app/api/users/all"
      );
      setUsers(res.data);
    };
    fetchUsers();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarListContainer">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <div className="sidebarListItemIcon">
                <RssFeed></RssFeed>
              </div>
              <span className="sidebarListItemText">Feed</span>
            </li>
            <li className="sidebarListItem">
              <div className="sidebarListItemIcon">
                <Chat></Chat>
              </div>
              <span className="sidebarListItemText">Chats</span>
            </li>
            <li className="sidebarListItem">
              <div className="sidebarListItemIcon">
                <PlayCircleFilled></PlayCircleFilled>
              </div>
              <span className="sidebarListItemText">Videos</span>
            </li>
            <li className="sidebarListItem">
              <div className="sidebarListItemIcon">
                <Group></Group>
              </div>
              <span className="sidebarListItemText">Groups</span>
            </li>
            <li className="sidebarListItem">
              <div className="sidebarListItemIcon">
                <Bookmark></Bookmark>
              </div>
              <span className="sidebarListItemText">Bookmarks</span>
            </li>
            <li className="sidebarListItem">
              <div className="sidebarListItemIcon">
                <HelpOutline></HelpOutline>
              </div>
              <span className="sidebarListItemText">Questions</span>
            </li>
            <li className="sidebarListItem">
              <div className="sidebarListItemIcon">
                <WorkOutline></WorkOutline>
              </div>
              <span className="sidebarListItemText">Jobs</span>
            </li>
            <li className="sidebarListItem">
              <div className="sidebarListItemIcon">
                <Event></Event>
              </div>
              <span className="sidebarListItemText">Events</span>
            </li>
            <li className="sidebarListItem">
              <div className="sidebarListItemIcon">
                <School></School>
              </div>
              <span className="sidebarListItemText">Courses</span>
            </li>
          </ul>
          <button className="sidebarListButton">Show More</button>
          <hr />
        </div>
        <div className="sidebarFriendsListContainer">
          <ul className="sidebarFriendsList">
            {Users.map((user) => (
              <Friend key={user._id} user={user} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default memo(Sidebar);
