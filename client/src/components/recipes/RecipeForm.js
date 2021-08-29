import React from "react";
import { Form, Field } from "react-final-form";

class RecipeForm extends React.Component {
  state = {
    numberOfIngredients: 1,
    removedFields: [],
    season: "spring",
  };
  componentDidMount() {
    if (this.props.numberOfIngredientsToRender) {
      this.setState({
        numberOfIngredients: this.props.numberOfIngredientsToRender,
      });
    }
  }

  addMoreIngredients = () => {
    this.setState({
      numberOfIngredients: this.state.numberOfIngredients + 1,
    });
  };
  removeMoreIngredients = (index) => {
    if (this.state.removedFields.indexOf(index) === -1)
      this.setState(
        {
          removedFields: this.state.removedFields.concat(index),
        },
        () => {}
      );
  };
  renderRemoveField = (removeField, i) => {
    if (this.state.removedFields.indexOf(i) !== -1)
      return (
        <Field
          name={removeField}
          component="input"
          className="ingredientRemove"
          defaultValue="yes"
        />
      );
  };
  renderIngredients = () => {
    const allTheIngredients = [];

    for (let i = 0; i < this.state.numberOfIngredients; i++) {
      const nameField = "ingredientsName" + i;
      const quantityField = "ingredientsQuantity" + i;
      const unitField = "ingredientsUnit" + i;
      const removeField = "ingredientsRemove" + i;
      allTheIngredients.push(
        <div
          className={`ingredientsInputs ${
            this.state.removedFields.indexOf(i) !== -1 ? "ingredientRemove" : ""
          }`}
          key={i}
        >
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
          {this.renderRemoveField(removeField, i)}

          <button
            type="button"
            className="ui button violet myRemoveButton icon"
            onClick={() => {
              this.removeMoreIngredients(i);
            }}
          >
            <i aria-hidden="true" className="remove icon"></i>
          </button>
        </div>
      );
    }

    return allTheIngredients;
  };
  render() {
    return (
      <Form
        onSubmit={this.props.onSubmit}
        initialValues={this.props.formValuesToRender}
        render={({ handleSubmit }) => (
          <form className="ui form formBody" onSubmit={handleSubmit}>
            <div className="field ">
              <label>Title:</label>
              <Field
                name="title"
                component="input"
                placeholder="Your Title"
                id="formTitle"
                required
              />
            </div>
            <div className="field " id="ingredientsField">
              <label>Ingredients:</label>
              {this.renderIngredients()}

              <button
                type="button"
                className="ui violet button"
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
                required
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
                  // value={this.state.season}
                >
                  {(props) => (
                    <select {...props.input}>
                      <option value="spring">Spring</option>
                      <option value="summer">Summer</option>
                      <option value="autumn">Autumn</option>
                      <option value="winter">Winter</option>
                    </select>
                  )}
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
                  required
                />
              </section>
            </div>
            <div className="field submitButtonWrapper">
              <button type="submit" className="ui violet  button ">
                Submit
              </button>
            </div>
          </form>
        )}
      />
    );
  }
}

export default RecipeForm;
