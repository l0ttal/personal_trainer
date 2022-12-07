import React, { useState } from 'react';

import Home from './Home';
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';
import Calendar from './Calendar';
import Stats from './Stats';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';

function TabApp() {
	const [value, setValue] = useState('home');

	const handleChange = (event, value) => {
		setValue(value);
	};

	return (
		<>
			<Box sx={{ width: '100%' }}>
				<AppBar position='static'>
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor='secondary'
						textColor='inherit'
						variant='fullWidth'
						aria-label='full width tabs example'
					>
						<Tab value='home' label='Home' />
						<Tab value='customerlist' label='Customers' />
						<Tab value='traininglist' label='Training' />
						<Tab value='calendar' label='Calendar' />
						<Tab value='stats' label='Stats' />
					</Tabs>
				</AppBar>
				{value === 'home' && <Home />}
				{value === 'customerlist' && <Customerlist />}
				{value === 'traininglist' && <Traininglist />}
				{value === 'calendar' && <Calendar />}
				{value === 'stats' && <Stats />}
			</Box>
		</>
	);
}

export default TabApp;