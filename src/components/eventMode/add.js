import React, { useContext, useState, useRef, useEffect } from 'react';
import { useStyles, theme, toFormData, uri, numToStr, colors } from '../../helper';
import { v4 } from 'uuid';
import { Link, Redirect } from 'react-router-dom';
import { Button, FormControl, Grid, Input, InputLabel, Box, Select, MenuItem } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MainContext from '../../context';
import axios from 'axios';
import classNames from 'classnames';
import initRef from '../../helper/refHelper';

function Add(props){
    let { event, setEvent, handleChange, handleTimeChange, checkEvent } = props;
    let context = useContext(MainContext);
    let { year, month, day, events, open, category, status } = context.state;
    let { setEvents, setMode, setOpen } = context.dispatch;
    let classes = useStyles();
    let [ RefBox, OrigBox, setHandler ] = initRef({useState, useRef, useEffect, document, index: 0});
    let saveEvent = () => {
        if(checkEvent()){
            let start_time = {hour: event.startTime.getHours(), minute: event.startTime.getMinutes()};
            let end_time = {hour: event.endTime.getHours(), minute: event.endTime.getMinutes()};
            let full = `${year}-${numToStr(month)}-${numToStr(day)}`;
            let data = {
                id: v4(),
                year,
                month,
                day,
                full,
                event: event.title,
                start_time,
                end_time,
                color: event.color,
                category: event.category,
                status: event.status
            };
            let formData = toFormData(data);
            setEvent({...event, loading: true});
            axios({
                method: 'POST',
                data: formData,
                url: uri,
                /**
                 * use async/await function because setEvents ( in context ) will reset eventMode function and it will remove state
                 */
            }).then(async res => {
                if(res.data.success){
                    events.push(data);
                    await setEvent({...event, redirect: true});
                    setOpen(false);
                    setEvents(events); // add event to selected day
                    setMode(1); // change mode to daily
                } else if(res.data.error){
                    setEvent({...event, error: true, errorTitle: res.data.error});
                } else {
                    setEvent({...event, error: true, errorTitle: 'Error when create data'});
                } 
            }).catch(err => {
                setEvent({...event, error: true, errorTitle: err.message});
            });
        }
    }
    let handleClose = () => {
        setOpen(false);
    }
    let handleChangeColor = (color) => {
        setEvent({...event, color});
        setHandler(false);
    }
    return (
        <ThemeProvider theme={theme}>
            { !open ? <Redirect to="/" /> : ''}
            <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
            >
                <DialogTitle id="alert-dialog-title">Current Date : {`${year}/${month}/${day}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container>
                                <Grid container item xs={12} sm={12} md={6}>
                                    <Grid item mt={5} xs={12} className={classes.padding}>
                                        <FormControl className={classes.selectSize}>
                                            <InputLabel htmlFor="event">Event Description</InputLabel>
                                            <Input id="event" name="title" value={event.title || ''} onChange={handleChange} />
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
                                <Grid item xs={12} sm={6} className={classNames(classes.padding, classes.marginTop)}>
                                    <FormControl className={classes.selectSize}>
                                        <OrigBox 
                                            className={classes.colorBox}
                                            bgcolor={event.color ? colors[event.color] : colors['default']}
                                        ></OrigBox>
                                        <RefBox className={classes.colorBoxRef}>
                                            {
                                                Object.keys(colors).map(color => {
                                                    return (
                                                        <Box
                                                            className={classNames(classes.colorBox, 'smallBox')}
                                                            onClick={() => handleChangeColor(color)}
                                                            bgcolor={colors[color]}
                                                        ></Box>
                                                    )
                                                })
                                            }
                                        </RefBox>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} className={classNames(classes.padding, classes.marginTop)}>
                                    <FormControl className={classes.selectSize}>
                                        <Select name="category" onChange={handleChange} value={event.category}>
                                            {
                                                category.map(cat => {
                                                    return (<MenuItem key={cat.label} value={cat.label}>{cat.value}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} className={classNames(classes.padding, classes.marginTop)}>
                                    <FormControl className={classes.selectSize}>
                                        <Select name="status" onChange={handleChange} value={event.status}>
                                            {
                                                status.map(st => {
                                                    return (<MenuItem key={st.label} value={st.label}>{st.value}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </DialogContentText>
                    <DialogActions>
                        <Grid container className={classes.marginBottom}>
                            <Grid item xs={4} sm={4} md={6}>
                                <Link to="/" onClick={() => setOpen(false)} className={classes.links}>
                                    <Button startIcon={<ArrowBackIosIcon />} variant="contained" color="secondary">
                                        Back
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid align="right" item xs={8} sm={8} md={6}>
                                <Button onClick={saveEvent} variant="contained" color="primary">
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    )
}

export default Add;