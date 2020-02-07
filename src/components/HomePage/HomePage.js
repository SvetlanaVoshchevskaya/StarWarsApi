import React, { Component } from 'react';
import url from '../services/url';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import Loader from '../Loader/Loader';
import axios from 'axios';
import s from './HomePage.module.css';

class Home extends Component {
  state = {
    films: [],
    value: ''
  };

  componentDidMount() {
    this.fetchFilms();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this.filterFilms();
    }
    if (this.state.value === '') {
      this.fetchFilms();
    }
  }

  fetchFilms = async () => {
    await axios
      .get(url)
      .then((data) => {
        this.setState({ films: data.data.results });
      })
      .catch((error) => error);
  };

  upDateValue = (date) => {
    this.setState({ value: date });
  };

  sortFilm = () => {
    const { films } = this.state;
    this.setState({
      films: films.sort((a, b) => (a.title > b.title ? 1 : -1))
    });
  };

  filterFilms = () => {
    const { films, value } = this.state;
    this.setState({
      films: films.filter((film) => film.title.includes(value))
    });
  };

  render() {
    const { films } = this.state;

    return (
      <div className={s.container}>
        <h1 className={s.title}> Star Wars</h1>
        <Search upDateValue={this.upDateValue} />
        {films.length === 0 && <Loader />}
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

export default Home;
