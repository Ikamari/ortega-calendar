// React
import React, { Component }         from 'react'
import PropTypes                    from 'prop-types'
// DateTime
import OrtegaDateTime               from '../OrtegaDatetime'
// Components
import DayBlock                     from '../components/DayBlock'
// Styles
import styles                       from './styles/month-days.css'

export default class MonthDays extends Component {
    renderDays() {
        const { ortegaDateTime, selectedMonth, selectedYear, events, openEventsWindow } = this.props
        const currentDate = ortegaDateTime.getDate()
        let daysTable = []

        for (let week = 0; week < 3; week++) {
            let days = []
            for (let dayOfWeek = 1; dayOfWeek <= 10; dayOfWeek++) {
                const
                    dayOfMonth    = 10 * week + dayOfWeek,
                    date          = `${dayOfMonth > 9 ? '' : '0'}${dayOfMonth}.${selectedMonth > 9 ? '' : '0'}${selectedMonth}.${selectedYear}`,
                    realDate      = ortegaDateTime.toRealDate(date),
                    isCurrentDate = currentDate === date,
                    hasEvent      = realDate in events
                days.push(
                    <DayBlock
                        key          = {`calendar-day-${dayOfMonth}`}
                        isCurrentDay = {isCurrentDate}
                        hasEvent     = {hasEvent}
                        dayOfMonth   = {dayOfMonth}
                        realDate     = {realDate}
                        action       = {hasEvent ? () => openEventsWindow(date, realDate) : null}
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
    ortegaDateTime:   PropTypes.instanceOf(OrtegaDateTime),
    selectedMonth:    PropTypes.number.isRequired,
    selectedYear:     PropTypes.number.isRequired,
    openEventsWindow: PropTypes.func.isRequired
}