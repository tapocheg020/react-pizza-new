import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = props => (
	<ContentLoader
		className='pizza-block'
		speed={2}
		width={280}
		height={466}
		viewBox='0 0 280 466'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
		{...props}
	>
		<circle cx="137" cy="128" r="125" /> 
    <rect x="0" y="272" rx="12" ry="12" width="280" height="21" /> 
    <rect x="0" y="315" rx="12" ry="12" width="280" height="88" /> 
    <rect x="1" y="423" rx="12" ry="12" width="95" height="30" /> 
    <rect x="121" y="414" rx="30" ry="30" width="152" height="45" />
	</ContentLoader>
)

export default Skeleton
