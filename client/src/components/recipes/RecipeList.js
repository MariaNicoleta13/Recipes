import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Popup, Button } from "semantic-ui-react";
import { fetchRecipes, fetchUser } from "../../actions";
import _ from "lodash";
import RecipeItem from "./RecipeItem";
class RecipeList extends React.Component {
  state = { isHidden: true };
  componentDidMount() {
    this.props.fetchRecipes();
    if (_.isEmpty(this.props.user)) this.props.fetchUser(this.props.currentUid);
    //   this.props.fetchUser(0);
  }

  renderCreateRecipeButton() {
    const linkContent = (
      <div>
        <i aria-hidden="true" className="heart icon"></i> Create a recipe
      </div>
    );
    if (this.props.isSignedIn) {
      return (
        <div>
          <button className="ui icon violet button">
            <Link tabIndex="0" to="recipes/new">
              {linkContent}
            </Link>
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <Popup
            content="You need to sign in"
            trigger={
              <Button className="ui icon button createRecipeDisabled">
                <Link tabIndex="0" to="">
                  {linkContent}
                </Link>
              </Button>
            }
          ></Popup>
        </div>
      );
    }
  }
  renderListOfRecipes() {
    return this.props.recipes.map((recipe) => {
     // console.log(recipe);

      return <RecipeItem recipe={recipe} key={recipe.id} />;
    });
  }

  render() {
    // console.log(this.props);
    return (
      <div className="myMainContainerRecipeList">
        <section className="upperPage">
          {this.renderCreateRecipeButton()}
        </section>
        <section className="renderedList ui ">
          {this.renderListOfRecipes()}
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.authentication.isSignedIn,
    currentUid: state.authentication.user ? state.authentication.user.uid : "",
    recipes: Object.values(state.recipes),
    favorites: null,
    user: state.user,
  };
};
export default connect(mapStateToProps, {
  fetchRecipes,
  fetchUser,
})(RecipeList);
