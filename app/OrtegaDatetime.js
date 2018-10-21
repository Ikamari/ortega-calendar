import { addDays } from './helpers/DateHelper'

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

    initialRealDate
    initialOrtegaDate
    initialRealDateTime
    previouslyUsedRealDateTime

    constructor(ortegaInitialDate = '01.01.72', realInitialDate = '01.10.2018') {
        const ortegaInitialDateParts = ortegaInitialDate.split('.')
        const realInitialDateParts     = realInitialDate.split('.')

        this.initialOrtegaDate   = ortegaInitialDate
        this.initialRealDate     = realInitialDate
        this.initialDay          = Number(ortegaInitialDateParts[0])
        this.initialMonth        = Number(ortegaInitialDateParts[1])
        this.initialYear         = Number(ortegaInitialDateParts[2])
        this.initialRealDateTime = new Date(Number(realInitialDateParts[2]), Number(realInitialDateParts[1]) - 1, Number(realInitialDateParts[0]))

        this.update()
    }

    update() {
        const currentDateTime = new Date()

        // Declare Ortega date on construct or update it when new day in reality has come
        if (this.previouslyUsedRealDateTime === undefined || this.previouslyUsedRealDateTime.getDate() !== currentDateTime.getDate()) {
            let days = OrtegaDatetime.diffInDays(currentDateTime, this.initialRealDateTime);
            this.year  = this.initialYear  + Math.floor(days / 360)
            days %= 360;
            this.month = this.initialMonth + Math.floor(days / 30)
            days %= 30;
            this.day   = this.initialDay   + days
        }

        this.hours   = currentDateTime.getUTCHours()
        this.minutes = currentDateTime.getUTCMinutes()
        this.seconds = currentDateTime.getUTCSeconds()

        this.previouslyUsedRealDateTime = currentDateTime
    }

    getRealDate(returnDateTime = false) {
        return this.toRealDate(this.getDate(), this.initialOrtegaDate, this.initialRealDate, returnDateTime)
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

    static diffInDays(firstDate, secondDate) {
        // Difference in milliseconds
        const diffInMilliseconds = Math.abs(
            (firstDate.getTime()  + firstDate.getTimezoneOffset()  * 60 * 1000) -
            (secondDate.getTime() + secondDate.getTimezoneOffset() * 60 * 1000)
        )
        // Difference in real days
        return Math.floor(diffInMilliseconds / (1000 * 3600 * 24));
    }


    static toRealDate(ortegaDate, ortegaInitialDate = '01.01.72', realInitialDate = '01.10.2018', returnDateTime = false) {
        const ortegaDateParts        = ortegaDate.split('.')
        const ortegaInitialDateParts = ortegaInitialDate.split('.')
        const realInitialDateParts   = realInitialDate.split('.')

        // Get difference in days between specified and initial ortega date
        const yearsDiff    = ortegaDateParts[2] - ortegaInitialDateParts[2]
        const monthsDiff   = ortegaDateParts[1] - ortegaInitialDateParts[1]
        const daysDiff     = ortegaDateParts[0] - ortegaInitialDateParts[0] + monthsDiff * 30 + yearsDiff * 360
        const realDateTime = addDays(new Date(Number(realInitialDateParts[2]), Number(realInitialDateParts[1]) - 1, Number(realInitialDateParts[0])), daysDiff)

        if (!returnDateTime) {
            const
                realDay   = realDateTime.getDate(),
                realMonth = realDateTime.getMonth() + 1,
                realYear  = realDateTime.getFullYear()
            return `${realDay > 9 ? '' : '0'}${realDay}.${realMonth > 9 ? '' : '0'}${realMonth}.${realYear > 9 ? '' : '0'}${realYear}`
        }

        return returnDateTime
    }
}

export {
    ORTEGA_MONTHS,
    ORTEGA_DAYS,
    ORTEGA_TEMPAS
}