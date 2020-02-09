import React, { Component } from 'react';
import { connect } from 'react-redux';
import url from '../../services/url';
import { Link } from 'react-router-dom';
import { fetchFilms } from '../../redux/action';
import Search from '../Search/Search';
import Loader from '../Loader/Loader';
import s from './HomePage.module.css';

class Home extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchFilms(url);
  }

  sortFilm = () => {
    const { films } = this.props;
    this.setState({
      films: films.sort((a, b) => (a.title > b.title ? 1 : -1))
    });
  };

  render() {
    const { films, isLoading } = this.props;

    return (
      <div className={s.container}>
        <h1 className={s.title}> Star Wars</h1>
        <Search upDateValue={this.upDateValue} />
        {isLoading && <Loader />}
        {films.length > 0 && (
          <>
            <button className={s.sortBtn} onClick={this.sortFilm}>
              Sort
            </button>
            <ul className={s.filmsList}>
              {films.map((film, idx) => (
                <li key={idx} className={s.filmItem}>
                  <Link to={`films/${idx}`}>
                    <p>{film.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
}

const MSTP = (state) => ({
  films: state.films,
  isLoading: state.isLoading,
  value: state.value
});

const MDTP = (dispatch) => ({
  fetchFilms: (url) => dispatch(fetchFilms(url))
});
export default connect(MSTP, MDTP)(Home);
