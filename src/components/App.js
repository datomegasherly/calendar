import React, { useState, useEffect, useReducer } from 'react';
import MainContext from '../context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getDate, url, configUrl } from '../helper';
import Home from './home';
import EventMode from './eventMode';
import hookAction from '../components/actions';

/**
 * reducer for update state in dispatch
 * @param {object} state current state
 * @param {object} action contain {type , payload} to update current state
 * @return {object} new state
 */
function reducer(state, action){
    switch(action.type){
        case 'setYear':
            return { ...state, year: action.payload };
        case 'setMonth':
            return { ...state, month: action.payload };
        case 'setDay':
            return { ...state, day: action.payload };
        case 'setEvents':
            return { ...state, events: action.payload };
        case 'setMode':
            return { ...state, mode: action.payload };
        default:
            throw new Error(`Invalid Action ${action.type} for State`);
    }
}

export function App(){
    let date = getDate();
    const initialState = {
        year: date[0],
        month: date[1],
        day: date[2],
        events: [],
        mode: 3
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    const setYear = (payload) => dispatch({type: "setYear", payload});
    const setMonth = (payload) => dispatch({type: "setMonth", payload});
    const setDay = (payload) => dispatch({type: "setDay", payload});
    const setEvents = (payload) => dispatch({type: "setEvents", payload});
    const setMode = (payload) => dispatch({type: "setMode", payload});

    const dispatcher = {
        setYear,
        setMonth,
        setDay,
        setEvents,
        setMode
    };

    const newState = {
        state,
        dispatch: dispatcher
    };
    
    useEffect(() => {
        hookAction.effectCall(dispatcher);
    }, []);
    return (
        <div data-test="app-component">
            <MainContext.Provider value={newState}>
                <Router>
                    <Switch>
                        <Route path="/add" component={() => EventMode('add')} />
                        <Route path="/edit/:id" component={(prop) => EventMode('edit', prop)} />
                        <Route path="/" component={Home} />
                    </Switch>
                </Router>
            </MainContext.Provider>
        </div>
    )
}

export default App;