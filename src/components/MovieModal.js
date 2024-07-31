import React from 'react';
import MovieCard from './MovieCard';
import MovieList from './MovieList';

const MovieModal = ({ movie, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{movie.title}</h2>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
        <p>{movie.overview}</p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> {movie.vote_average}</p>
      </div>
    </div>
  );
};

export default MovieModal;



