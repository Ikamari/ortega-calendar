// React
import React, { Component } from 'react';
// Datetime
import OrtegaDatetime       from "./OrtegaDatetime";
// Styles
import styles               from './App.css'

export default class App extends Component {
    constructor(props) {
        super(props)
        const ortegaDatetime = new OrtegaDatetime()
        this.ticker = setInterval(() => {
            ortegaDatetime.update()
            console.log(`${ortegaDatetime.getTime()} (${ortegaDatetime.getTempa()} темпа) ${ortegaDatetime.getDate()} (${ortegaDatetime.day} день месяца ${ortegaDatetime.getMonthName()}, ${ortegaDatetime.year} год)\n`)
        }, 1000)
    }

    render() {
        return(
            <div className={styles.app}>
            </div>
        )
    }
}
