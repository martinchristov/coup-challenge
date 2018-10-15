import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Dropdown, Label, Input } from 'semantic-ui-react'
import api from '../api'

class App extends React.Component {
	state = {
		scooters: [],
		modelOptions: [
			{ key: 0, value: 0, text: 'All models' }
		],
		filterModel: 0,
		filterBatteryRange: [0, 100]
	}

	componentWillMount() {
		this.fetchScooters()
		this.intid = setInterval(this.fetchScooters, 10000)
	}

	componentWillUnmount() {
		clearInterval(this.intid)
	}

	fetchScooters = () => {
		api.getScooters().then((resp) => {
			const { scooters } = resp.data
			// collect dropdown items in modelOptions
			const models = {}
			scooters.forEach((scooter) => {
				models[scooter.model] = true
			})
			const modelOptions = Object.keys(models).map(model => ({
				key: model, text: model, value: model
			}))
			this.setState({
				scooters,
				modelOptions: [this.state.modelOptions[0], ...modelOptions]
			})
		})
	}

	displayScooters = () => {
		return this.state.scooters.filter((scooter) => {
			return (this.state.filterModel === 0 ? true
				: this.state.filterModel === scooter.model)
				&& (scooter.energy_level >= this.state.filterBatteryRange[0]
					&& scooter.energy_level <= this.state.filterBatteryRange[1]
				)
		})
	}

	render() {
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
							onChange={(e, data) => {
								this.setState({
									filterModel: data.value
								})
							}}
						/>
					</li>
					<li>
						<Label pointing="below">Battery between</Label>
						<div className="battery-range">
							<Input
								data-testid="min-battery-input"
								icon="percent"
								value={this.state.filterBatteryRange[0]}
								onChange={(e, d) => {
									this.setState({
										filterBatteryRange: [Number(d.value), this.state.filterBatteryRange[1]]
									})
								}}
							/>
							<Input
								data-testid="max-battery-input"
								icon="percent"
								value={this.state.filterBatteryRange[1]}
								onChange={(e, d) => {
									this.setState({
										filterBatteryRange: [this.state.filterBatteryRange[0], Number(d.value)]
									})
								}}
							/>
						</div>
					</li>
					<li className="total">
						{this.displayScooters().length} scooters
					</li>
				</ul>

				<ReactTable
					data={this.displayScooters()}
					columns={[
						{
							Header: 'Scooter',
							accessor: 'license_plate'
						},
						{
							Header: 'Model',
							id: 'model',
							accessor: 'model'
						},
						{
							Header: 'Distance',
							accessor: 'distance_to_travel'
						},
						{
							Header: 'Battery',
							accessor: 'energy_level'
						}
					]}
					defaultPageSize={10}
					className="-striped -highlight"
				/>
			</div>
		);
	}
}

export default App;
