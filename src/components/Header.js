import React from "react";
import GoogleAuth from "./GoogleAuth";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="ui menu pointing secondary">
      <Link className="ui header brandContainer" to="/">
        <span className="content">Recipes</span>
        <i className="ui food icon" aria-hidden="true"></i>
      </Link>

      <div className="right menu signInButton">
        <GoogleAuth />
      </div>
    </div>
  );
};
export default Header;
