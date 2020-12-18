import React, { useContext } from 'react';
import MainContext from '../context';
import { Grid, Button, Box, Hidden, ButtonGroup } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TodayIcon from '@material-ui/icons/Today';
import { useStyles, Year, Month, Day, getDate, Mode, updateData } from '../helper';
import { Link } from 'react-router-dom';

function updateDate({setEvents, setYear, setMonth, setDay}) {
    let [ year , month, day ] = getDate();
    setYear(year);
    setMonth(month);
    setDay(day);
    updateData({setEvents}, year, month);
}

function FullDateInput(){
    let classes = useStyles();
    return (
        <React.Fragment>
            <Grid className={classes.padding} item xs={4}>
                <Year />
            </Grid>
            <Grid className={classes.padding} item xs={4}>
                <Month />
            </Grid>
            <Grid className={classes.padding} item xs={4}>
                <Day />
            </Grid>
        </React.Fragment>
    )
}

function CenterButtonGroup(){
    let context = useContext(MainContext);
    let { setEvents, setYear, setMonth, setDay } = context.dispatch;
    return (
        <Box mt={1} width="33%" align="center">
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button onClick={() => updateDate({setEvents, setYear, setMonth, setDay})}>
                    <TodayIcon /><Hidden only={['xs', 'sm']}> Today</Hidden>
                </Button>
                <Button component={Link} to="/add" color="primary" aria-label="contained primary button">
                    <AddIcon /><Hidden only={['xs', 'sm']}> Add</Hidden>
                </Button>
            </ButtonGroup>
        </Box>
    )
}

function Header() {
    return (
        <Grid container>
            <Grid item container xs={6} sm={8} md={5} lg={6}>
                <FullDateInput />
            </Grid>
            <Grid item container xs={6} sm={4} md={3} lg={2} pl={2}>
                <CenterButtonGroup />
            </Grid>
            <Grid item container xs={12} sm={12} md={4} lg={3} pl={2}>
                <Mode />
            </Grid>
        </Grid>
    )
}

export default Header;