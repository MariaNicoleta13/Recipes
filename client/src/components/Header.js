import React from "react";
import { connect } from "react-redux";
import GoogleAuth from "./GoogleAuth";
import { Link } from "react-router-dom";
class Header extends React.Component {
  render() {
    return (
      <div
        className="ui menu pointing secondary headerContainer"
        style={{
          backgroundImage: `url( ${this.props.season}.jpg)`,
        }}
      >
        <Link className="ui header brandContainer" to="/">
          <span className="content">Recipes</span>
          <i className="ui food icon" aria-hidden="true"></i>
        </Link>

        <div className="right menu signInButton">
          <GoogleAuth />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    season: state.season,
  };
};

export default connect(mapStateToProps, {})(Header);
// export default Header;
