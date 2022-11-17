import React, { useState, useEffect } from "react";
import { GET_TRAININGS_API_URL, TRAINAPI_URL } from '../constants';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import Button from '@mui/material/Button';

import { format } from 'date-fns';

import AddTraining from "./AddTraining";

function Traininglist() {
	const [trainings, setTrainings] = useState([]);

	const [columnDefs] = useState([
		{
			field: 'date',
			sortable: true,
			filter: true,
			valueFormatter: params =>
				format(new Date(params.value), 'dd.MM.yyyy hh:mm'),
		},
		{
			field: 'duration',
			sortable: true,
			filter: true,
			width: 150,
		},
		{
			field: 'activity',
			sortable: true,
			filter: true,
		},
		{
			field: 'customer.firstname',
			sortable: true,
			filter: true,
		},
		{
			field: 'customer.lastname',
			sortable: true,
			filter: true,
		},
		{
			width: 120,
			cellRenderer: params =>
				<Button color="error" size="small" onClick={() => deleteTraining(params.data)}>Delete</Button>
		},
	]);

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

	const deleteTraining = (data) => {
		if (window.confirm('Are you sure?')) {
			fetch(TRAINAPI_URL + '/' + data.id, { method: 'DELETE' })
				.then(response => {
					if (response.ok) {
						getTrainings();
					} else {
						alert('Something went wrong with delete');
					}
				})
				.catch(err => console.error(err))
		}
	}

	const addTraining = (training) => {
		training = { ...training, date: new Date(training.date).toISOString() };
		fetch(TRAINAPI_URL, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(training),
		})
			.then(response => {
				if (response.ok) {
					getTrainings();
				} else {
					alert('Something went wrong with adding the training');
				}
			})
			.catch(err => console.error(err))
	}

	return (
		<>
			<AddTraining addtraining={addTraining} />
			<div className="ag-theme-material" style={{ height: 620, width: '100%', margin: 'auto' }}>
				<AgGridReact rowData={trainings}
					columnDefs={columnDefs}
					pagination={true}
					suppressCellFocus={true}
					paginationPageSize={10}
					animateRows={true} />
			</div>
		</>
	)
}

export default Traininglist;