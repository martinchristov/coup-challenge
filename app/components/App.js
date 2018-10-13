import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class App extends React.Component {
	state = {
		scooters: []
	}

	componentWillMount() {
		fetch('https://qc05n0gp78.execute-api.eu-central-1.amazonaws.com/prod/scooters')
			.then(d => d.json())
			.then((resp) => {
				const { scooters } = resp.data
				this.setState({
					scooters
				})
			})
	}

	render() {
		return (
			<div>
				<h2 id="heading">Hello Coup</h2>

				<ReactTable
					data={this.state.scooters}
					columns={[
						{
							Header: 'Scooter',
							accessor: 'license_plate'
						},
						{
							Header: 'Model',
							id: 'model',
							accessor: d => d.model
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
