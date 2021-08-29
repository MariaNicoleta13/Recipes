import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Popup, Button, Menu, Dropdown } from "semantic-ui-react";
import { fetchRecipes, fetchUser, changeSeason } from "../../actions";
import _ from "lodash";
import RecipeItem from "./RecipeItem";
import { SEASON_ALL } from "../../constants/seasons";
// import { All } from "All.jpg";
class RecipeList extends React.Component {
  state = { isHidden: true };
  componentDidMount() {
    this.props.fetchRecipes();
    if (_.isEmpty(this.props.user)) {
      this.props.fetchUser(this.props.currentUid);
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
        <div className="containerCreateRecipe">
          <button className="ui icon  button violet ">
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
              <Button className="ui icon button createRecipeDisabled ">
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
    let seasonsNames = ["winter", "summer", "autumn", "spring", "all"];
    let colors = ["blue", "orange", "olive", "teal", "violet"];
    let button = [];
    for (let i = 0; i < seasonsIcons.length; i++) {
      let linkContent = (
        <div className="seasonButtonContainer">
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
    return (
      <div className="seasonsButtonsContainer hamburgerOnLowRes">{button}</div>
    );
  }
  async filterRecipes(seasonName) {
    this.props.changeSeason(seasonName);
  }
  renderListOfRecipes() {
    let recipiesToBeRendered;
    if (this.props.season === SEASON_ALL) {
      recipiesToBeRendered = this.props.recipes;
    } else {
      recipiesToBeRendered = this.props.recipes.filter((recipe) => {
        return this.props.season === recipe.season;
      });
    }
    return recipiesToBeRendered.map((recipe) => {
      return <RecipeItem recipe={recipe} key={recipe.id} />;
    });
    // return this.props.recipes.map((recipe) => {
    //   if (this.props.season == "All")
    //     return <RecipeItem recipe={recipe} key={recipe.id} />;
    //   if (recipe.season === this.props.season) {
    //     return <RecipeItem recipe={recipe} key={recipe.id} />;
    //   } else return "";
    // });
  }

  render() {
    console.log(this.props.currentUid);
    // this.props.fetchUser(this.props.currentUid);
    return (
      <div
        className="myMainContainerRecipeList"
        style={{
          backgroundImage: `url( ${this.props.season}.jpg)`,
        }}
      >
        <Menu.Menu className="upperPage normalResButtonsWrap ">
          {this.renderCreateRecipeButton()}
          {this.renderFilterSeasons()}
        </Menu.Menu>
        <Menu.Menu className="upperPage hamburgerWrap  ">
          <Dropdown className="button violet " item text="Options">
            <Dropdown.Menu>
              <Dropdown.Item> {this.renderCreateRecipeButton()}</Dropdown.Item>
              <Dropdown.Item>{this.renderFilterSeasons()}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
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
    season: state.season,
  };
};
export default connect(mapStateToProps, {
  fetchRecipes,
  fetchUser,
  changeSeason,
})(RecipeList);
