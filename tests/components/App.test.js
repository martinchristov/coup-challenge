import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import api from '../../app/api'
import App from '../../app/components/App'

jest.mock('../../app/api')

configure({ adapter: new Adapter() });

describe('App Component', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<App />);
	});

	it('should exist', () => {
		wrapper = shallow(<App />)
		expect(wrapper).toBeTruthy()
	});

	test('should fetch scooters', () => {
		api.getScooters().then((resp) => {
			const { scooters } = resp.data
			expect(scooters.length).toBe(2)
			expect(wrapper.instance().state.scooters).toEqual(scooters)
		})
	})

	test('should collect filter model options correctly', () => {
		expect(wrapper.instance().state.modelOptions.length).toBe(3)
	})

	test('filters scooter models', () => {
		const dropdown = wrapper.find('Dropdown')
		expect(dropdown.exists()).toBe(true)
		dropdown.simulate('change', null, {
			value: 'Gogoro 1st edition'
		})
		expect(wrapper.instance().displayScooters().length).toBe(1)
		dropdown.simulate('change', null, {
			value: 0
		})
		expect(wrapper.instance().displayScooters().length).toBe(2)
	})

	test('filters min-max battery', () => {
		const minInput = wrapper.find('[data-testid="min-battery-input"]')
		const maxInput = wrapper.find('[data-testid="max-battery-input"]')
		minInput.simulate('change', null, {
			value: 50
		})
		expect(wrapper.instance().displayScooters().length).toBe(1)
		minInput.simulate('change', null, {
			value: 0
		})
		maxInput.simulate('change', null, {
			value: 10
		})
		expect(wrapper.instance().displayScooters().length).toBe(1)
	})
})
