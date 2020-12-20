import React, { useContext } from 'react';
import MainContext from '../../context';
import { getLastDay, getCurrentDay, Days } from '../../helper';
import { Grid } from '@material-ui/core';
import { DayBox } from './base';

function Monthly() {
    const context = useContext(MainContext);
    let { year, month } = context.state;
    let lastDay = getLastDay(year, month);
    let days = [];
    for(let i = 1;i <= lastDay;i++){
        days.push(i);
    }
    let startDay = [];
    for(let i = 0;i <= getCurrentDay(year, month, 1)-1;i++){
        startDay.push(i);
    }
    let lastDayOfMonth = getCurrentDay(year, month, lastDay);
    let endDay = [];
    for(let i = 0;i < 6 - lastDayOfMonth;i++){
        endDay.push(i);
    }
    return (
        <Grid style={{marginTop: '15px'}} container>
            <DayBox startDay={startDay} endDay={endDay} days={days} Days={Days} />
        </Grid>
    )
}

export default Monthly;