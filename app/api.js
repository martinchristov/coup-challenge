
export default {
	getScooters: () => {
		return new Promise((resolve) => {
			fetch('https://qc05n0gp78.execute-api.eu-central-1.amazonaws.com/prod/scooters')
				.then(d => d.json())
				.then(resp => resolve(resp))
		})
	}
}
