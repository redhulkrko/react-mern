import React, { Component } from "react";
import { withContext } from "../context/AppContext";

class AddTodoForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
    };
  }

  handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  clearInputs = () => {
    this.setState({
      title: "",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props
      .addTodo(this.state)
      .then((response) => {
        this.clearInputs();
      })
      .catch((err) => console.error(err.response.data.message));
  };

  render() {
    return (
      <div>
        <h1>Welcome {this.props.user.username}</h1>

        <form onSubmit={this.handleSubmit}>
          <h4>Add New Todo</h4>

          <input
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            type="text"
            placeholder="Title"
          />

          <button>+</button>
        </form>
      </div>
    );
  }
}

export default withContext(AddTodoForm);
