import React from "react";
import { connect } from "react-redux";
import { Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import RecipeDelete from "./RecipeDelete";
import _ from "lodash";
import { fetchUser, addFavToUser, removeFavFromUser } from "../../actions";

class RecipeItem extends React.Component {
  state = { isHidden: true, deleteModalMode: null };
  componentDidMount() {
    if (_.isEmpty(this.props.user)) this.props.fetchUser(this.props.currentUid);
  }
  render() {
    const { recipe } = this.props;
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
        {this.renderDeleteModal()}
      </div>
    );
  }

  renderDeleteModal = () => {
    if (this.state.deleteModalMode)
      return (
        <RecipeDelete
          id={this.state.deleteModalMode}
          onClose={() => {
            this.setState({ deleteModalMode: null });
          }}
        />
      );
  };
  addToFavorite(recipeId) {
    //</button> this.props.addFavToUser(this.props.currentUid, index);
    // return console.log(this.props.currentUid);
    //  console.log(this.props.currentUid);
    // console.log(recipeId);
    // const termen = "winter";

    this.props.addFavToUser(this.props.currentUid, recipeId);
  }
  removeFavFromUserCall(recipeId) {
    console.log("from removeFavFromUserCall");
    console.log(this.props.currentUid);
    console.log(recipeId);
    this.props.removeFavFromUser(this.props.currentUid, recipeId);
  }
  toggleTextArea = () => {
    this.setState({ isHidden: !this.state.isHidden });
  };
  renderDeleteBasedOnUser(creatorId, recipeId) {
    if (this.props.isSignedIn && this.props.currentUid === creatorId) {
      return (
        <Popup
          content="Remove your recipe"
          trigger={
            <button
              className="ui purple basic button"
              onClick={() => {
                this.setState({ deleteModalMode: recipeId });
              }}
            >
              Remove
            </button>
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
    if (
      this.props.isSignedIn &&
      favoriteIds &&
      favoriteIds.indexOf(recipeId) !== -1
    )
      return (
        <Popup
          content="Unfavor your recipe"
          trigger={
            <button
              className="ui gray basic button"
              onClick={() => {
                this.removeFavFromUserCall(recipeId);
              }}
            >
              Unfavor
            </button>
          }
        />
      );
    else if (this.props.isSignedIn) {
      return (
        <Popup
          content="Favor your recipe"
          trigger={
            <button
              className="ui  purple basic button"
              onClick={() => {
                this.addToFavorite(recipeId);
              }}
            >
              Favorite
            </button>
          }
        />
      );
    } else {
      return (
        <Popup
          content="You need to be signed in"
          trigger={
            <button className="ui gray basic button   disabledEditButton">
              Favorite
            </button>
          }
        />
      );
    }
  }
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
  renderListOfIngredientsQuantity(recipe) {
    return recipe.ingredients.map((ingredient, index) => {
      return (
        <div role="listitem" className="item" key={index}>
          {ingredient.value} {ingredient.unit}
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
}
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.authentication.isSignedIn,
    currentUid: state.authentication.user ? state.authentication.user.uid : "",
    favorites: null,
    user: state.user,
  };
};
export default connect(mapStateToProps, {
  fetchUser,
  addFavToUser,
  removeFavFromUser,
})(RecipeItem);
