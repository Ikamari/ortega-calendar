// React
import React, {Component, Fragment} from 'react'
import PropTypes                    from 'prop-types'
// DateTime
import OrtegaDateTime               from '../OrtegaDatetime'
// Components
import DayBlock                     from '../components/DayBlock'
// Styles
import styles                       from './styles/month-days.css'

export default class MonthDays extends Component {
    renderDays() {
        const { currentDate, selectedMonth, selectedYear } = this.props
        let daysTable = []

        for (let week = 0; week < 3; week++) {
            let days = []
            for (let dayOfWeek = 1; dayOfWeek <= 10; dayOfWeek++) {
                const dayOfMonth    = 10 * week + dayOfWeek
                const date          = `${dayOfMonth > 9 ? '' : '0'}${dayOfMonth}.${selectedMonth > 9 ? '' : '0'}${selectedMonth}.${selectedYear}`
                const isCurrentDate = currentDate === date
                days.push(
                    <DayBlock
                        key={`calendar-day-${dayOfMonth}`}
                        isCurrentDay={isCurrentDate}
                        dayOfMonth={dayOfMonth}
                        realDate={OrtegaDateTime.toRealDate(date)}
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

MonthDays.propTypes = {
    currentDate:   PropTypes.string.isRequired,
    selectedMonth: PropTypes.number.isRequired,
    selectedYear:  PropTypes.number.isRequired
}