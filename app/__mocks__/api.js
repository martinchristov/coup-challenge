export default {
	getScooters: jest.fn(() => new Promise((resolve) => {
		resolve({
			data: {
				scooters: [
					{
						distance_to_travel: 40.8,
						energy_level: 58,
						id: 'd9ef5bf9-ee2a-4c13-a5b1-5d78022c906c',
						license_plate: '840ERE',
						location: { lng: 13.392165623969296, lat: 52.51171866518212 },
						market_id: 'fb7aadac-bded-4321-9223-e3c30c5e3ba5',
						model: 'Gogoro 1st edition',
						vin: 'RHMGRSAN0GT100646'
					},
					{
						distance_to_travel: 10.8,
						energy_level: 5,
						id: 'd9ef5bf9-ee2a-4c13-a5b1-5d78022c906c',
						license_plate: '840ERE',
						location: { lng: 13.392165623969296, lat: 52.51171866518212 },
						market_id: 'fb7aadac-bded-4321-9223-e3c30c5e3ba5',
						model: 'Gogoro 2nd edition',
						vin: 'RHMGRSAN0GT100646'
					}
				]
			}
		})
	}))
}
