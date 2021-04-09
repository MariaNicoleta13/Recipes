import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Popup, Button } from "semantic-ui-react";
import { fetchRecipes, fetchUser } from "../../actions";
import _ from "lodash";
import RecipeItem from "./RecipeItem";
// import { All } from "All.jpg";
class RecipeList extends React.Component {
  state = { isHidden: true, seasonSelected: null };
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
        <div className="containerCreateRecipe">
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
  renderFilterSeasons() {
    let seasonsIcons = ["snowflake", "sun", "viadeo", "pagelines", "spinner"];
    let seasonsNames = ["winter", "summer", "autumn", "spring", "All"];
    let colors = ["blue", "orange", "olive", "teal", "violet"];
    let button = [];
    for (let i = 0; i < seasonsIcons.length; i++) {
      let linkContent = (
        <div>
          <i
            aria-hidden="true"
            key={i}
            className={`heart icon ${seasonsIcons[i]}`}
          ></i>
          {seasonsNames[i]}
        </div>
      );
      button.push(
        <Button
          className={`ui icon button seasonButton  ${colors[i]}`}
          key={i}
          onClick={() => {
            this.filterRecipes(seasonsNames[i]);
          }}
        >
          {linkContent}
        </Button>
      );
    }
    return <div className="seasonsButtonsContainer">{button}</div>;
  }
  async filterRecipes(seasonName) {
    // console.log("initial" + this.state.seasonSelected);
    if (seasonName !== "All") this.setState({ seasonSelected: seasonName });
    else this.setState({ seasonSelected: null });
  }
  renderListOfRecipes() {
    return this.props.recipes.map((recipe) => {
      // console.log(recipe);
      if (!this.state.seasonSelected) {
        return <RecipeItem recipe={recipe} key={recipe.id} />;
      } else if (recipe.season == this.state.seasonSelected) {
        return <RecipeItem recipe={recipe} key={recipe.id} />;
      }
    });
  }

  render() {
    return (
      <div
        className="myMainContainerRecipeList"
        style={{
          backgroundImage: `url( ${
            this.state.seasonSelected != null
              ? this.state.seasonSelected
              : "All"
          }.jpg)`,
        }}
      >
        <section className="upperPage">
          {this.renderCreateRecipeButton()}
          {this.renderFilterSeasons()}
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
