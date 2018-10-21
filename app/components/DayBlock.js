// React
import React, {Component, Fragment} from 'react'
import PropTypes             from 'prop-types'
import { TransitionGroup, CSSTransition, Transition }     from 'react-transition-group'
// Styles
import styles                from './styles/day-block.css'

export default class DayBlock extends Component {
    render() {
        const { isCurrentDay, dayOfMonth, realDate } = this.props
        return (
            <div className={`${styles.wrapper} ${isCurrentDay ? styles['current-day'] : ''}`}>
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

DayBlock.defaultProps = {
    isCurrentDay: false
}

DayBlock.propTypes = {
    isCurrentDay: PropTypes.bool,
    dayOfMonth:   PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    realDate:     PropTypes.string.isRequired
}