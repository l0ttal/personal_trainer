import React, { useState, useEffect, useCallback, useRef } from "react";
import { CUSTAPI_URL } from '../constants';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import CsvExportModule from '@ag-grid-community/csv-export';

import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";

function Customerlist() {
	const gridRef = useRef();
	const [customers, setCustomers] = useState([]);

	const [columnDefs] = useState([
		{
			field: 'firstname',
			sortable: true,
			resizable: true,
			filter: true,

		},
		{
			field: 'lastname',
			sortable: true,
			resizable: true,
			filter: true,

		},
		{
			field: 'streetaddress',
			sortable: true,
			resizable: true,
			filter: true,
		},
		{
			field: 'postcode',
			sortable: true,
			resizable: true,
			filter: true,

		},
		{
			field: 'city',
			sortable: true,
			resizable: true,
			filter: true,

		},
		{
			field: 'email',
			sortable: true,
			resizable: true,
			filter: true,
		},
		{
			field: 'phone',
			sortable: true,
			resizable: true,
			filter: true,

		},
		{
			resizable: true,

			cellRenderer: params => <EditCustomer data={params.data} editcustomer={editCustomer} />
		},
		{
			resizable: true,

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

	const editCustomer = (customer, url) => {
		fetch(url, {
			method: 'PUT',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(customer),
		})
			.then(response => {
				if (response.ok) {
					getCustomers();
				} else {
					alert('Something went wrong with updating the customer');
				}
			})
			.catch(err => console.error(err))
	}

	const addCustomer = (customer) => {
		fetch(CUSTAPI_URL, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(customer),
		})
			.then(response => {
				if (response.ok) {
					getCustomers();
				} else {
					alert('Something went wrong with adding the customer');
				}
			})
			.catch(err => console.error(err))
	}

	const onCSVExport = useCallback(() => {
		gridRef.current.api.exportDataAsCsv();
	}, []);

	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<AddCustomer addcustomer={addCustomer} />
					<Button onClick={onCSVExport}>Export to CSV</Button>
				</Grid>
				<Grid item xs={11}>
					<div className="ag-theme-material" style={{ height: 620, margin: 'auto' }}>
						<AgGridReact rowData={customers}
							columnDefs={columnDefs}
							pagination={true}
							suppressCellFocus={true}
							paginationPageSize={10}
							animateRows={true}
							ref={gridRef}
						/>
					</div>
				</Grid>
			</Grid>
		</>
	)
}

export default Customerlist;