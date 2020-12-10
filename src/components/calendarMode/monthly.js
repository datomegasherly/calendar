import React, { useContext } from 'react';
import MainContext from '../../context';
import { getLastDay, getCurrentDay, Days } from '../../helper';
import { Grid } from '@material-ui/core';
import { dayBox } from './base';

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
    return (
        <Grid style={{marginTop: '15px'}} container>
            { dayBox({startDay, endDay: [], days, Days}) }
        </Grid>
    )
}

export default Monthly;