import nock from 'nock'
import api from '../app/api'

const apiUrl = 'https://qc05n0gp78.execute-api.eu-central-1.amazonaws.com'

describe('api', () => {
	nock(apiUrl)
		.get('/prod/scooters')
		.reply(200, {
			data: {
				scooters: []
			}
		})

	test('fetches api', async () => {
		await api.getScooters().then((d) => {
			expect(d.data.scooters.length).toBe(0)
		})
	})

	test('handles error if not json', async () => {
		nock(apiUrl)
			.get('/prod/scooters')
			.reply(200, 'raw text')
		let error = false
		await api.getScooters().then(() => {}, () => {
			error = true
		})
		expect(error).toBe(true)
	})

	test('handles server error', async () => {
		nock(apiUrl)
			.get('/prod/scooters')
			.reply(500, 'error')
		let error = false
		await api.getScooters().then(() => {}, () => {
			error = true
		})
		expect(error).toBe(true)
	})
})
