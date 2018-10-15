export default {
	getScooters: () => {
		const controller = new AbortController();
		const { signal } = controller;
		setTimeout(() => controller.abort(), 5000);
		return new Promise((resolve) => {
			fetch('https://qc05n0gp78.execute-api.eu-central-1.amazonaws.com/prod/scooters', { signal })
				.then(d => d.json())
				.then(resp => resolve(resp))
		})
	}
}
