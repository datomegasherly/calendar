import React, { useContext } from 'react';
import MainContext from '../context';
import { getLastDay, getDate, useStyles } from '../helper';
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
    return (
        <Grid style={{marginTop: '15px'}} container>
            {
                days.map(d => {
                    return (
                        <Grid key={d} className={classes.boxMargin} container item xs={6} sm={4} md={3} lg={2}>
                            <Paper elevation={2} className={classNames(classes.cardBox, 
                                year == currentDate[0] && 
                                month == currentDate[1] && 
                                d == currentDate[2] ? 'current' : d == day ? 'selected' : '')}

                                onClick={() => setDay(d)}
                            >
                                <Typography variant="h6">{d}</Typography>
                                <Typography color="textSecondary">
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