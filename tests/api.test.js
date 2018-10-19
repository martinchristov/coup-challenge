import fetchMock from 'fetch-mock'
import api from '../app/api'

const apiUrl = 'https://qc05n0gp78.execute-api.eu-central-1.amazonaws.com'

fetchMock.config.overwriteRoutes = true

describe('api', () => {
	test('fetches api', async () => {
		fetchMock.get(`${apiUrl}/prod/scooters`, { data: { scooters: [] } })
		await api.getScooters().then((d) => {
			expect(d).toEqual({ data: { scooters: [] } })
		})
	})

	test('handles error if not json', () => {
		fetchMock.get(`${apiUrl}/prod/scooters`, 'raw text')
		return api.getScooters().catch(err => expect(err.type).toBe('invalid-json'))
	})

	test('handles server error', () => {
		fetchMock.get(`${apiUrl}/prod/scooters`, 500, 'server error')
		expect(api.getScooters()).rejects.toEqual(new TypeError("Cannot read property 'on' of undefined")) // WHY DOESN'T THIS WORK?!?!?!?
	})
})
