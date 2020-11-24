import React, { useContext, useState, useEffect } from 'react';
import { useStyles, theme } from '../helper';
import { Link } from 'react-router-dom';
import { Button, FormControl, Grid, Input, InputLabel } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MainContext from '../context';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function Add(){
    let [ event, setEvent ] = useState({
        event: '',
        year: '',
        month: '',
        day: '',
        full: '',
        startTime: '',
        endTime: '' 
    });
    const context = useContext(MainContext);
    let { year, month, day } = context;
    const handleTimeChange = (date, type) => {
        switch(type){
            case 'start':
                setEvent({startTime: date});
                break;
            case 'end':
                setEvent({endTime: date});
        }
    }
    const handleEventChange = (ev) => {
        let event = ev.target.value;
        setEvent({event});
    }
    useEffect(() => {
        let full = `${year}-${month}-${day}`;
        let startTime = new Date(`${full}T00:00:00`);
        let endTime = new Date(`${full}T00:00:00`);
        setEvent({year, month, day, full, startTime, endTime});
    }, []);
    let classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container>
                    <Grid container className={classes.marginBottom}>
                        <Grid item xs={4} sm={4} md={6}>
                            <Link to="/" className={classes.links}>
                                <Button startIcon={<ArrowBackIosIcon />} variant="contained" color="secondary">
                                    Back
                                </Button>
                            </Link>
                        </Grid>
                        <Grid align="right" item xs={8} sm={8} md={6}>
                            <Button variant="contained" color="primary">
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={12} md={6}>
                        <Grid item mt={5} xs={12} className={classes.padding}>
                            <FormControl className={classes.selectSize}>
                                <InputLabel htmlFor="event">Event Description</InputLabel>
                                <Input id="event" value={event.event} onChange={handleEventChange} />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={12} md={6}>
                        <Grid item mt={5} xs={12} sm={6} className={classes.padding}>
                            <FormControl className={classes.selectSize}>
                                <TimePicker
                                    ampm={false}
                                    id="startTime"
                                    label="Start Time"
                                    value={event.startTime}
                                    onChange={(date) => handleTimeChange(date, 'start')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.padding}>
                            <FormControl className={classes.selectSize}>
                                <TimePicker
                                    ampm={false}
                                    id="endTime"
                                    label="End Time"
                                    value={event.endTime}
                                    onChange={(date) => handleTimeChange(date, 'end')}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    )
}

export default Add;