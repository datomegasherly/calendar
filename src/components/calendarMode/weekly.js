import React, { useContext } from 'react';
import MainContext from '../../context';
import { getLastDay, getCurrentDay, Days, getDate, useStyles } from '../../helper';
import { Grid } from '@material-ui/core';
import { dayBox } from './base';

function Weekly() {
    const context = useContext(MainContext);
    let { year, month, day } = context.state;
    let lastDay = getLastDay(year, month);
    let days = [];
    for(let i = 1;i <= lastDay;i++){
        days.push(i);
    }
    let currentWeekDays = []; // list of current week days
    let beforeDays = [];
    let afterDays = [];
    let currentDay = getCurrentDay(year, month, day);
    for(let i = day - currentDay;i <= day + (6 - currentDay);i++){
        if(i <= 0){
            beforeDays.push(i);
        } else if(i > lastDay) {
            afterDays.push(i);
        } else {
            currentWeekDays.push(i);
        }
    }
    return (
        <Grid style={{marginTop: '15px'}} container>
            { dayBox({startDay: beforeDays, endDay: afterDays, days: currentWeekDays, Days}) }
        </Grid>
    )
}

export default Weekly;