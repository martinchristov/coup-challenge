import fetchMock from 'fetch-mock'
import api from '../app/api'

const apiUrl = 'https://qc05n0gp78.execute-api.eu-central-1.amazonaws.com'

fetchMock.config.overwriteRoutes = true

describe('api', () => {
	fetchMock.get(`${apiUrl}/prod/scooters`, { data: { scooters: [] } })

	test('fetches api', async () => {
		await api.getScooters().then((d) => {
			expect(d).toEqual({ data: { scooters: [] } })
		})
	})

	test('handles error if not json', () => {
		fetchMock.get(`${apiUrl}/prod/scooters`, 'raw text')
		expect.assertions(1)
		return api.getScooters().catch(err => expect(err.type).toBe('invalid-json'))
	})

	test('handles server error', () => {
		fetchMock.get(`${apiUrl}/prod/scooters`, 500, 'server error')
		expect.assertions(1)
		return api.getScooters().catch((err) => {
			expect(err).toEqual(new Error('server error'))
		})
		// expect(api.getScooters).toThrow() WHY DOESN'T THIS WORK?!?!?!?
	})
})
