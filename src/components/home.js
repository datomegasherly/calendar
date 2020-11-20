import React, { Component } from 'react'
import Header from './header';
import Calendar from './calendar';

function Home() {
    return (
        <div data-test="home-component">
            <Header />
            <Calendar />
        </div>
    )
}

export default Home;