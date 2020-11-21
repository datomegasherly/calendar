import React, { useContext } from 'react';
import MainContext from '../context';
import { Grid, Button, Box } from '@material-ui/core';
import { useStyles, Year, Month, Day, getDate } from '../helper';

function updateDate({setYear, setMonth, setDay}) {
    let [ year , month, day ] = getDate();
    setYear(year);
    setMonth(month);
    setDay(day);
}

function Header() {
    let context = useContext(MainContext);
    let { year, month, day, setYear, setMonth, setDay } = context;
    let classes = useStyles();
    return (
        <Grid container>
            <Grid item container xs={9}>
                <Grid className={classes.padding} item xs={4}>
                    <Year />
                </Grid>
                <Grid className={classes.padding} item xs={4}>
                    <Month />
                </Grid>
                <Grid className={classes.padding} item xs={4}>
                    <Day />
                </Grid>
            </Grid>
            <Box xs={6} mt={1} ml={2}>
                <Button onClick={() => updateDate({setYear, setMonth, setDay})} variant="contained" color="primary">Today</Button>
            </Box>
        </Grid>
    )
}

export default Header;