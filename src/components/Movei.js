import React from 'react'

const DEFAULT_IMAGE = require('./mv300.jpg')

const Movie = ({movie}) => {
  const poster = movie.Poster === 'N/A' ? DEFAULT_IMAGE : movie.Poster

  return (
    <div className="movie">
      <h2>{movie.Title}</h2>
      <div>
        <img width="200" src={poster} alt={`The movie titled: ${movie.Title}`}/>
      </div>
      <p>{movie.Year}</p>
    </div>
  )
}

export default Movie