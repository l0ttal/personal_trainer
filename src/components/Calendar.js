import React, { useState, useEffect } from "react";
import { GET_TRAININGS_API_URL } from '../constants';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

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
				<Grid item xs={10}>
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
						eventContent={function (arg) {
							if (arg.view.type == 'dayGridMonth') {
								return {
									html: arg.timeText + '<br>' + arg.event._def.extendedProps.customer.firstname + ' ' + arg.event._def.extendedProps.customer.lastname + ' / ' + arg.event._def.extendedProps.activity + '<br>',
								}
							} else {
								return {
									html: arg.timeText + '<br>' + arg.event.extendedProps.customer.firstname + ' ' + arg.event.extendedProps.customer.lastname + ' / ' + arg.event.extendedProps.activity + '<br>',
								}
							}
						}}
						eventTimeFormat={{
							hour: '2-digit',
							minute: '2-digit',
						}}
					/>
				</Grid>
			</Grid>
		</>
	)
}

export default Calendar;