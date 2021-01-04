import React from "react";
import Header from "./Header";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import RecipeCreate from "./recipes/RecipeCreate";
import RecipeList from "./recipes/RecipeList";
const App = () => {
  return (
    <div className="ui fluid container">
      <Router history={history}>
        <div>
          <Header></Header>
          <Switch>
            <Route path="/" exact component={RecipeList}></Route>
            <Route path="/recipes/new" exact component={RecipeCreate}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};
export default App;
