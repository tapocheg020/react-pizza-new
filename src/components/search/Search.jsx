import debounce from 'lodash.debounce'
import React, { useCallback, useContext, useRef, useState } from 'react'
import { SearchContext } from '../../App'
import styles from './Search.module.scss'

const Search = () => {
	const [value, setValue] = useState('')
	const { setSearchValue } = useContext(SearchContext)
	const inputRef = useRef()

	const onClickClear = () => {
		setSearchValue('')
		setValue('')
		inputRef.current.focus()
	}

	const updateSearchValue = useCallback(
		debounce(str => {
			setSearchValue(str)
		}, 500),
		[]
	)

	const onChangeInput = event => {
		setValue(event.target.value)
		updateSearchValue(event.target.value)
	}

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				width='800px'
				height='800px'
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z'
					stroke='#000000'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.input}
				placeholder='Поиск пиццы...'
			/>
			{value && (
				<svg
					onClick={onClickClear}
					className={styles.clearIcon}
					width='800px'
					height='800px'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M8 8L16 16'
						stroke='#000000'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M16 8L8 16'
						stroke='#000000'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			)}
		</div>
	)
}
export default Search
