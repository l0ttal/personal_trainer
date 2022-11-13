import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import { CUSTAPI_URL } from '../constants';

function Customerlist() {
	const [customers, setCustomers] = useState([]);

	const [columnDefs] = useState([
		{
			field: 'firstname',
			sortable: true,
			filter: true,
			width: 150,
		},
		{
			field: 'lastname',
			sortable: true,
			filter: true,
			width: 150,
		},
		{
			field: 'streetaddress',
			sortable: true,
			filter: true,
		},
		{
			field: 'postcode',
			sortable: true,
			filter: true,
			width: 150,
		},
		{
			field: 'city',
			sortable: true,
			filter: true,
			width: 150,
		},
		{
			field: 'email',
			sortable: true,
			filter: true,
		},
		{
			field: 'phone',
			sortable: true,
			filter: true,
			width: 150,
		},
	])

	useEffect(() => {
		getCustomers();
	}, []);

	const getCustomers = () => {
		fetch(CUSTAPI_URL)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					alert('Something went wrong');
				}
			})
			.then(data => setCustomers(data.content))
			.catch(err => console.error(err))
	}

	return (
		<>
			<div className="ag-theme-material" style={{ height: 620, width: '100%', margin: 'auto' }}>
				<AgGridReact rowData={customers}
					columnDefs={columnDefs}
					pagination={true}
					suppressCellFocus={true}
					paginationPageSize={10}
					animateRows={true} />
			</div>
		</>
	)
}

export default Customerlist;