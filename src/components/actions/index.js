import React from 'react';
import axios from 'axios';
import { configUri, updateData } from '../../helper';

function effectCall(dispatch) {
    let { setYear, setMonth, setDay, setCategory, setStatus } = dispatch;
    axios.get(configUri).then(function (res) {
        let date = new Date(res.data.date);
        let { category, status } = res.data;
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        setYear(y);
        setMonth(m);
        setDay(d);
        setCategory(category);
        setStatus(status);
        updateData(dispatch, y, m);
    }).catch(function (error) {
        throw error;
    });
}

export default {
    effectCall
};