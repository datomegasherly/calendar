import React from 'react';
import MainContext from '../context';
import Monthly from './calendarMode/monthly';
import Weekly from './calendarMode/weekly';
import Daily from './calendarMode/daily';
import { Typography, Box } from '@material-ui/core';

function Calendar() {
    const context = React.useContext(MainContext);
    let { mode } = context.state;
    switch(mode){
        case 1:
            return <div data-test="daily-component"><Daily /></div>
        case 2:
            return <div data-test="weekly-component"><Weekly /></div>
        case 3:
            return <div data-test="monthly-component"><Monthly /></div>
        default:
            return <div data-test="noview-component"><Box pt={5}><Typography variant="h6">No View</Typography></Box></div>
    }
}

export default Calendar;