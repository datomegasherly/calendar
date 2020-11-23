import React, { useContext } from 'react';
import MainContext from '../context';
import { FormHelperText, Select, MenuItem, makeStyles } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Fragment } from 'react';

const theme = createMuiTheme({
    palette: {
      primary: {
            light: green[400],
            main: green[600],
            dark: green[800],
            contrastText: '#fff',
        }
    },
});

const useStyles = makeStyles({
    selectSize: {
        width: '100%',
    },
    boxSize: {
        width: '14.28%'
    },
    padding: {
        paddingLeft: '3px',
        paddingRight: '3px'
    },
    boxMargin: {
        padding: '6px'
    },
    cardBox: {
        padding: '4px',
        width: '100%',
        cursor: 'pointer',
        '&.selected': {
            backgroundColor: '#cce8f3'
        },
        '&.current': {
            backgroundColor: '#47c0f1',
            color: 'white'
        }
    },
    smallText: {
        fontSize: '8pt !important'
    },
    links: {
        textDecoration: 'none'
    }
});

const getLastDay = (year, month) => {
    if(month > 11){
        month = 0;
        year += 1;
    }
    let lastDay = new Date(year, month, 0);
    return lastDay.getDate();
}
/**
 * this function will return current day number of the week
 * @param {string|number} year 
 * @param {string|number} month 
 * @param {string|number} day 
 */
const getCurrentDay = (year, month, day) => {
    let currentDay = new Date(year, month-1, day);
    return currentDay.getDay();
}
/**
 * this variable will set start day of the week ( currently it's sunday )
 */
const Days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

const getDate = () => {
    let date = new Date();
    let ymd = [date.getFullYear(), date.getMonth()+1, date.getDate()];
    return ymd;
}

function Year() {
    let context = useContext(MainContext);
    let { year, setYear } = context;
    let [y, m, d] = getDate();
    const classes = useStyles();
    let years = [];
    for(let i = y - 5;i <= y + 2;i++){
        years.push(i);
    }
    return (
        <Fragment>
            <FormHelperText>Year</FormHelperText>
            <Select value={year} className={classes.selectSize} onChange={(ev) => setYear(ev.target.value)}>
                {
                    years.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)
                }
            </Select>
        </Fragment>
    )
}

function Month() {
    let context = useContext(MainContext);
    let { month, setMonth, setDay } = context;
    const classes = useStyles();
    let months = [];
    for(let i = 1;i <= 12;i++){
        months.push(i);
    }
    return (
        <Fragment>
            <FormHelperText>Month</FormHelperText>
            <Select value={month} className={classes.selectSize} onChange={(ev) => { setMonth(ev.target.value);setDay(1)}}>
                {
                    months.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)
                }
            </Select>
        </Fragment>
    )
}

function Day() {
    let context = useContext(MainContext);
    let { day, setDay, month, year } = context;
    const classes = useStyles();
    let days = [];
    let lastDay = getLastDay(year, month);
    for(let i = 1;i <= lastDay;i++){
        days.push(i);
    }
    return (
        <Fragment>
            <FormHelperText>Day</FormHelperText>
            <Select value={day} className={classes.selectSize} onChange={(ev) => setDay(ev.target.value)}>
                {
                    days.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)
                }
            </Select>
        </Fragment>
    )
}

const Modes = [
    'Daily',
    'Weekly',
    'Monthly'
];

function Mode() {
    let context = useContext(MainContext);
    let { mode, setMode } = context;
    const classes = useStyles();
    return (
        <Fragment>
            <FormHelperText>View Mode</FormHelperText>
            <Select value={mode} className={classes.selectSize} onChange={(ev) => setMode(ev.target.value)}>
                {
                    Modes.map((m, i) => <MenuItem key={i+1} value={i+1}>{m}</MenuItem>)
                }
            </Select>
        </Fragment>
    )
}

export {
    theme,
    useStyles,
    getLastDay,
    getCurrentDay,
    Days,
    getDate,
    Year,
    Month,
    Day,
    Modes,
    Mode
}