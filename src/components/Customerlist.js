import React, { useState, useEffect } from "react";
import { CUSTAPI_URL } from '../constants';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import Button from '@mui/material/Button';

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
		{
			width: 120,
			cellRenderer: params =>
				<Button color="error" size="small" onClick={() => deleteCustomer(params.data)}>Delete</Button>
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

	const deleteCustomer = (data) => {
		if (window.confirm('Are you sure?')) {
			fetch(data.links[0].href, { method: 'DELETE' })
				.then(response => {
					if (response.ok) {
						getCustomers();
					} else {
						alert('Something went wrong with delete');
					}
				})
				.catch(err => console.error(err))
		}
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