import React, { useContext } from 'react';
import MainContext from '../context';
import Monthly from './calendarMode/monthly';
import Weekly from './calendarMode/weekly';
import Daily from './calendarMode/daily';
import { Typography, Box } from '@material-ui/core';

function Calendar() {
    const context = useContext(MainContext);
    let { mode } = context.state;
    switch(mode){
        case 1:
            return <Daily />
        case 2:
            return <Weekly />
        case 3:
            return <Monthly />
        default:
            return <Box pt={5}><Typography variant="h6">No View</Typography></Box>
    }
}

export default Calendar;