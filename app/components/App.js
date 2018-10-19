import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Dropdown, Label, Input } from 'semantic-ui-react'
import api from '../api'

const allModelsOption = { key: 0, value: 0, text: 'All models' }
const gridDefs = [
	{
		Header: 'License Plate',
		accessor: 'license_plate'
	},
	{
		Header: 'Model',
		id: 'model',
		accessor: 'model'
	},
	{
		Header: 'Distance to travel',
		accessor: 'distance_to_travel'
	},
	{
		Header: 'Energy level',
		accessor: 'energy_level'
	}
]
class App extends Component {
	state = {
		scooters: [],
		modelOptions: [
			allModelsOption
		],
		filterModel: 0,
		filterBatteryMin: 0,
		filterBatteryMax: 100
	}

	componentWillMount() {
		this.fetchScooters()
		this.intid = setInterval(this.fetchScooters, 10000)
	}

	componentWillUnmount() {
		clearInterval(this.intid)
	}

	fetchScooters = () => {
		api.getScooters().then(({ data: { scooters } }) => {
			this.setStateFromFetch(scooters)
		}).catch(() => {}) // silent fail
	}

	setStateFromFetch = (scooters) => {
		const modelOptions = scooters.map(({ model }) => model)
			.filter((value, index, arr) => arr.indexOf(value) === index)
			.map(model => ({ key: model, text: model, value: model }))
		this.setState({
			scooters,
			modelOptions: [allModelsOption, ...modelOptions]
		})
	}

	displayScooters = () => {
		const {
			filterModel,
			scooters,
			filterBatteryMin,
			filterBatteryMax
		} = this.state

		return scooters.filter(({ energy_level, model }) => { // eslint-disable-line
			const inBatteryRange = energy_level >= filterBatteryMin && energy_level <= filterBatteryMax // eslint-disable-line
			const isModelVisible = [0, model].indexOf(filterModel) !== -1
			return isModelVisible
				&& inBatteryRange
		})
	}

	onDropdownChange = (e, data) => this.setState({
		filterModel: data.value
	})

	setFilterBatteryMin = (ev, data) => this.setState({
		filterBatteryMin: Number(data.value)
	})

	setFilterBatteryMax = (ev, data) => this.setState({
		filterBatteryMax: Number(data.value)
	})

	render() {
		const { filterBatteryMin, filterBatteryMax } = this.state
		const gridRows = this.displayScooters()
		return (
			<div>
				<h2 id="heading">Hello Coup</h2>
				<ul className="filters">
					<li>
						<Label pointing="below">Filter by model</Label>
						<Dropdown
							placeholder="Choose model"
							search
							selection
							options={this.state.modelOptions}
							value={this.state.filterModel}
							onChange={this.onDropdownChange}
						/>
					</li>
					<li>
						<Label pointing="below">Battery between</Label>
						<div className="battery-range">
							<Input
								data-testid="min-battery-input"
								icon="percent"
								value={filterBatteryMin}
								onChange={this.setFilterBatteryMin}
							/>
							<Input
								data-testid="max-battery-input"
								icon="percent"
								value={filterBatteryMax}
								onChange={this.setFilterBatteryMax}
							/>
						</div>
					</li>
					<li className="total">
						{gridRows.length} scooters
					</li>
				</ul>

				<ReactTable
					data={gridRows}
					columns={gridDefs}
					defaultPageSize={10}
					className="-striped -highlight"
				/>
			</div>
		);
	}
}

export default App;
