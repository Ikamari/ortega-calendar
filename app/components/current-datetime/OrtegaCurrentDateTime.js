// React
import React, { Component } from 'react'
import PropTypes            from 'prop-types'
// DateTime
import OrtegaDateTime       from '../../OrtegaDatetime'
// Styles
import styles from './styles/current-datetime.css'

export default class CurrentDateTime extends Component {
    constructor(props) {
        super(props)
        this.ticker = setInterval(() => {
            this.forceUpdate()
        }, 1000)
    }

    render() {
        const { ortegaDateTime } = this.props
        return (
            <div className={styles.wrapper}>
                <div>Текущая дата и время:</div>
                <div>{`${ortegaDateTime.getTime()}, ${ortegaDateTime.day} день месяца ${ortegaDateTime.getMonthName()}, ${ortegaDateTime.year} год`}</div>
            </div>
        )
    }
}

CurrentDateTime.propTypes = {
    ortegaDateTime: PropTypes.instanceOf(OrtegaDateTime)
}