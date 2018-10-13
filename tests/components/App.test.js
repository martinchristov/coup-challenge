import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch'

import App from '../../app/components/App';

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
})
