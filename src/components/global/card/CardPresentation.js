import React from 'react'
import styles from './Card.module.css'

function Card(props) {
	const { children } = props

	return (
		<div className={styles.card}>
			{children}
		</div>
	)
}

export default Card