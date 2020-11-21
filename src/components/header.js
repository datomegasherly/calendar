import React, { useContext } from 'react';
import MainContext from '../context';
import { Grid, Button, Box, Hidden } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TodayIcon from '@material-ui/icons/Today';
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
            <Grid item container xs={8} sm={9} md={9} lg={10}>
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
            <Grid item container xs={4} sm={3} md={3} lg={2} pl={2}>
                <Box mt={1} width="50%" align="center">
                    <Button onClick={() => updateDate({setYear, setMonth, setDay})} variant="outlined" color="primary">
                        <TodayIcon /><Hidden only={['xs', 'sm']}> Today</Hidden>
                    </Button>
                </Box>
                <Box mt={1} width="50%" align="center">
                    <Button onClick={() => updateDate({setYear, setMonth, setDay})} variant="outlined" color="primary">
                        <AddIcon /><Hidden only={['xs', 'sm']}> Add</Hidden>
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Header;