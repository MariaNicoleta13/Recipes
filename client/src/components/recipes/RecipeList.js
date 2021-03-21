import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Popup, Button } from "semantic-ui-react";
import { fetchRecipes, fetchUser, addFavToUser } from "../../actions";
import _ from "lodash";
class RecipeList extends React.Component {
  state = { isHidden: true };
  componentDidMount() {
    this.props.fetchRecipes();
    if (_.isEmpty(this.props.user)) this.props.fetchUser(this.props.currentUid);
    //   this.props.fetchUser(0);
  }
  renderDeleteBasedOnUser(creatorId, recipeId) {
    if (this.props.isSignedIn && this.props.currentUid === creatorId) {
      return (
        <Popup
          content="Remove your recipe"
          trigger={
            <Link
              className="ui purple basic button"
              to={`/recipes/delete/${recipeId}`}
            >
              Remove
            </Link>
          }
        />
      );
    } else
      return (
        <Popup
          content="Only the recipes creator can delete it"
          trigger={
            <button className="ui gray basic button   disabledEditButton">
              Remove
            </button>
          }
        />
      );
  }
  renderEditBasedOnUser(creatorId, recipeId) {
    //
    if (this.props.isSignedIn && this.props.currentUid === creatorId) {
      return (
        <Popup
          content="Edit your recipe"
          trigger={
            <Link
              className="ui purple basic button"
              to={`/recipes/edit/${recipeId}`}
            >
              Edit
            </Link>
          }
        />
      );
    } else
      return (
        <Popup
          content="Only the recipes creator can edit it"
          trigger={
            <button className="ui gray basic button   disabledEditButton">
              Edit
            </button>
          }
        />
      );
  }
  renderFavoriteButton(favoriteIds, recipeId) {
    //  console.log(favoriteIds.indexOf(recipeId));
    if (favoriteIds && favoriteIds.indexOf(recipeId) !== -1)
      return (
        <button className="ui gray basic button" onClick={this.addToFavorite()}>
          Favorite
        </button>
      );
    else {
      return <button className="ui  purple basic button">Favorite</button>;
    }
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
      console.log(recipe);

      return (
        <div className="ui card customCard" key={recipe.id}>
          <div className="content">
            <div className="header">{recipe.title}</div>
            <div className="meta">{recipe.season}</div>
            <div className="description">
              <div className="ingredientsList">
                <div role="list" className="ui list ingredientsListName">
                  {this.renderListOfIngredientsNames(recipe)}
                </div>
                <div role="list" className="ui list ingredientsListQuantity">
                  {this.renderListOfIngredientsQuantity(recipe)}
                </div>
              </div>
              <div className="recipeSteps">
                <div className="modeDetailsButtonContainer">
                  {this.modeDetailsButton()}
                </div>
                <div
                  className={`plainText ${
                    this.state.isHidden ? "hiddenMyPainText" : ""
                  }`}
                >
                  {recipe.steps}
                </div>
              </div>
            </div>
          </div>
          <div className="extra content">
            {this.renderFavoriteButton(this.props.user?.favoriteIds, recipe.id)}
            {/* <button className="ui violet basic button">Favorite</button> */}
            {this.renderEditBasedOnUser(recipe.uid, recipe.id)}
            {this.renderDeleteBasedOnUser(recipe.uid, recipe.id)}
          </div>
        </div>
      );
    });
  }
  renderListOfIngredientsNames(recipe) {
    return recipe.ingredients.map((ingredient, index) => {
      return (
        <div role="listitem" className="item" key={index}>
          {ingredient.name}
        </div>
      );
    });
  }
  renderListOfIngredientsQuantity(recipe) {
    return recipe.ingredients.map((ingredient, index) => {
      return (
        <div role="listitem" className="item" key={index}>
          {ingredient.value} {ingredient.unit}
        </div>
      );
    });
  }
  addToFavorite(index) {
    //</button> this.props.addFavToUser(this.props.currentUid, index);

    return console.log(this.props.currentUid);
  }
  toggleTextArea = () => {
    this.setState({ isHidden: !this.state.isHidden });
  };
  modeDetailsButton() {
    if (this.state.isHidden)
      return (
        <button
          className="ui button basic label moreInfoButton"
          onClick={this.toggleTextArea}
        >
          More Info
          <i aria-hidden="true" className="chevron down icon"></i>
        </button>
      );
    else
      return (
        <button
          className="ui button basic label moreInfoButton"
          onClick={this.toggleTextArea}
        >
          Less Info
          <i aria-hidden="true" className="chevron up icon"></i>
        </button>
      );
  }
  render() {
    // console.log(this.props);
    return (
      <div className="myMainContainerRecipeList">
        <section className="upperPage">
          {this.renderCreateRecipeButton()}
        </section>
        <section className="renderedList ui cards">
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
  addFavToUser,
})(RecipeList);
