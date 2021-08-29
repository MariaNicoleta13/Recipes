import React from "react";
import Header from "./Header";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import RecipeCreate from "./recipes/RecipeCreate";
import RecipeList from "./recipes/RecipeList";
import RecipeEdit from "./recipes/RecipeEdit";
import RecipeDelete from "./recipes/RecipeDelete";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { signIn, signOut } from "../actions";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!!user) {
          this.props.signIn(firebase.auth().currentUser.uid);
        } else {
          this.props.signOut();
        }
      });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  render() {
    return (
      <div className="ui fluid container">
        <Router history={history}>
          <div className="myMainContainer">
            <Header></Header>
            <Switch>
              <Route path="/" exact component={RecipeList}></Route>
              <Route path="/recipes/new" exact component={RecipeCreate}></Route>
              <Route
                path="/recipes/edit/:id"
                exact
                component={RecipeEdit}
              ></Route>
              <Route
                path="/recipes/delete/:id"
                exact
                component={RecipeDelete}
              ></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // user: state.authenticatication.user,
    user: state.authenticatication,
    // isSIgnedIn: state.authenticatication.isSignedIn,
    isSIgnedIn: state.authenticatication,
  };
};
export default connect(mapStateToProps, { signIn, signOut })(App);
