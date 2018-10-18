import fetchMock from 'fetch-mock'
import api from '../app/api'

const apiUrl = 'https://qc05n0gp78.execute-api.eu-central-1.amazonaws.com'

fetchMock.config.overwriteRoutes = true

describe('api', () => {
	fetchMock.get(`${apiUrl}/prod/scooters`, { data: { scooters: [] } })

	test('fetches api', async () => {
		await api.getScooters().then((d) => {
			expect(d.data.scooters.length).toBe(0)
		})
	})

	test('handles error if not json', async () => {
		fetchMock.get(`${apiUrl}/prod/scooters`, 'raw text')
		let error = false
		await api.getScooters().then(() => {}, () => {
			error = true
		})
		expect(error).toBe(true)
	})

	test('handles server error', async () => {
		fetchMock.get(`${apiUrl}/prod/scooters`, 500, 'raw text')
		let error = false
		await api.getScooters().then(() => {}, () => {
			error = true
		})
		expect(error).toBe(true)
	})
})
