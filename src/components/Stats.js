import React, { useState, useEffect } from "react";
import { GET_TRAININGS_API_URL } from '../constants';

import { BarChart, Bar, CartesianGrid, YAxis, XAxis, Tooltip, Legend } from "recharts";

import { groupBy, sumBy } from "lodash";

import Grid from '@mui/material/Grid';

function Stats() {
	const [trainings, setTrainings] = useState([]);

	useEffect(() => {
		getTrainings();
	}, []);

	const getTrainings = () => {
		fetch(GET_TRAININGS_API_URL)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					alert('Something went wrong');
				}
			})
			.then(data => setTrainings(data))
			.catch(err => console.error(err))
	}

	return (
		<>
			<Grid container spacing={3} sx={{ margin: '50px' }}>
				<Grid item xs={12}>
					<BarChart width={930} height={450} data={trainings}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="activity" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="duration" fill="#8884d8" />
					</BarChart>
				</Grid>
			</Grid>
		</>
	)
}

export default Stats;