// React
import React, { Component }  from 'react';
// Datetime
import OrtegaDatetime        from './OrtegaDatetime';
// Containers
import OrtegaCalendar        from './containers/OrtegaCalendar'
// Components
import OrtegaCurrentDateTime from './components/OrtegaCurrentDateTime'
// Styles
import styles                from './App.css'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.ortegaDatetime = new OrtegaDatetime()
        setInterval(() => { this.ortegaDatetime.update() }, 1000)
    }

    render() {
        return(
            <div className={styles.app}>
                <OrtegaCurrentDateTime ortegaDateTime={this.ortegaDatetime}/>
                <OrtegaCalendar        ortegaDateTime={this.ortegaDatetime}/>
            </div>
        )
    }
}
