const API = {
	getScooters: () => fetch('https://qc05n0gp78.execute-api.eu-central-1.amazonaws.com/prod/scooters')
		.then(res => res.json())
}

export default API
