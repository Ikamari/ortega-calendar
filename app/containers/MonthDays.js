// React
import React, { Component }         from 'react'
import PropTypes                    from 'prop-types'
import { datePartsToDate, dateTimeToDate } from '../helpers/DateHelper'
// DateTime
import OrtegaDateTime               from '../OrtegaDatetime'
// Components
import DayBlock                     from '../components/DayBlock'
// Styles
import styles                       from './styles/month-days.css'

export default class MonthDays extends Component {
    renderDays() {
        const { ortegaDateTime, selectedMonth, selectedYear, events, holidays, openEventsWindow } = this.props
        const currentDate = ortegaDateTime.getDate()
        const currentTime = ortegaDateTime.getTime()
        let daysTable = []

        for (let week = 0; week < 3; week++) {
            let days = []
            for (let dayOfWeek = 1; dayOfWeek <= 10; dayOfWeek++) {
                const
                    dayOfMonth    = 10 * week + dayOfWeek,
                    shortDate     = datePartsToDate(dayOfMonth, selectedMonth),
                    date          = datePartsToDate(dayOfMonth, selectedMonth, selectedYear),
                    realDateTime  = ortegaDateTime.toRealDateTime(`${date} ${currentTime}`, true),
                    realDate      = dateTimeToDate(realDateTime),
                    isCurrentDate = currentDate === date,
                    hasEvent      = realDate in events,
                    hasHoliday    = shortDate in holidays
                days.push(
                    <DayBlock
                        key            = {`calendar-day-${dayOfMonth}`}
                        isCurrentDay   = {isCurrentDate}
                        hasEvent       = {hasEvent}
                        hasHoliday     = {hasHoliday}
                        dayOfMonth     = {dayOfMonth}
                        realDateTime   = {realDateTime}
                        startOfDayTime = {ortegaDateTime.startOfDayInRealTime}
                        endOfDayTime   = {ortegaDateTime.endOfDayInRealTime}
                        action         = {hasEvent || hasHoliday ? () => openEventsWindow(date, shortDate, realDate) : null}
                    />
                )
            }
            daysTable.push(
                <div key={`calendar-week-${week}`} className={styles.row}>{days}</div>
            )
        }

        return daysTable
    }

    render() {
        return (
            <div className={styles.wrapper}>{this.renderDays()}</div>
        )
    }
}

MonthDays.defaultProps = {
    events: {}
}

MonthDays.propTypes = {
    events:           PropTypes.object,
    holidays:         PropTypes.object,
    ortegaDateTime:   PropTypes.instanceOf(OrtegaDateTime),
    selectedMonth:    PropTypes.number.isRequired,
    selectedYear:     PropTypes.number.isRequired,
    openEventsWindow: PropTypes.func.isRequired
}