import https from 'https'

export default {
	getScooters: () => {
		return new Promise((resolve, reject) => {
			https.Server.timeout = 5000
			https.get('https://qc05n0gp78.execute-api.eu-central-1.amazonaws.com/prod/scooters', (resp) => {
				let data = '';
				resp.on('data', (chunk) => {
					data += chunk;
				});
				resp.on('end', () => {
					try {
						resolve(JSON.parse(data))
					} catch (e) {
						reject()
					}
				});
			})
				.on('error', () => {
					reject()
				})
		})
	}
}
