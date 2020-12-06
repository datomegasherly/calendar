import React from 'react';
import { url, configUrl } from '../../helper';
import axios from 'axios';

function effectCall(dispatch) {
    let { setEvents, setYear, setMonth, setDay } = dispatch;
    axios.get(url).then(function (res) {
        setEvents(res.data);
    }).catch(function (error) {
        throw error;
    });
    axios.get(configUrl).then(function (res) {
        let date = new Date(res.data.date);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        setYear(y);
        setMonth(m);
        setDay(d);
    }).catch(function (error) {
        throw error;
    });
}

export default {
    effectCall
};