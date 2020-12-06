import React, { useContext } from 'react';
import { useStyles, theme, toFormData, url, numToStr } from '../../helper';
import { Link } from 'react-router-dom';
import { Button, FormControl, Grid, Input, InputLabel } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MainContext from '../../context';
import axios from 'axios';

function Edit(props){
    let { event, setEvent, handleEventChange, handleTimeChange, checkEvent } = props;
    let context = useContext(MainContext);
    let { year, month, day, events } = context.state;
    let { setEvents, setMode } = context.dispatch;
    let classes = useStyles();

    let editEvent = () => {
        if(checkEvent()){
            let currentEvent = events[`${year}-${numToStr(month)}-${numToStr(day)}`];
            let id = event.id;
            if(!currentEvent){
                setEvent({redirect: true});
                return;
            }
            if(!currentEvent.find(r => r.id == id)){
                setEvent({redirect: true});
                return;
            }
            let start_time = {hour: event.startTime.getHours(), minute: event.startTime.getMinutes()};
            let end_time = {hour: event.endTime.getHours(), minute: event.endTime.getMinutes()};
            let full = `${year}-${numToStr(month)}-${numToStr(day)}`;
            let data = {
                id,
                year,
                month,
                day,
                full,
                event: event.title,
                start_time,
                end_time
            };
            let formData = toFormData(data);
            setEvent({...event, loading: true});
            axios({
                method: 'PUT',
                data: formData,
                url
                /**
                 * use async/await function because setEvents ( in context ) will reset eventMode function and it will remove state
                 */
            }).then(async res => {
                if(res.data.success){
                    currentEvent.map(r => {
                        if(r.id == id){
                            r.event = event.title,
                            r.start_time = start_time;
                            r.end_time = end_time;
                        }
                    });
                    await setEvent({...event, redirect: true});
                    setEvents({...events, [`${year}-${numToStr(month)}-${numToStr(day)}`]: currentEvent}); // add event to selected day
                    setMode(1); // change mode to daily
                } else if(res.data.error){
                    setEvent({...event, error: true, errorTitle: res.data.error});
                } else {
                    setEvent({...event, error: true, errorTitle: 'Error when edit data'});
                }
            }).catch(err => {
                setEvent({...event, error: true, errorTitle: err.message});
            });
        }
    }
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
                            <Button onClick={editEvent} variant="contained" color="primary">
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>Current Date : {`${year}/${month}/${day}`}</Grid>
                    <Grid container item xs={12} sm={12} md={6}>
                        <Grid item mt={5} xs={12} className={classes.padding}>
                            <FormControl className={classes.selectSize}>
                                <InputLabel htmlFor="event">Event Description</InputLabel>
                                <Input id="event" value={event.title || ''} onChange={handleEventChange} />
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

export default Edit;