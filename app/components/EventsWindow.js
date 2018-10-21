// React
import React, { Component }  from 'react'
import PropTypes             from 'prop-types'
// Styles
import styles                from './styles/events-window.css'

export default class EventsWindow extends Component {
    getType(type) {
        switch(type) {
            case 'event':   {return 'Cобытие'}
            case 'holiday': {return 'Праздник'}
            default:        {return 'Неизвестный'}
        }
    }

    render() {
        const { events, ortegaDate, realDate, closeWindow } = this.props
        return (
            <div className={styles.wrapper}>
                <button type='button' className={styles["close-button"]} onClick={() => closeWindow()}/>
                <div className={styles.info}>
                    <span>Дата:</span>{`${ortegaDate} (${realDate})`}
                </div>
                <div className={styles.info}>
                    <span>Тип:</span>{this.getType(events.type)}
                </div>
                <div className={styles.info}>
                    <span>Название:</span>{events.title}
                </div>
                <div className={styles.description}>
                    {events.description}
                </div>
            </div>
        )
    }
}

EventsWindow.propTypes = {
    events:      PropTypes.object.isRequired,
    ortegaDate:  PropTypes.string.isRequired,
    realDate:    PropTypes.string.isRequired,
    closeWindow: PropTypes.func.isRequired
}