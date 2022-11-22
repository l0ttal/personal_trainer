import React, { useState } from 'react';

import Home from './Home';
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';
import Calendar from './Calendar';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabApp() {
	const [value, setValue] = useState('home');

	const handleChange = (event, value) => {
		setValue(value);
	};

	return (
		<>
			<Box sx={{ flexGrow: 1, display: 'flex', height: '227' }}>
				<Tabs value={value} onChange={handleChange} orientation="vertical" sx={{ borderRight: 1, borderColor: 'divider' }}>
					<Tab value="home" label="Home" />
					<Tab value="customerlist" label="Customers" />
					<Tab value="traininglist" label="Training" />
					<Tab value="calendar" label="Calendar" />
				</Tabs>
				{value === 'home' && <Home />}
				{value === 'customerlist' && <Customerlist />}
				{value === 'traininglist' && <Traininglist />}
				{value === 'calendar' && <Calendar />}
			</Box>
		</>
	);
}

export default TabApp;