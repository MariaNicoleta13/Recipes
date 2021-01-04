import React from "react";
import RecipeForm from "./RecipeForm";
import { createRecipe } from "../../actions";
import { connect } from "react-redux";
class RecipeCreate extends React.Component {
  onSubmitForm = (formValues) => {
    console.log("inafara form");
    //  console.log(formValues);
    const ingredients = [];
    for (const key in formValues) {
      if (key.includes("ingredientsName")) {
        let index = Number(key.split("ingredientsName")[1]);
        let objToInsert = {};
        objToInsert.name = formValues[key]; //e
        objToInsert.value = formValues["ingredientsQuantity" + index];
        objToInsert.unit = formValues["ingredientsUnit" + index];
        ingredients[index] = objToInsert;
        delete formValues["ingredientsName" + index];
        delete formValues["ingredientsQuantity" + index];
        delete formValues["ingredientsUnit" + index];
      }
    }
    formValues["ingredients"] = ingredients;
    console.log(formValues);
    this.props.createRecipe(formValues);
  };
  render() {
    return (
      <div className="recipeCreateForm">
        <h3 className="formPageTitle">Submit your recipe here</h3>
        <RecipeForm
          onSubmit={this.onSubmitForm}
          // onSubmit2={this.onSubmitForm}
          //  handleSubmit={this.onSubmitForm}
        ></RecipeForm>
      </div>
    );
  }
}
export default connect(null, { createRecipe })(RecipeCreate);
