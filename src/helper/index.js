import React, { useContext } from 'react';
import MainContext from '../context';
import { FormHelperText, Select, MenuItem, makeStyles } from '@material-ui/core';
import { Fragment } from 'react';

const useStyles = makeStyles({
    selectSize: {
        width: '100%',
    },
    padding: {
        paddingLeft: '6px',
        paddingRight: '6px'
    }
});

const getLastDay = (year, month) => {
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
    let { month, setMonth } = context;
    const classes = useStyles();
    let months = [];
    for(let i = 1;i <= 12;i++){
        months.push(i);
    }
    return (
        <Fragment>
            <FormHelperText>Month</FormHelperText>
            <Select value={month} className={classes.selectSize} onChange={(ev) => setMonth(ev.target.value)}>
                {
                    months.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)
                }
            </Select>
        </Fragment>
    )
}

export {
    useStyles,
    getDate,
    Year,
    Month,
}