import React from "react";
import RecipeForm from "./RecipeForm";
import { createRecipe } from "../../actions";
import { connect } from "react-redux";
class RecipeCreate extends React.Component {
  state = {
    seasonSelectedParent: "spring",
  };
  onSubmitForm = (formValues) => {
    const ingredients = [];
    for (const key in formValues) {
      if (key.includes("ingredientsName")) {
        let index = Number(key.split("ingredientsName")[1]); //0
        if (!formValues["ingredientsRemove" + index]) {
          let objToInsert = {};
          objToInsert.name = formValues[key]; //e
          objToInsert.value = formValues["ingredientsQuantity" + index];
          objToInsert.unit = formValues["ingredientsUnit" + index];
          ingredients.push(objToInsert);
        } else {
          delete formValues["ingredientsRemove" + index];
        }

        delete formValues["ingredientsName" + index];
        delete formValues["ingredientsQuantity" + index];
        delete formValues["ingredientsUnit" + index];
      }
    }
    formValues["ingredients"] = ingredients;
    this.props.createRecipe(formValues);
  };
  changeBackground = (a) => {
    this.setState({ seasonSelectedParent: a });
  };
  render() {
    return (
      <div className="formContainer">
        <div className="recipeCreateForm">
          <h3 className="formPageTitle">Submit your recipe here !</h3>
          <RecipeForm
            onSubmit={this.onSubmitForm}
            // changeBackground={this.changeBackground}
            // onSubmit2={this.onSubmitForm}
            //  handleSubmit={this.onSubmitForm}
          ></RecipeForm>
        </div>
      </div>
    );
  }
}
export default connect(null, { createRecipe })(RecipeCreate);
