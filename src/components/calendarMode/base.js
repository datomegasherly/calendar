/**
 * base file to use in both weekly and monthly mode
 */
import React, { Fragment, useContext } from 'react';
import MainContext from '../../context';
import classNames from 'classnames';
import { useStyles, getDate, getLastDay, getCurrentDay, numToStr } from '../../helper';
import { Grid, Paper, Typography, Hidden } from '@material-ui/core';

// this function will return boxGrid
const bodyBox = ({context, currentDate, classes, changeState, update, Days, pYear, pMonth, pDay, type}) => {
    let currentDayEventCount = context.state.events.filter(event => event.full == `${pYear}-${numToStr(pMonth)}-${numToStr(pDay)}`).length;
    return (
        <Grid key={pDay} className={classNames(classes.boxMargin, classes.boxSize)} item>
            <Paper elevation={2} className={classNames(classes.cardBox, type=='notcurrent' ? classes.grayBox : '', 
                pYear == currentDate[0] && 
                pMonth == currentDate[1] && 
                pDay == currentDate[2] ? 'current' : (pYear == context.state.year && pMonth == context.state.month && pDay == context.state.day) ? 'selected' : '')}
                onClick={() => update(pYear, pMonth, pDay)}
            >
                <Typography variant="h6">{pDay}</Typography>
                <Typography className={classes.smallText}>
                    {Days[getCurrentDay(pYear, pMonth, pDay)]}
                </Typography>
                <Typography>
                    {
                        currentDayEventCount ?  
                        <Grid onClick={() => changeState(pYear,pMonth,pDay)}>{currentDayEventCount} Events</Grid> : 'No Events'
                    }
                </Typography>
            </Paper>
        </Grid>
    )
}

const dayBox = ({startDay, endDay, days, Days}) => {
    const context = useContext(MainContext);
    let { year, month, day, events } = context.state;
    let { setYear, setMonth, setDay, setMode } = context.dispatch;
    let currentDate = getDate();
    let classes = useStyles();
    let lastPrevDay = getLastDay(month-1 <= 0 ? year-1 : year, month-1 <= 0 ? 12 : month-1);
    lastPrevDay -= startDay.length;
    let prevYear = month-1 <= 0 ? year-1 : year;
    let prevMonth = month-1 <= 0 ? 12 : month-1;
    let nextYear = month+1 > 12 ? year+1 : year;
    let nextMonth = month+1 > 12 ? 1 : month+1;
    let nextSd = 0;
    let changeState = (...date) => {
        setYear(date[0]);
        setMonth(date[1]);
        setDay(date[2]);
        setMode(1);
    }
    let setPrevNext = (pYear, pMonth, pDay) => {
        setYear(pYear);
        setMonth(pMonth);
        setDay(pDay);
    }
    return (
        <Fragment>
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
                    let prevSd = lastPrevDay + 1;
                    lastPrevDay++;
                    return bodyBox({context, currentDate, classes, changeState, update: setPrevNext, Days, pYear: prevYear, pMonth: prevMonth, pDay: prevSd, type: 'notcurrent'});
                })
            }
            {
                days.map(d => {
                    return bodyBox({context, currentDate, classes, changeState, update: setPrevNext, Days, pYear: year, pMonth: month, pDay: d, type: 'current'});
                })
            }
            {
                endDay.map(ed => {
                    nextSd += 1;
                    return bodyBox({context, currentDate, classes, changeState, update: setPrevNext, Days, pYear: nextYear, pMonth: nextMonth, pDay: nextSd, type: 'notcurrent'});
                })
            }
        </Fragment>
    )
}

export {
    dayBox,
};