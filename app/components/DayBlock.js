// React
import React, { Component }  from 'react'
import PropTypes             from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
// Helpers
import { addDays, dateTimeToDate } from '../helpers/DateHelper'
// Styles
import styles from './styles/day-block.css'

export default class DayBlock extends Component {
    render() {
        const { isCurrentDay, hasEvent, hasHoliday, dayOfMonth, realDateTime, startOfDayTime, endOfDayTime, action } = this.props
        const
            nextDay  = addDays(realDateTime, 1),
            fromDate = dateTimeToDate(realDateTime),
            toDate   = dateTimeToDate(nextDay)
        return (
            <div
                className = {`${styles.wrapper} ${isCurrentDay ? styles['current-day'] : ''}`}
                onClick   = {action ? () => action() : () => {}}
            >
                { hasEvent || hasHoliday ? <div className={styles['event-mark']} /> : null}
                <div className={styles['day-of-month']}>{dayOfMonth}</div>
                <TransitionGroup>
                    <CSSTransition
                        key={`${fromDate}-${toDate}`}
                        timeout={450}
                        classNames='fade'
                    >
                        <div className={styles['real-date']}>
                            {fromDate}<br/>
                            {startOfDayTime}<br/>
                            -<br/>
                            {toDate}<br/>
                            {endOfDayTime}
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        )
    }
}

DayBlock.propTypes = {
    isCurrentDay:   PropTypes.bool,
    hasEvent:       PropTypes.bool,
    hasHoliday:     PropTypes.bool,
    dayOfMonth:     PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    realDateTime:   PropTypes.object.isRequired,
    startOfDayTime: PropTypes.string.isRequired,
    endOfDayTime:   PropTypes.string.isRequired,
    action:         PropTypes.func
}

DayBlock.defaultProps = {
    isCurrentDay: false,
    hasEvent:     false,
    hasHoliday:   false
}