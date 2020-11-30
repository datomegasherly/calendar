import { Grid, Snackbar } from '@material-ui/core';
import React, { useState, useEffect, Fragment } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Add from './eventMode/add';
import { Redirect } from 'react-router-dom';
import Joi from 'joi';
import { SpinnerComponent } from 'react-element-spinner';

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
        redirect: false,
        loading: false
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
        let ev = {title: event.title, startTime: event.startTime, endTime: event.endTime};
        const schema = Joi.object({
            title: Joi.string().min(3).max(250).required(),
            startTime: Joi.date().required(),
            endTime: Joi.date().greater(Joi.ref('startTime')).required()
        });
        const checkValidate = schema.validate(ev);
        if(checkValidate.error){
            setEvent({...event, error: true, errorTitle: checkValidate.error.details[0].message});
            return false;
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
                setEvent({...event, startTime: date});
                break;
            case 'end':
                setEvent({...event, endTime: date});
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
            <SpinnerComponent 
                loading={event.loading} 
                position="global" 
                backgroundColor="#e8e8e8" 
                spinnerType="circle-dots-collapse"
                color="#3578e5" />
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