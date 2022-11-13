import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import { format } from 'date-fns';

import { TRAINAPI_URL } from '../constants';

function Traininglist() {
	const [trainings, setTrainings] = useState([]);

	const [columnDefs] = useState([
		{
			field: 'date',
			sortable: true,
			filter: true,
			valueFormatter: params =>
				format(new Date(params.value), "dd.MM.yyyy hh:mm"),
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
	]);

	useEffect(() => {
		gettrainings();
	}, []);

	const gettrainings = () => {
		fetch(TRAINAPI_URL)
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