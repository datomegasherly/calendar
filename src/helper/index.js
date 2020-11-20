import React, { useContext } from 'react';
import MainContext from '../context';
import { FormHelperText, Select, MenuItem, makeStyles } from '@material-ui/core';
import { Fragment } from 'react';

const useStyles = makeStyles({
    selectSize: {
        width: '100%',
    },
    padding: {
        paddingLeft: '3px',
        paddingRight: '3px'
    },
    boxMargin: {
        padding: '6px'
    },
    cardBox: {
        padding: '6px',
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
});

const getLastDay = (year, month) => {
    if(month > 11){
        month = 0;
        year += 1;
    }
    let lastDay = new Date(year, month, 0);
    return lastDay.getDate();
}

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

export {
    useStyles,
    getLastDay,
    getDate,
    Year,
    Month,
    Day
}