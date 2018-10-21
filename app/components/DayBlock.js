// React
import React, { Component }  from 'react'
import PropTypes             from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
// Styles
import styles                from './styles/day-block.css'

export default class DayBlock extends Component {
    render() {
        const { isCurrentDay, hasEvent, dayOfMonth, realDate, action } = this.props
        return (
            <div
                className = {`${styles.wrapper} ${isCurrentDay ? styles['current-day'] : ''}`}
                onClick   = {action ? () => action() : () => {}}
            >
                { hasEvent ? <div className={styles['event-mark']} /> : null}
                <div className={styles['day-of-month']}>{dayOfMonth}</div>
                <TransitionGroup>
                    <CSSTransition
                        key={`${realDate}`}
                        timeout={450}
                        classNames='fade'
                    >
                        <div className={styles['real-date']}>{realDate}</div>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        )
    }
}

DayBlock.propTypes = {
    isCurrentDay: PropTypes.bool,
    hasEvent:     PropTypes.bool,
    dayOfMonth:   PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    realDate:     PropTypes.string.isRequired,
    action:       PropTypes.func
}

DayBlock.defaultProps = {
    isCurrentDay: false,
    hasEvent:     false,
}