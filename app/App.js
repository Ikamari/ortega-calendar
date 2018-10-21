// React
import React, { Component, Fragment }  from 'react';
// Datetime
import OrtegaDatetime        from './OrtegaDatetime';
// Containers
import OrtegaCalendar        from './containers/OrtegaCalendar'
// Components
import OrtegaCurrentDateTime from './components/OrtegaCurrentDateTime'
// Styles
import styles                from './App.css'

export default class App extends Component {
    ortegaDatetime = null
    calendarEvents = null

    constructor(props) {
        super(props)
        this.state = {
            dataUploaded: false,
            uploadFailed: false,
            dataCorrupted: false
        }

        this.uploadData()
    }

    uploadData() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/calendar.json');

        xhr.onload = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const { ortegaInitialDate, realInitialDate, events } = JSON.parse(xhr.responseText)
                        this.ortegaDatetime = new OrtegaDatetime(ortegaInitialDate, realInitialDate)
                        this.calendarEvents = events
                        setInterval(() => { this.ortegaDatetime.update() }, 1000)
                        this.setState({
                            dataUploaded: true
                        })
                    } catch (e) {
                        console.log(e)
                        this.setState({
                            dataUploaded: true,
                            dataCorrupted: true
                        })
                    }
                } else {
                    this.setState({
                        uploadFailed: true
                    })
                }
            }
        };

        xhr.onerror = () => {
            this.setState({
                uploadFailed: true
            })
        };

        xhr.send();
    }

    render() {
        const { dataUploaded, uploadFailed, dataCorrupted } = this.state
        return(
            <div className={styles.app}>
                {
                    dataUploaded ?
                        (
                            dataCorrupted ?
                                'Кто-то сломал конфиг. :\\' :
                                <Fragment>
                                    <OrtegaCurrentDateTime ortegaDateTime={this.ortegaDatetime} />
                                    <OrtegaCalendar        ortegaDateTime={this.ortegaDatetime} events={this.calendarEvents} />
                                </Fragment>
                        ) : (uploadFailed ? 'Данные о календаре недоступны.' : 'Загрузка данных...')
                }
            </div>
        )
    }
}
