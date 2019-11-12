
import React from 'react'
import styles from './App.module.css'
import Card from '../global/card'
import Graph from '../global/graph'
import generateRandomNumber from '../../utils/generateRandomNumber'

const App = () => {
	const width = 700
	const height = 300
	const initialData = [
		{ key: 0, data: 0 },
		{ key: 1, data: 5 },
		{ key: 2, data: 10 },
	]

	const generateNewData = (data) => ({
		key: data.length,
		data: generateRandomNumber() // Defaults to generating a random number between 1 & 10
	})

	return (
		<div className={styles.cardsContainer}>
			<Card>
				<Graph
					{...{
						width,
						height,
						initialData,
						generateNewData,
					}}
				/>
			</Card>
		</div>
	)
}

export default App