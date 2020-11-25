import { Grid, Snackbar } from '@material-ui/core';
import React, { useState, useEffect, Fragment } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Add from './eventMode/add';
import { Redirect } from 'react-router-dom';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function EventMode(propType){
    let [ event, setEvent ] = useState({
        title: '',
        startTime: '',
        endTime: '',
        error: false,
        errorTitle: '',
        redirect: false
    });
    /**
     * Update current state once ( like ComponentDidUpdate )
     */
    useEffect(() => {
        let full = `1900-01-01`;
        let startTime = new Date(`${full}T00:00:00`);
        let endTime = new Date(`${full}T00:00:00`);
        setEvent({...event, startTime, endTime});
    }, []); // when use [] after useEffect , it will call once
    const checkEvent = (type = 'all', data = false) => {
        let time;
        switch(type){
            case 'all':
                if(!event.title.length){
                    setEvent({...event, error: true, errorTitle: "Event Description is empty"});
                    return false;
                } else {
                    let start = {hour: event.startTime.getHours(), minute: event.startTime.getMinutes()};
                    let end = {hour: event.endTime.getHours(), minute: event.endTime.getMinutes()};
                    if(start.hour == end.hour && start.minute == end.minute){
                        setEvent({...event, error: true, errorTitle: "Start Time and End Time should not be equal"});
                        return false;
                    }
                }
            break;
            case 'checkStartTime':
                time = {hour: data.getHours(), minute: data.getMinutes()};
                let eTime = {hour: event.endTime.getHours(), minute: event.endTime.getMinutes()};
                if(time.hour > eTime.hour || (time.hour == eTime.hour && time.minute >= eTime.minute)) return false;
            break;
            case 'checkEndTime':
                let sTime = {hour: event.startTime.getHours(), minute: event.startTime.getMinutes()};
                time = {hour: data.getHours(), minute: data.getMinutes()};
                if(time.hour < sTime.hour || (time.hour == sTime.hour && time.minute <= sTime.minute)) return false;
        }
        return true;
    }
    /**
     * Update startTime and endTime with switch of `type` variable
     * @param {Date} date 
     * @param {String} type 
     */
    const handleTimeChange = (date, type) => {
        switch(type){
            case 'start':
                if(checkEvent('checkStartTime', date)){
                    setEvent({...event, startTime: date});
                } else {
                    setEvent({...event, error: true, errorTitle: "Start Time is bigger than End Time"});
                }
                break;
            case 'end':
                if(checkEvent('checkEndTime', date)){
                    setEvent({...event, endTime: date});
                } else {
                    setEvent({...event, error: true, errorTitle: "End Time is smaller than Start Time"});
                }
        }
    }
    /**
     * Update event string
     * @param {Javascript Event} ev 
     */
    const handleEventChange = (ev) => {
        let title = ev.target.value;
        setEvent({...event, title});
    }
    let props = {
        event,
        setEvent,
        handleEventChange,
        handleTimeChange,
        checkEvent
    };
    return (
        <Fragment>
            {
                event.redirect ? <Redirect to="/" /> : ''
            }
            <Snackbar open={event.error} onClick={() => setEvent({...event, error: false})}>
                <Alert severity="error">{event.errorTitle}</Alert>
            </Snackbar>
            {
                propType == 'add' ? <Add {...props} /> : ''
            }
        </Fragment>
    )
}

export default EventMode;