import React, { useState, useEffect } from 'react';
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
import Grid from '@mui/material/Grid';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

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
		<div className='addtraining'>
			<Button variant='outlined' onClick={handleClickOpen}>
				Add training
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<Grid container spacing={1}>
					<Grid item xs={10}>
						<DialogTitle>New training</DialogTitle>
					</Grid>
					<DialogContent margin='5px'>
						<Grid item xs={10} sx={{ marginBottom: 1 }}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DateTimePicker
									renderInput={(props) => <TextField {...props} />}
									label='Date & Time'
									value={training.date}
									onChange={(newValue) => {
										setTraining({ ...training, date: newValue });
									}}
								/>
							</LocalizationProvider>
						</Grid>
						<Grid item xs={10}>
							<TextField
								margin='dense'
								label='Duration (min)'
								value={training.duration}
								onChange={e => setTraining({ ...training, duration: e.target.value })}
								fullWidth
								variant='standard'
							/>
							<TextField
								label='Activity'
								value={training.activity}
								onChange={e => setTraining({ ...training, activity: e.target.value })}
								fullWidth
								variant='standard'
							/>
						</Grid>
						<Grid item xs={10} sx={{ marginTop: 4 }}>
							<Box noValidate component='form'>
								<FormControl sx={{ width: '60%' }}>
									<InputLabel>Select customer</InputLabel>
									<Select
										label='Customer'
										value={training.customer}
										onChange={e => setTraining({ ...training, customer: e.target.value })}
									>
										{customers.map((customer, index) =>
											<MenuItem key={index} value={customer.links[0].href}>{customer.firstname} {customer.lastname}</MenuItem>
										)}
									</Select>
								</FormControl>
							</Box>
						</Grid>
					</DialogContent>
				</Grid>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}