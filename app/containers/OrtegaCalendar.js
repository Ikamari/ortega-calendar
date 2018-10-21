// React
import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
// DateTime
import OrtegaDateTime       from '../OrtegaDatetime'
// Components
import EventsWindow         from '../components/EventsWindow'
// Containers
import MonthSelect          from './MonthSelect'
import MonthDays            from './MonthDays'
// Styles
import styles               from './styles/calendar.css'
import daysStyles           from './styles/month-days.css'

const MIN_MONTH = 1, MAX_MONTH = 12

export default class OrtegaCalendar extends Component {
    constructor(props) {
        super(props)

        const { ortegaDateTime } = props
        this.state = {
            currentDay:    ortegaDateTime.day,
            currentDate:   ortegaDateTime.getDate(),
            selectedDay:   ortegaDateTime.day,
            selectedMonth: ortegaDateTime.month,
            selectedYear:  ortegaDateTime.year,
            eventsDate:    null
        }

        setInterval(() => {
            if (this.state.currentDay !== ortegaDateTime.day) {
                this.setState({
                    currentDate: ortegaDateTime.getDate()
                })
            }
        }, 1000)
    }

    prevMonth() {
        let previousMonth = this.state.selectedMonth - 1, year = this.state.selectedYear
        if (previousMonth < MIN_MONTH) {
            previousMonth = MAX_MONTH
            year--
        }
        this.setState({
            selectedMonth: previousMonth,
            selectedYear:  year
        })
    }

    nextMonth() {
        let nextMonth = this.state.selectedMonth + 1, year = this.state.selectedYear
        if (nextMonth > MAX_MONTH) {
            nextMonth = MIN_MONTH
            year++
        }
        this.setState({
            selectedMonth: nextMonth,
            selectedYear:  year
        })
    }

    openEventsWindow(date) {
        this.setState({
            eventsDate: date
        })
    }

    closeEventsWindow() {
        this.setState({
            eventsDate: null
        })
    }

    render() {
        const { events } = this.props
        const { currentDate, selectedMonth, selectedYear, eventsDate } = this.state
        return (
            <div className={styles.wrapper}>
                <MonthSelect
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    prevMonth={() => this.prevMonth()}
                    nextMonth={() => this.nextMonth()}
                />
                <TransitionGroup className={styles["second-wrapper"]}>
                    <CSSTransition
                        key        = {`selected-date-${eventsDate || 'none'}`}
                        timeout    = {450}
                        classNames = 'fade'
                    >
                        {
                            eventsDate ?
                                <EventsWindow
                                    events={events[eventsDate]}
                                    closeWindow={() => this.closeEventsWindow()}
                                /> :
                                <MonthDays
                                    currentDate={currentDate}
                                    selectedMonth={selectedMonth}
                                    selectedYear={selectedYear}
                                    events={events}
                                    openEventsWindow={(date) => this.openEventsWindow(date)}
                                />
                        }
                    </CSSTransition>
                </TransitionGroup>
            </div>
        )
    }
}

OrtegaCalendar.defaultProps = {
    events: {}
}

OrtegaCalendar.propTypes = {
    ortegaDateTime: PropTypes.instanceOf(OrtegaDateTime),
    events:         PropTypes.object
}