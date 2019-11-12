import React, { useState } from 'react'
import GraphPresentation from './GraphPresentation'
import useInterval from '../../../hooks/useInterval'

const GraphIntervalContainer = (props) => {
	const {
		width,
		height,
		initialData,
		generateNewData,
	} = props

	const [data, setData] = useState(initialData || [])

	useInterval(() => {
		setData([
			...data,
			generateNewData(data)
		])
	}, {min: 1000, max: 5000}) // Setting the delay of the interval to be a minimum of 1000ms and a maximum of 5000ms

	return (
		<GraphPresentation
			{...{
				data,
				width,
				height,
			}}
		/>
	)
}

export default GraphIntervalContainer