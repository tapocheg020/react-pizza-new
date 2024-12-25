import React, { useEffect, useState } from 'react'
import Categories from '../components/categories/Categories'
import Pagination from '../components/pagination/pagination'
import PizzaBlock from '../components/pizzaBlock/PizzaBlock'
import Skeleton from '../components/pizzaBlock/Skeleton'
import Sort from '../components/sort/Sort'

const Home = ({ searchValue, setSearchValue }) => {
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [categoryId, setCategoryId] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)
	const [sortType, setSortType] = useState({
		name: 'популярности',
		sortProperty: 'rating',
	})

	useEffect(() => {
		setIsLoading(true)
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
		const sortBy = sortType.sortProperty.replace('-', '')
		const search = searchValue ? `&search=${searchValue}` : ''

		fetch(
			`https://65e430913070132b3b24590e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)
			.then(res => res.json())
			.then(arr => {
				setItems(arr)
				setIsLoading(false)
			})
			.catch(error => {
				console.error('Ошибка при запросе:', error)
			})
		window.scrollTo(0, 0)
	}, [categoryId, sortType, searchValue, currentPage])

	const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
	const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
	return (
		<>
			<div className='content__top'>
				<Categories
					categoryValue={categoryId}
					onChangeCategory={id => setCategoryId(id)}
				/>
				<Sort sortValue={sortType} onChangeSort={id => setSortType(id)} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{/* {items.map(obj => (
							<Skeleton key={obj.id} {...obj} />
						))} */}
				{isLoading ? skeleton : pizzas}
			</div>
			<Pagination onChangePage={number => setCurrentPage(number)} />
		</>
	)
}

export default Home
