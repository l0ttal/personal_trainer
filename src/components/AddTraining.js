import React, { useState, useEffect } from "react";
import { CUSTAPI_URL } from '../constants';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function AddTraining(props) {
	const [open, setOpen] = useState(false);
	const [customers, setCustomers] = useState([]);
	const [training, setTraining] = useState({
		date: '',
		duration: '',
		activity: '',
		customer: '',
	});

	useEffect(() => {
		getCustomers();
	}, []);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = () => {
		props.addtraining(training);
		setOpen(false);
	}

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
		<div className="addtraining">
			<Button variant="outlined" onClick={handleClickOpen}>
				Add training
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>New training</DialogTitle>
				<DialogContent>
					<TextField
						margin="dense"
						label="Date"
						value={training.date}
						onChange={e => setTraining({ ...training, date: e.target.value })}
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						label="Duration"
						value={training.duration}
						onChange={e => setTraining({ ...training, duration: e.target.value })}
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						label="Activity"
						value={training.activity}
						onChange={e => setTraining({ ...training, activity: e.target.value })}
						fullWidth
						variant="standard"
					/>
					<Box noValidate component="form">
						<FormControl sx={{ margin: 2, width: '60%' }}>
							<InputLabel>Select customer</InputLabel>
							<Select
								label="Customer"
								value={training.customer}
								onChange={e => setTraining({ ...training, customer: e.target.value })}
							>
								{customers.map((customer, index) =>
									<MenuItem key={index} value={customer.links[0].href}>{customer.firstname} {customer.lastname}</MenuItem>
								)}
							</Select>
						</FormControl>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}