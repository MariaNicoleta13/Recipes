import React from "react";
import { Form, Field } from "react-final-form";

class RecipeForm extends React.Component {
  state = { numberOfIngredients: 1 };

  addMoreIngredients = () => {
    this.setState({
      numberOfIngredients: this.state.numberOfIngredients + 1,
    });
  };
  renderIngredients = () => {
    const allTheIngredients = [];

    for (let i = 0; i < this.state.numberOfIngredients; i++) {
      const nameField = "ingredientsName" + i;
      const quantityField = "ingredientsQuantity" + i;
      const unitField = "ingredientsUnit" + i;
      allTheIngredients.push(
        <div className="ingredientsInputs" key={i}>
          <Field
            name={nameField}
            component="input"
            placeholder="Ingredient"
            className="ingredientName"
          />
          <Field
            name={quantityField}
            component="input"
            className="ingredientQuantity"
            placeholder="quantity"
            type="number"
          />
          <Field
            name={unitField}
            component="input"
            placeholder="unit"
            className="ingredientUnit"
          />
        </div>
      );
    }

    return allTheIngredients;
  };

  render() {
    //  console.log(this.props);
    return (
      <Form
        // onSubmit={this.onSubmit}
        onSubmit={this.props.onSubmit}
        render={({ handleSubmit }) => (
          <form className="ui form" onSubmit={handleSubmit}>
            <div className="field ">
              <label>Title:</label>
              <Field
                name="title"
                component="input"
                placeholder="Your Title"
                id="formTitle"
              />
            </div>
            <div className="field " id="ingredientsField">
              <label>Ingredients:</label>
              {this.renderIngredients()}

              <button
                type="button"
                className="ui button"
                onClick={this.addMoreIngredients}
              >
                <i aria-hidden="true" className="add icon"></i>Add more
              </button>
            </div>
            <div className="field">
              <label>Steps:</label>
              <Field
                name="steps"
                component="textarea"
                placeholder="Steps to follow"
                id="stepsToFollow"
              />
            </div>
            <div className="field field4">
              <section id="season">
                <label>Season:</label>
                <Field
                  name="season"
                  id="field4inputs"
                  component="select"
                  initialValue="spring"
                >
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                  <option value="autumn">Autumn</option>
                  <option value="winter">Winter</option>
                </Field>
              </section>
              <section id="duration">
                <label>Duration (h):</label>
                <Field
                  name="duration"
                  component="input"
                  placeholder="amount of time in hours"
                  id="field4inputs"
                  type="number"
                />
              </section>
            </div>
            <div className="field submitButtonWrapper">
              <button type="submit" className="ui red basic button ">
                Submit
              </button>
            </div>
          </form>
        )}
      />
    );
  }
}

// export default reactFinalForm({
//   form: "recipeForm",
// })(RecipeForm);
export default RecipeForm;
