import React from "react";
import firebase from "firebase/app";
import { connect } from "react-redux";
import "firebase/auth";
import "firebase/firestore";
import { signIn, signOut, addUser } from "../actions";
import { Transition } from "semantic-ui-react";
class GoogleAuth extends React.Component {
  state = { recentlyLoggedIn: false };
  componentDidMount() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAU1pgkHTB6gatd6woqEzpEaGuX1eVd0jU",
      authDomain: "recipes-299810.firebaseapp.com",
      projectId: "recipes-299810",
      appId: "1:547438290862:web:4c426446c1339798a7ca3f",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
  onLogIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        console.log(user);
        const objUser = {};
        const { displayName, uid, email } = user;
        objUser.displayName = displayName;
        objUser.uid = uid;
        objUser.email = email;
        this.changeAuthState(objUser);
      })
      .catch(function (err) {
        console.error("The code Error is:" + err);
      });
  };
  onLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("user signed out");
        this.props.signOut();
        this.setState({ recentlyLoggedIn: false });
      })
      .catch(function (error) {
        console.error("error at logout: " + error);
      });
  };
  changeAuthState = (user) => {
    if (user) {
      console.log(user);
      this.props.signIn(user);
      this.props.addUser();
      this.setState({ recentlyLoggedIn: true });
      setTimeout(() => {
        this.setState({ recentlyLoggedIn: false });
      }, 3000);
    } else {
      this.props.signOut();
      this.setState({ recentlyLoggedIn: false });
    }
  };
  render() {
    const { recentlyLoggedIn } = this.state;
    //   console.log(this.props);
    if (!this.props.isSIgnedIn) {
      //  if (visible) setTimeout(() => this.setState({ visible: false }), 0);
      return (
        <div>
          {/* <Transition visible={visible} animation="scale" duration={5000}> */}
          <div className="ui red  right pointing   label ">Please Sign in</div>
          {/* </Transition> */}

          <button onClick={this.onLogIn} className="ui red basic button">
            Sign in
          </button>
        </div>
      );
    } else
      return (
        <div>
          <Transition
            visible={recentlyLoggedIn}
            animation="scale"
            duration={5000}
          >
            <div className="ui red  right pointing   label ">
              Successfully signed in
            </div>
          </Transition>
          <button onClick={this.onLogOut} className="ui violet basic button">
            Sign out
          </button>
        </div>
      );
  }
}

const mapToStateProps = (state) => {
  return {
    user: state.authentication.user,
    isSIgnedIn: state.authentication.isSignedIn,
    userDB: state.user,
  };
};
export default connect(mapToStateProps, { signIn, signOut, addUser })(
  GoogleAuth
);
