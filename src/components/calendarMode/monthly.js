import React, { useContext } from 'react';
import MainContext from '../../context';
import { getLastDay, getCurrentDay, Days, getDate, useStyles, numToStr } from '../../helper';
import { Grid, Paper, Typography, Hidden } from '@material-ui/core';
import classNames from 'classnames';

function Monthly() {
    const context = useContext(MainContext);
    let { year, month, day, setYear, setMonth, setDay, setMode, events } = context;
    let changeState = (...date) => {
        setYear(date[0]);
        setMonth(date[1]);
        setDay(date[2]);
        setMode(1);
    }
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
                            <Hidden only={['xs', 'sm', 'md']}>
                                <Typography variant="h6" align="center">{ds}</Typography>
                            </Hidden>
                            <Hidden only={['lg', 'xl']}>
                                <Typography variant="h6" align="center">{ds.toString().slice(0,3)}</Typography>
                            </Hidden>
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
                    let newDay = numToStr(d);
                    let newMonth = numToStr(month);
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
                                        events[`${year}-${newMonth}-${newDay}`] && 
                                        events[`${year}-${newMonth}-${newDay}`].length ?  
                                            <Grid onClick={() => changeState(year,month,d)}>{events[`${year}-${newMonth}-${newDay}`].length} Events</Grid> : 'No Events'
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

export default Monthly;