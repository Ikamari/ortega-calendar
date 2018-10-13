const ORTEGA_MONTHS = [
    'Доблести', 'Справедливости', 'Усердия', 'Мудрости', 'Умеренности', 'Искренности',
    'Верности', 'Щедрости', 'Порядка', 'Великодушия', 'Прощения', 'Владыки'
]

const ORTEGA_DAYS = [

]

const ORTEGA_TEMPAS = [
    'Ночная', 'Предрассветная', 'Ранняя', 'Утренняя',
    'Дневная', 'Предзакатная', 'Вечерняя', 'Поздняя'
]

export default class OrtegaDatetime {
    initialDay
    initialMonth
    initialYear

    day
    month
    year
    hours
    minutes
    seconds

    initialDateTime
    previouslyUsedDateTime

    constructor(ortegaDateStartFrom = '01.01.72', realStartDateFrom = '01.10.2018') {
        const initialOrtegaDateParts = ortegaDateStartFrom.split('.')
        const realStartDateParts     = realStartDateFrom.split('.')

        this.initialDay   = Number(initialOrtegaDateParts[0])
        this.initialMonth = Number(initialOrtegaDateParts[1])
        this.initialYear  = Number(initialOrtegaDateParts[2])
        this.initialDateTime = new Date(Number(realStartDateParts[2]), Number(realStartDateParts[1]) - 1, Number(realStartDateParts[0]))

        this.update()
    }

    update() {
        const currentDateTime = new Date()

        // Declare Ortega date on construct or update it when new day in reality has come
        if (this.previouslyUsedDateTime === undefined || this.previouslyUsedDateTime.getDate() !== currentDateTime.getDate()) {
            // Difference in milliseconds
            const diffInRealTime = Math.abs(
                (currentDateTime.getTime()      + currentDateTime.getTimezoneOffset()      * 60 * 1000) -
                (this.initialDateTime.getTime() + this.initialDateTime.getTimezoneOffset() * 60 * 1000)
            )
            // Difference in real days
            let days = Math.floor(diffInRealTime / (1000 * 3600 * 24));

            this.year  = this.initialYear  + Math.floor(days / 360)
            days %= 360;
            this.month = this.initialMonth + Math.floor(days / 30)
            days %= 30;
            this.day   = this.initialDay   + days
        }

        this.hours   = currentDateTime.getUTCHours()
        this.minutes = currentDateTime.getUTCMinutes()
        this.seconds = currentDateTime.getUTCSeconds()

        this.previouslyUsedDateTime = currentDateTime
    }

    getDate() {
        return `${this.day > 9 ? '' : '0'}${this.day}.${this.month > 9 ? '' : '0'}${this.month}.${this.year}`
    }

    getTime() {
        return `${this.hours > 9 ? '' : '0'}${this.hours}:${this.minutes > 9 ? '' : '0'}${this.minutes}:${this.seconds > 9 ? '' : '0'}${this.seconds}`
    }

    getMonthName() {
        return ORTEGA_MONTHS[this.month - 1]
    }

    getDayName() {
        return ORTEGA_DAYS[(this.day - 1) % 10]
    }

    getTempa() {
        switch(this.hours) {
            case this.hours <= 3:  {return ORTEGA_TEMPAS[0]}
            case this.hours <= 6:  {return ORTEGA_TEMPAS[1]}
            case this.hours <= 9:  {return ORTEGA_TEMPAS[2]}
            case this.hours <= 12: {return ORTEGA_TEMPAS[3]}
            case this.hours <= 15: {return ORTEGA_TEMPAS[4]}
            case this.hours <= 18: {return ORTEGA_TEMPAS[5]}
            case this.hours <= 21: {return ORTEGA_TEMPAS[6]}
            case this.hours <= 24: {return ORTEGA_TEMPAS[7]}
        }
        return ORTEGA_TEMPAS[this.hours / 3]
    }
}

export {
    ORTEGA_MONTHS,
    ORTEGA_DAYS,
    ORTEGA_TEMPAS
}