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

const MIN_MONTH = 1, MAX_MONTH = 12

export default class OrtegaCalendar extends Component {
    constructor(props) {
        super(props)

        const { ortegaDateTime } = props
        this.state = {
            currentDay:      ortegaDateTime.day,
            currentDate:     ortegaDateTime.getDate(),
            selectedDay:     ortegaDateTime.day,
            selectedMonth:   ortegaDateTime.month,
            selectedYear:    ortegaDateTime.year,
            selectedShortDate:  null,
            selectedOrtegaDate: null,
            selectedRealDate:   null
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

    openEventsWindow(ortegaDate, shortOrtegaDate, realDate) {
        this.setState({
            selectedOrtegaDate: ortegaDate,
            selectedShortDate:  shortOrtegaDate,
            selectedRealDate:   realDate
        })
    }

    closeEventsWindow() {
        this.setState({
            selectedOrtegaDate: null,
            selectedRealDate:   null,
            selectedShortDate:  null
        })
    }

    render() {
        const { events, holidays, ortegaDateTime } = this.props
        const { selectedMonth, selectedYear, selectedOrtegaDate, selectedShortDate, selectedRealDate } = this.state
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
                        key        = {`selected-date-${selectedRealDate || 'none'}`}
                        timeout    = {450}
                        classNames = 'fade'
                    >
                        {
                            selectedRealDate ?
                                <EventsWindow
                                    ortegaDate={selectedOrtegaDate}
                                    realDate={selectedRealDate}
                                    event={events[selectedRealDate]}
                                    holiday={holidays[selectedShortDate]}
                                    closeWindow={() => this.closeEventsWindow()}
                                /> :
                                <MonthDays
                                    ortegaDateTime={ortegaDateTime}
                                    selectedMonth={selectedMonth}
                                    selectedYear={selectedYear}
                                    events={events}
                                    holidays={holidays}
                                    openEventsWindow={(ortegaDate, shortOrtegaDate, realDate) => this.openEventsWindow(ortegaDate, shortOrtegaDate, realDate)}
                                />
                        }
                    </CSSTransition>
                </TransitionGroup>
            </div>
        )
    }
}

OrtegaCalendar.defaultProps = {
    events: {},
    holidays: {}
}

OrtegaCalendar.propTypes = {
    ortegaDateTime: PropTypes.instanceOf(OrtegaDateTime),
    events:         PropTypes.object,
    holidays:       PropTypes.object
}