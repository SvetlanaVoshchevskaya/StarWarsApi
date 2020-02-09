import React, { Component } from 'react';
import s from './Search.module.css';
import { connect } from 'react-redux';
import { addValue } from '../../redux/action';
import { fetchFilms } from '../../redux/action';
import url from '../../services/url';

class Search extends Component {
  state = {};

  handleChange = (e) => {
    this.props.addValue(e.target.value);
    if (e.target.value === '') {
      this.props.fetchFilms(url);
    }
  };

  render() {
    const { value } = this.props;
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
const MDTP = (dispatch) => ({
  addValue: (value) => dispatch(addValue(value)),
  fetchFilms: (url) => dispatch(fetchFilms(url))
});
export default connect(null, MDTP)(Search);
