import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/header/Header'
import Cart from './pages/Cart'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './scss/app.scss'
//00.00.00 #9

function App() {
	const [searchValue, setSearchValue] = useState('')

	return (
		<div className='wrapper'>
			<Header searchValue={searchValue} setSearchValue={setSearchValue} set />
			<div className='content'>
				<div className='container'>
					<Routes>
						<Route
							path='/'
							element={
								<Home
									searchValue={searchValue}
									setSearchValue={setSearchValue}
								/>
							}
						/>
						<Route path='*' element={<NotFound />} />
						<Route path='/cart' element={<Cart />} />
					</Routes>
				</div>
			</div>
		</div>
	)
}

export default App
