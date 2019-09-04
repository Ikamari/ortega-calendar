// React
import React, { Component, Fragment }  from 'react'
import PropTypes from 'prop-types'
// Styles
import styles from './styles/events-window.css'

export default class EventsWindow extends Component {
    getType() {
        const { event, holiday } = this.props
        if (event && holiday) return "Праздник и событие"
        if (event) return "Событие"
        if (holiday) return "Праздник"
        return "?"
    }

    getName() {
        const { event, holiday } = this.props
        if (event && holiday) {
            return (
                <Fragment>
                    <span>Событие:</span>{event.title}<br/>
                    <span>Праздник:</span>{holiday.title}
                </Fragment>
            )
        }
        return (
            <Fragment>
                <span>Название:</span>{(event ? event.title : holiday.title) || "Не указано"}
            </Fragment>
        )
    }

    getDescription() {
        const { event, holiday } = this.props
        if (event && holiday) {
            return `Описание события:<br>${event.description || "Описание не указано"}<br><br>Описание праздника:<br>${holiday.description || "Описание не указано"}`
        }
        return (event ? event.description : holiday.description) || "Описание не указано"
    }

    render() {
        const { ortegaDate, realDate, closeWindow } = this.props
        return (
            <div className={styles.wrapper}>
                <button type='button' className={styles["close-button"]} onClick={() => closeWindow()}/>
                <div className={styles.info}>
                    <span>Дата:</span>{`${ortegaDate} (${realDate})`}
                </div>
                <div className={styles.info}>
                    <span>Тип:</span>{this.getType()}
                </div>
                <div className={styles.info}>
                    {this.getName()}
                </div>
                <div className={styles.description} dangerouslySetInnerHTML={{ __html: this.getDescription() }} />
            </div>
        )
    }
}

EventsWindow.propTypes = {
    holiday:     PropTypes.object,
    event:       PropTypes.object,
    ortegaDate:  PropTypes.string.isRequired,
    realDate:    PropTypes.string.isRequired,
    closeWindow: PropTypes.func.isRequired
}