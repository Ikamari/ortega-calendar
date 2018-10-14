// React
import React, { Component, Fragment } from 'react'
import PropTypes            from 'prop-types'
// DateTime
import OrtegaDateTime       from '../OrtegaDatetime'
// Containers
import MonthSelect          from './MonthSelect'
import Days                 from './Days'

export default class OrtegaCalendar extends Component {
    constructor(props) {
        super(props)

        const { ortegaDateTime } = props
        this.state = {
            currentDay:    ortegaDateTime.day,
            currentDate:   ortegaDateTime.getDate(),
            selectedDay:   ortegaDateTime.day,
            selectedMonth: ortegaDateTime.month,
            selectedYear:  ortegaDateTime.year
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
        if (previousMonth < 1) {
            previousMonth = 12
            year--
        }
        this.setState({
            selectedMonth: previousMonth,
            selectedYear:  year
        })
    }

    nextMonth() {
        let nextMonth = this.state.selectedMonth + 1, year = this.state.selectedYear
        if (nextMonth > 12) {
            nextMonth = 1
            year++
        }
        this.setState({
            selectedMonth: nextMonth,
            selectedYear:  year
        })
    }

    render() {
        const { currentDate, selectedMonth, selectedYear } = this.state
        return (
            <Fragment>
                <MonthSelect selectedMonth={selectedMonth} selectedYear={selectedYear} prevMonth={() => this.prevMonth()} nextMonth={() => this.nextMonth()} />
                <Days        currentDate={currentDate} selectedMonth={selectedMonth} selectedYear={selectedYear} />
            </Fragment>
        )
    }
}

OrtegaCalendar.propTypes = {
    ortegaDateTime: PropTypes.instanceOf(OrtegaDateTime)
}