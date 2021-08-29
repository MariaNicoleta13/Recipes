import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { deleteRecipe } from "../../actions";
class RecipeDelete extends React.Component {
  componentDidMount() {
    //  this.props.fetchRecipe(this.props.match.params.id);
  }
  renderContent = () => {
    if (this.props.recipeToBeDeleted) {
      return (
        <>
          Do you want to delete
          <span className="titleRecipeDelete">
            {this.props.recipeToBeDeleted.title}
          </span>
          from your recipes?
        </>
      );
    }
  };
  renderActions = () => {
    return (
      <div>
        <Button className="ui button" onClick={this.props.onClose}>
          No
        </Button>
        <Button
          color="violet"
          onClick={() => {
            this.props.deleteRecipe(this.props.id);
          }}
        >
          Yes
        </Button>
      </div>
    );
  };
  render() {
    return (
      <Modal
        title="Delete Recipe"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => {
          history.push("/");
        }}
      ></Modal>
    );
  }
}
const mapToStateProps = (state, ownProps) => {
  return { recipeToBeDeleted: state.recipes[ownProps.id] };
};
export default connect(mapToStateProps, { deleteRecipe })(RecipeDelete);
