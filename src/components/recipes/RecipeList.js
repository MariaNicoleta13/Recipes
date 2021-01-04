import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Popup, Button } from "semantic-ui-react";
import { fetchRecipes } from "../../actions";
class RecipeList extends React.Component {
  componentDidMount() {
    this.props.fetchRecipes();
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
        <div className="ui card" key={recipe.id}>
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
              <div className="recipeSteps">{recipe.steps}</div>
            </div>
          </div>
          <div className="extra content">
            <button className="ui green basic button">Favorite</button>
            <button className="ui red basic button">Edit</button>
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
  render() {
    // console.log(this.props);
    return (
      <div>
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
    isSignedIn: state.authenticatication.isSignedIn,
    recipes: Object.values(state.recipes),
  };
};
export default connect(mapStateToProps, { fetchRecipes })(RecipeList);
