
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import SearchBar from './SearchBar';

class MovieList extends Component {
  state = {
    movies: [],
    page: 1,
    hasMore: true,
    selectedMovie: null,
    searchQuery: ''
  };

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = () => {
    const { page } = this.state;
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=38ea5e7c8561a585923cb35fd520dfa3&page=${page}`)
      .then(res => {
        this.setState({
          movies: [...this.state.movies, ...res.data.results],
          page: this.state.page + 1,
          hasMore: res.data.results.length > 0
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  selectMovie = (movie) => {
    this.setState({ selectedMovie: movie });
  };

  closeModal = () => {
    this.setState({ selectedMovie: null });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    const { movies, hasMore, selectedMovie, searchQuery } = this.state;

    const filteredMovies = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div>
        <SearchBar onSearch={this.handleSearch} />
        <InfiniteScroll
          dataLength={filteredMovies.length}
          next={this.fetchMovies}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <div className="movie-list">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} onClick={() => this.selectMovie(movie)} />
            ))}
          </div>
        </InfiniteScroll>
        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default MovieList;
