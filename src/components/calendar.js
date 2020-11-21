import React, { useContext } from 'react';
import MainContext from '../context';
import { getLastDay, getCurrentDay, Days, getDate, useStyles } from '../helper';
import { Grid, Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';

function Calendar() {
    const context = useContext(MainContext);
    let { year, month, day, setDay, events } = context;
    let currentDate = getDate();
    let lastDay = getLastDay(year, month);
    let days = [];
    for(let i = 1;i <= lastDay;i++){
        days.push(i);
    }
    let classes = useStyles();
    let startDay = [];
    for(let i = 0;i <= getCurrentDay(year, month, currentDate[2])-1;i++){
        startDay.push(i);
    }
    return (
        <Grid style={{marginTop: '15px'}} container>
            {
                Days.map(ds => {
                    return (
                        <Grid key={Math.random()} className={classNames(classes.boxMargin, classes.boxSize)} item>
                            {ds}
                        </Grid>
                    )
                })
            }
            {
                startDay.map(sd => {
                    return (
                        <Grid key={Math.random()} className={classNames(classes.boxMargin, classes.boxSize)} item>

                        </Grid>
                    )
                })
            }
            {
                days.map(d => {
                    return (
                        <Grid key={d} className={classNames(classes.boxMargin, classes.boxSize)} item>
                            <Paper elevation={2} className={classNames(classes.cardBox, 
                                year == currentDate[0] && 
                                month == currentDate[1] && 
                                d == currentDate[2] ? 'current' : d == day ? 'selected' : '')}

                                onClick={() => setDay(d)}
                            >
                                <Typography variant="h6">{d}</Typography>
                                <Typography className={classes.smallText}>
                                    {Days[getCurrentDay(year, month, d)]}
                                </Typography>
                                <Typography>
                                    { 
                                        events && 
                                        events[`${year}-${month}-${d}`] && 
                                        events[`${year}-${month}-${d}`].length ?  
                                            `${events[`${year}-${month}-${d}`].length} Events` : 'No Events'
                                    }
                                </Typography>
                            </Paper>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default Calendar;