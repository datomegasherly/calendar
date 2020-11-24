import React, { useContext, useState, useEffect, Fragment } from 'react';
import MainContext from '../context';
import Add from './eventMode/add';

function EventMode(propType){
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
    /**
     * Update startTime and endTime with switch of `type` variable
     * @param {Date} date 
     * @param {String} type 
     */
    const handleTimeChange = (date, type) => {
        switch(type){
            case 'start':
                setEvent({startTime: date});
                break;
            case 'end':
                setEvent({endTime: date});
        }
    }
    /**
     * Update event string
     * @param {Javascript Event} ev 
     */
    const handleEventChange = (ev) => {
        let event = ev.target.value;
        setEvent({event});
    }
    /**
     * Update current state once ( like ComponentDidUpdate )
     */
    useEffect(() => {
        let full = `${year}-${month}-${day}`;
        let startTime = new Date(`${full}T00:00:00`);
        let endTime = new Date(`${full}T00:00:00`);
        setEvent({year, month, day, full, startTime, endTime});
    }, []); // when use [] after useEffect , it will call once
    let props = {
        event,
        setEvent,
        handleEventChange,
        handleTimeChange
    };
    return (
        <Fragment>
        {
            propType == 'add' ? <Add {...props} /> : ''
        }
        </Fragment>
    )
}

export default EventMode;