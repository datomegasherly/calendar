import React, { useContext } from 'react';
import MainContext from '../context';
import { FormHelperText, Select, MenuItem, makeStyles, Button, Hidden, Box, ButtonGroup } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Fragment } from 'react';
import axios from 'axios';

// base url
/** use http://localhost:8001/calendar/api to test in local */
const api = 'https://magic-ops.com/calendar/api'; // change to your server url
const uri = `${api}/calendar`;
const configUri = `${api}/config`;

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
    padding10: {
        padding: '10px'
    },
    marginBottom: {
        marginBottom: '10px'
    },
    padding: {
        paddingLeft: '3px',
        paddingRight: '3px'
    },
    boxMargin: {
        padding: '6px'
    },
    cardBox: {
        height: '100px',
        padding: '3px',
        width: '100%',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
            backgroundColor: '#dff6ff',
            color: 'darkgray',
            transition: 'all 0.2s ease-in-out'
        },
        '&.selected': {
            backgroundColor: '#8cdfff',
            transition: 'all 0.2s ease-in-out'
        },
        '&.current': {
            backgroundColor: '#47c0f1',
            color: 'white',
            transition: 'all 0.2s ease-in-out'
        }
    },
    smallText: {
        fontSize: '8pt !important'
    },
    links: {
        textDecoration: 'none'
    },
    floatright: {
        marginTop: '-5px',
        float: 'right'
    },
    marginRight: {
        marginRight: '5px'
    },
    grayBox: {
        backgroundColor: '#efefef',
        color: '#ababab'
    },
    eventSelect: {
        "&:hover": {
            color: 'red'
        }
    },
    highlightDays: {
        backgroundColor: '#efefef'
    },
    floatRight: {
        float: 'right'
    }
});

const getLastDay = (year, month) => {
    if(month > 12){
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
    let { year, month } = context.state;
    let { setYear } = context.dispatch;
    let [y, m, d] = getDate();
    const classes = useStyles();
    let years = [];
    for(let i = y - 5;i <= y + 2;i++){
        years.push(i);
    }
    return (
        <Fragment>
            <FormHelperText>Year</FormHelperText>
            <Select value={year} className={classes.selectSize} onChange={(ev) => { setYear(ev.target.value);updateData(context.dispatch, ev.target.value, month); }}>
                {
                    years.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)
                }
            </Select>
        </Fragment>
    )
}

function Month() {
    let context = useContext(MainContext);
    let { year, month } = context.state;
    let { setMonth, setDay } = context.dispatch;
    const classes = useStyles();
    let months = [];
    for(let i = 1;i <= 12;i++){
        months.push(i);
    }
    return (
        <Fragment>
            <FormHelperText>Month</FormHelperText>
            <Select value={month} className={classes.selectSize} onChange={(ev) => { setMonth(ev.target.value);setDay(1);updateData(context.dispatch, year, ev.target.value); }}>
                {
                    months.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)
                }
            </Select>
        </Fragment>
    )
}

function Day() {
    let context = useContext(MainContext);
    let { day, month, year } = context.state;
    let { setDay } = context.dispatch;
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
    let { mode } = context.state;
    let { setMode } = context.dispatch;
    const classes = useStyles();
    return (
        <Fragment>
            <Box mt={1} width="33%" align="center">
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button onClick={() => setMode(1)}>
                        Daily
                    </Button>
                    <Button onClick={() => setMode(2)}>
                        Weekly
                    </Button>
                    <Button onClick={() => setMode(3)}>
                        Monthly
                    </Button>
                </ButtonGroup>
            </Box>
        </Fragment>
    )
}

/**
 * this function will convert json object to form data
 * @param {object} data 
 */
function toFormData(data){
    let dt = [];
    Object.keys(data).map(r => {
        let newData = data[r];
        if(typeof(data[r]) == 'object'){
            newData = JSON.stringify(data[r]);
        }
        dt.push(`${r}=${newData}`);
    });
    return dt.join('&');
}

/**
 * this function will add 0 to start of number that is below 10
 * @param {Number} num
 */
function numToStr(num){
    return num < 10 ? `0${num}` : num;
}

// this function will update events by select year, month and select mode as weekly or daily
function updateData(dispatch, year, month, startDay = 0, endDay = 0){
    let { setEvents } = dispatch;
    let newUrl = startDay && endDay ? `${uri}/${year}/${month}/${startDay}/${endDay}` : `${uri}/${year}/${month}`;
    axios.get(newUrl).then(function (res) {
        setEvents(res.data);
    }).catch(function (error) {
        throw error;
    });
}

export {
    uri,
    configUri,
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
    Mode,
    toFormData,
    numToStr,
    updateData
}