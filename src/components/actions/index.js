import React from 'react';
import axios from 'axios';
import { configUri, updateData } from '../../helper';

function effectCall(dispatch) {
    let { setYear, setMonth, setDay, setCategory } = dispatch;
    axios.get(configUri).then(function (res) {
        let date = new Date(res.data.date);
        let category = res.data.category;
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        setYear(y);
        setMonth(m);
        setDay(d);
        setCategory(category);
        updateData(dispatch, y, m);
    }).catch(function (error) {
        throw error;
    });
}

export default {
    effectCall
};