import React, { useState, useEffect } from "react";
import { GET_TRAININGS_API_URL } from '../constants';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'

import Grid from '@mui/material/Grid';

function Calendar() {
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
					<FullCalendar
						plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
						firstDay={1}
						headerToolbar={{
							left: 'prev,next today',
							center: 'title',
							right: 'dayGridMonth,timeGridWeek,timeGridDay'
						}}
						initialView='dayGridWeek'
						events={trainings}
					/>
				</Grid>
			</Grid>
		</>
	)
}

export default Calendar;