import React, { useContext } from 'react';
import MainContext from '../context';
import { FormHelperText, Select, MenuItem, makeStyles } from '@material-ui/core';
import { Fragment } from 'react';

const useStyles = makeStyles({
    selectSize: {
        width: '100%'
    }
});

const getDate = () => {
    let date = new Date();
    let ymd = [date.getFullYear(), date.getMonth()+1, date.getDate()];
    return ymd;
}

function Year() {
    let context = useContext(MainContext);
    let { year, setYear } = context;
    const classes = useStyles();
    return (
        <Fragment>
            <FormHelperText>Year</FormHelperText>
            <Select defaultValue={year} className={classes.selectSize} onChange={(ev) => setYear(ev.target.value)}>
                <MenuItem value={2017}>2017</MenuItem>
                <MenuItem value={2018}>2018</MenuItem>
                <MenuItem value={2019}>2019</MenuItem>
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
            </Select>
        </Fragment>
    )
}

export {
    getDate,
    Year
}