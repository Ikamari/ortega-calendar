// React
import React, { Component } from 'react'
import PropTypes            from 'prop-types'
// DateTime
import OrtegaDateTime       from '../OrtegaDatetime'
// Styles
import styles               from './styles/days.css'

export default class Days extends Component {
    renderDays() {
        const { currentDate, selectedMonth, selectedYear } = this.props
        let daysTable = []

        for (let i = 0; i < 3; i++) {
            let days = []
            for (let j = 1; j <= 10; j++) {
                const day     = 10 * i + j
                const date    = `${day > 9 ? '' : '0'}${day}.${selectedMonth > 9 ? '' : '0'}${selectedMonth}.${selectedYear}`
                const isToday = currentDate === date
                days.push(
                    <td className={isToday ? styles['current-day'] : ''} key={`calendar-day-${date}`}>
                        <div className={styles['day-num']}>{day}</div>
                        <div className={styles['real-date']}>{OrtegaDateTime.toRealDate(date)}</div>
                    </td>
                )
            }
            daysTable.push(<tr key={`calendar-days-${i * 10}_-_${(i + 1) * 10}`}>{days}</tr>)
        }

        return daysTable
    }

    render() {
        return (
            <table className={styles.wrapper}>
                <tbody>
                    {this.renderDays()}
                </tbody>
            </table>
        )
    }
}

Days.propTypes = {
    currentDate:   PropTypes.string.isRequired,
    selectedMonth: PropTypes.number.isRequired,
    selectedYear:  PropTypes.number.isRequired
}