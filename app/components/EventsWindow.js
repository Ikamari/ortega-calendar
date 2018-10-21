// React
import React, { Component }  from 'react'
import PropTypes             from 'prop-types'
// Styles
import styles                from './styles/events-window.css'

export default class DayBlock extends Component {
    render() {
        const { events, closeWindow } = this.props
        return (
            <div className={styles.wrapper}>
                <button type='button' className={styles["close-button"]} onClick={() => closeWindow()}/>
                <div className={styles.title}>{events.title}</div>
                <div className={styles.description}>{events.description}</div>
            </div>
        )
    }
}

DayBlock.propTypes = {
    events:      PropTypes.object.isRequired,
    closeWindow: PropTypes.func.isRequired
}