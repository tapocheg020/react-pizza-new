import qs from 'qs'
import React, { useContext, useEffect, useRef } from 'react'
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
import { fetchPizzas } from '../redux/slices/pizzaSlice'

const Home = () => {
	const { categoryId, sort, currentPage } = useSelector(state => state.filter)
	const { items, status } = useSelector(state => state.pizza)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const { searchValue } = useContext(SearchContext)

	const getPizzas = async () => {
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const sortBy = sort.sortProperty.replace('-', '')
		const search = searchValue ? `&search=${searchValue}` : ''

		dispatch(
			fetchPizzas({
				category,
				order,
				sortBy,
				search,
				currentPage,
			})
		)
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
			getPizzas()
		}
		isSearch.current = false
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
	const pizzas =
		Array.isArray(items) && items.length > 0 ? (
			items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
		) : (
			<p>No pizzas available</p>
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
			{status === 'error' ? (
				<div className='content__error-info'>
					<h2>Произошла ошибка 😓</h2>
					<p>
						К сожалению, не удалось получить пиццы(
						<br />
						Попробуйте повторить попытку позже!
					</p>
				</div>
			) : (
				<div className='content__items'>
					{status === 'loading' ? skeleton : pizzas}
				</div>
			)}
			<Pagination
				currentPage={currentPage}
				onChangePage={number => dispatch(setCurrentPage(number))}
			/>
		</>
	)
}

export default Home
