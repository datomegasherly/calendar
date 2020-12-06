import React, { useContext } from 'react';
import MainContext from '../../context';
import { getLastDay, getCurrentDay, Days, getDate, useStyles, numToStr } from '../../helper';
import { Grid, Paper, Typography, Hidden } from '@material-ui/core';
import classNames from 'classnames';

function Weekly() {
    const context = useContext(MainContext);
    let { year, month, day, events } = context.state;
    let { setDay } = context.dispatch;
    let currentDate = getDate();
    let lastDay = getLastDay(year, month);
    let days = [];
    for(let i = 1;i <= lastDay;i++){
        days.push(i);
    }
    let classes = useStyles();
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
                beforeDays.map(sd => {
                    return (
                        <Grid key={Math.random()} className={classNames(classes.boxMargin, classes.boxSize)} item>

                        </Grid>
                    )
                })
            }
            {
                currentWeekDays.map(d => {
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
                                            `${events[`${year}-${newMonth}-${newDay}`].length} Events` : 'No Events'
                                    }
                                </Typography>
                            </Paper>
                        </Grid>
                    )
                })
            }
            {
                afterDays.map(sd => {
                    return (
                        <Grid key={Math.random()} className={classNames(classes.boxMargin, classes.boxSize)} item>

                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default Weekly;