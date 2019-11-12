// Source (Dan Abramov): https://overreacted.io/making-setinterval-declarative-with-react-hooks/ 
import React, { useEffect, useRef } from 'react'
import generateRandomNumber from '../utils/generateRandomNumber'

function useInterval(callback, delay = { min: 1000, max: 5000 }) {
	const savedCallback = useRef()

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current()
		}
		
		if (delay !== null) {
			let id = setInterval(tick, generateRandomNumber(delay.min, delay.max))
			return () => clearInterval(id)
		}
	}, [delay])
}

export default useInterval