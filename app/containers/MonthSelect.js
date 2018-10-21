// React
import React, { Component } from 'react'
import PropTypes            from 'prop-types'
// DateTime
import { ORTEGA_MONTHS }    from '../OrtegaDatetime'
// Styles
import appStyles            from '../App.css'
import styles               from './styles/month-select.css'

export default class MonthSelect extends Component {
    render() {
        const { prevMonth, nextMonth, selectedMonth, selectedYear } = this.props
        return (
            <div className={styles.wrapper}>
                <button type='button' className={appStyles["arrow-button-left"]} onClick={prevMonth}/>
                <div className={styles['text-wrapper']}>
                    <div className={styles.text}>{`Месяц ${ORTEGA_MONTHS[selectedMonth - 1]}, ${selectedYear} год`}</div>
                </div>
                <button type='button' className={appStyles["arrow-button-right"]} onClick={nextMonth}/>
            </div>
        )
    }
}

MonthSelect.propTypes = {
    prevMonth:     PropTypes.func.isRequired,
    nextMonth:     PropTypes.func.isRequired,
    selectedMonth: PropTypes.number.isRequired,
    selectedYear:  PropTypes.number.isRequired
}