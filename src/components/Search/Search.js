import React, { Component } from 'react';
import s from "./Search.module.css";

class Search extends Component {
  state = { value: "" };

  handleChange = e => {
    this.setState({ value: e.target.value }, () => {
      this.props.upDateValue(this.state.value);
    });
  };

  render() {
    const { value } = this.state;
    return (
      <input
        id="search"
        placeholder="search film name.."
        className={s.search}
        type="text"
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}

export default Search;
