class API {
	getScooters = () => new Promise((resolve, reject) => {
		fetch('https://qc05n0gp78.execute-api.eu-central-1.amazonaws.com/prod/scooters')
			.then(resp => resp.json())
			.then(resp => resolve(resp))
			.catch(err => reject(err))
	})
}

export default new API()
