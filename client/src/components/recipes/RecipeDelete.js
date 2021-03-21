import React from "react";

class RecipeDelete extends React.Component {
  render() {
    const id = this.props.match.params.id;
    return (
      <button
        className="ui button negative"
        onClick={() => {
          this.props.deleteStream(id);
        }}
      >
        Delete
      </button>
    );
  }
}
export default RecipeDelete;
