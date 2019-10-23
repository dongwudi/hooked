import React, { useEffect, useReducer } from 'react'
import './App.css'
import Header from './Header'
import Movie from './Movei'
import Search from './Search'

const MOVIE_API_URL = `http://www.omdbapi.com/?s=ant&apikey=c5c2850f`

const initState = {
	loading: true,
	movies: [],
	errorMessage: null
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'SEARCH_MOVIES_REQUEST':
			return {
				...state,
				loading: true,
				errorMessage: null
			}
		case 'SEARCH_MOVIES_SUCCESS':
			return {
				...state,
				loading: false,
				movies: action.payload
			}
		case 'SEARCH_MOVIES_FAILURE':
			return {
				...state,
				loading: false,
				errorMessage: action.error
			}
		default:
			return state
	}
}

function App() {
	const [state, dispatch] = useReducer(reducer, initState)

	// 挂载调用
	useEffect(() => {
		fetch(MOVIE_API_URL)
			.then(res => res.json())
			.then(res => {
				dispatch({
					type: 'SEARCH_MOVIES_SUCCESS',
					payload: res.Search
				})
			})
	}, []) // [] 仅在组件挂载和卸载时执行

	// 搜索调用
	const search = searchValue => {
		dispatch({
			type: 'SEARCH_MOVIES_REQUEST'
		})

		fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=c5c2850f`)
			.then(res => res.json())
			.then(res => {
				if (res.Response === 'True') {
					dispatch({
						type: 'SEARCH_MOVIES_SUCCESS',
						payload: res.Search
					})
				} else {
					dispatch({
						type: 'SEARCH_MOVIES_FAILURE',
						error: res.Error
					})
				}
			})
	}

	const { movies, loading, errorMessage } = state

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
