import React, { useContext, memo } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import ErrorPage from "./pages/error/ErrorPage";
import Edit from "./pages/edit/Edit";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, error } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/profile/:username">
          {!user ? <Redirect to={"/login"} /> : <Profile />}
        </Route>
        <Route path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/edit/:userId">
          {!user ? <Redirect to={"/login"} /> : <Edit />}
        </Route>
        <Route path="/error">
          {!user && error ? <ErrorPage /> : <Redirect to={"/login"} />}
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default memo(App);
