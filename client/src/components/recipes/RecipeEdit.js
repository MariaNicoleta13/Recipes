import React from "react";
import { fetchRecipe, editRecipe } from "../../actions";
import { connect } from "react-redux";
import RecipeForm from "./RecipeForm";
class RecipeEdit extends React.Component {
  componentDidMount() {
    this.props.fetchRecipe(this.props.match.params.id);
  }
  onSubmit = (formValues) => {
    console.log("inafara form");
    // console.log(formValues);
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

    this.props.editRecipe(this.props.match.params.id, formValues);
  };
  reconstructFormValuesToBeRendered = (initialFormValuesObj) => {
    var finalFormValuesObj = {};
    for (const key in initialFormValuesObj) {
      if (key !== "ingredients")
        finalFormValuesObj[key] = initialFormValuesObj[key];
      else {
        for (var i = 0; i < initialFormValuesObj[key].length; i++) {
          let v = initialFormValuesObj[key];
          finalFormValuesObj["ingredientsName" + i] = v[i]["name"];
          finalFormValuesObj["ingredientsQuantity" + i] = v[i]["value"];
          finalFormValuesObj["ingredientsUnit" + i] = v[i]["unit"];
        }
      }
    }
    return finalFormValuesObj;
  };

  render() {
    console.log(this.props.recipeToEdit);
    if (!this.props.recipeToEdit) {
      return <div>Loading your recipe..</div>;
    }
    return (
      <div className="formContainer">
        <div className="recipeCreateForm">
          <RecipeForm
            formValuesToRender={this.reconstructFormValuesToBeRendered(
              this.props.recipeToEdit
            )}
            onSubmit={this.onSubmit}
            numberOfIngredientsToRender={
              this.props.recipeToEdit["ingredients"].length
            }
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { recipeToEdit: state.recipes[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchRecipe, editRecipe })(
  RecipeEdit
);
