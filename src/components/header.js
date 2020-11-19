import React, { useContext } from 'react';
import MainContext from '../context';
import { Grid, Button, FormControl, Select, MenuItem, FormHelperText, makeStyles } from '@material-ui/core';
import { Year } from '../helper';

function Header() {
    let context = useContext(MainContext);
    let { year } = context;
    return (
        <Grid container>
            <Grid item container xs={6}>
                <Grid item xs={12} sm={12} md={4}>
                    <Year />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    
                </Grid>
            </Grid>
            <Grid item xs={6}>
                {year}
            </Grid>
        </Grid>
    )
}

export default Header;