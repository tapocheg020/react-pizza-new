import axios from 'axios'
import qs from 'qs'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../App'

import Categories from '../components/categories/Categories'
import Pagination from '../components/pagination/Pagination'
import PizzaBlock from '../components/pizzaBlock/PizzaBlock'
import Skeleton from '../components/pizzaBlock/Skeleton'
import Sort, { list } from '../components/sort/Sort'
import {
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice'

const Home = () => {
	const { categoryId, sort, currentPage } = useSelector(state => state.filter)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const { searchValue } = useContext(SearchContext)

	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const fetchPizzas = async () => {
		setIsLoading(true)
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const sortBy = sort.sortProperty.replace('-', '')
		const search = searchValue ? `&search=${searchValue}` : ''

		axios
			.get(
				`https://65e430913070132b3b24590e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
			)
			.then(res => {
				setItems(res.data)
				setIsLoading(false)
			})
			.catch(error => {
				console.error('Ошибка при запросе:', error)
			})
	}

// Если изменили параметры и был первый рендер то только тогда проверяй нужно ли вшивать измененные параметры в URL 
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			})
			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, sort.sortProperty, currentPage])


	// Если был первый рендер то проверяем его параметры в URL и вшиваем его в redux 
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))

			const sort = list.find(obj => obj.sortProperty === params.sortProperty)

			dispatch(
				setFilters({
					...params,
					sort,
				})
			)
			isSearch.current = true
		}
	}, [])

	//Идет проверка при первом рендере нужно ли делать запрос пицц( это чтобы не было 2 запроса в первом рендере)
	useEffect(() => {
		window.scrollTo(0, 0)

		if (!isSearch.current) {
			fetchPizzas()
		}
		isSearch.current = false
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
	const pizzas =
		Array.isArray(items) && items.length > 0 ? (
			items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
		) : (
			<p>Таких пиц не существует</p>
		)
	return (
		<>
			<div className='content__top'>
				<Categories
					categoryValue={categoryId}
					onChangeCategory={id => dispatch(setCategoryId(id))}
				/>
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skeleton : pizzas}</div>
			<Pagination
				currentPage={currentPage}
				onChangePage={number => dispatch(setCurrentPage(number))}
			/>
		</>
	)
}

export default Home
