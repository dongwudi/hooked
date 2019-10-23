import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './Header'
import Movie from './Movei'
import Search from './Search'

const MOVIE_API_URL = `http://www.omdbapi.com/?s=ant&apikey=c5c2850f`

function App() {
	const [loading, setLoading] = useState(true)
	const [movies, setMovies] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)

  // 挂载调用
	useEffect(() => {
		fetch(MOVIE_API_URL)
			.then(res => res.json())
			.then(res => {
				setMovies(res.Search)
				setLoading(false)
			})
	}, []) // [] 仅在组件挂载和卸载时执行

  // 搜索调用
	const search = searchValue => {
		setLoading(true)
		setErrorMessage(null)

		fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=c5c2850f`)
			.then(res => res.json())
			.then(res => {
				if (res.Response === 'True') {
					setMovies(res.Search)
					setLoading(false)
				} else {
					setErrorMessage(res.Error)
					setLoading(false)
				}
			})
	}

	return (
		<div className="App">
			<Header text="Hooked" />
			<Search search={search} />
			<p className="App-intro">Sharing a few of our favourite movies</p>
			<div className="movies">
				{loading && !errorMessage ? (
					<span>loading...</span>
				) : errorMessage ? (
					<div className="errorMessage">{errorMessage}</div>
				) : (
					movies.map((movie, index) => <Movie movie={movie} key={`${index} - ${movie.Title}`} />)
				)}
			</div>
		</div>
	)
}

export default App
