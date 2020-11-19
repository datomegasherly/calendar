import React, { useContext } from 'react';
import MainContext from '../context';
import { Grid } from '@material-ui/core';
import { useStyles, Year, Month, Day } from '../helper';


function Header() {
    let context = useContext(MainContext);
    let { year, month, day } = context;
    let classes = useStyles();
    return (
        <Grid container>
            <Grid item container xs={6}>
                <Grid className={classes.padding} item xs={12} sm={12} md={4}>
                    <Year />
                </Grid>
                <Grid className={classes.padding} item xs={12} sm={12} md={4}>
                    <Month />
                </Grid>
                <Grid className={classes.padding} item xs={12} sm={12} md={4}>
                    <Day />
                </Grid>
            </Grid>
            <Grid item xs={6}>
                {year} / {month} / {day}
            </Grid>
        </Grid>
    )
}

export default Header;