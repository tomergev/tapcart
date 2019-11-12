import React from 'react'
import { ScatterPlot } from 'reaviz'

function Graph(props) {
	const {
		data,
		width,
		height,
	} = props

	return (
		<ScatterPlot
			{...{
				data,
				width,
				height,
			}}
		/>
	)
}

export default Graph