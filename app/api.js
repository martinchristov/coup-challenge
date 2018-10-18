class API {
	getScooters = () => fetch('https://qc05n0gp78.execute-api.eu-central-1.amazonaws.com/prod/scooters')
		.then((resp) => {
			if (resp.ok) {
				return resp.json()
			}
			throw new Error('server error')
		})
}

export default new API()
