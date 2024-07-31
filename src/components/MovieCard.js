import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie-card" onClick={onClick}>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieCard;
