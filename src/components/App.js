import { Grid, Paper } from '@material-ui/core';
import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper>Test</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>Test2</Paper>
                </Grid>
            </Grid>
        )
    }
}

export default App;