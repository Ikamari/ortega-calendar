// Helpers
import moment from 'moment'
import { addDays, addHours, datePartsToDate } from './helpers/DateHelper'

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
    timeOffset

    initialRealDate
    initialOrtegaDate
    initialRealDateTime
    previouslyUsedRealDateTime
    startOfDayInRealTime
    endOfDayInRealTime

    constructor(ortegaInitialDate = '01.01.72', realInitialDate = '01.10.2018', timeOffset = 0) {
        if (timeOffset > 12 || timeOffset < -12) throw new Error('Установлен неправильный offset')

        // Store configuration
        this.initialOrtegaDate = ortegaInitialDate
        this.initialRealDate   = realInitialDate
        this.gameTimeOffset    = timeOffset
        this.userTimeOffset    = (new Date()).getTimezoneOffset() / 60 * -1;

        // Get and store d/m/y from initial Ortega date
        const ortegaInitialDateParts = ortegaInitialDate.split('.')
        this.initialDay   = Number(ortegaInitialDateParts[0])
        this.initialMonth = Number(ortegaInitialDateParts[1])
        this.initialYear  = Number(ortegaInitialDateParts[2])

        // Store real datetime with specified game time offset
        this.initialRealDateTime = moment(realInitialDate, "DD.MM.YYYY h:mm:ss").utcOffset(timeOffset)

        // Get difference between user's and game's time offset
        const hoursDifference = this.userTimeOffset - this.gameTimeOffset;

        // Calculate in which time ortega day will start in real time with user's time offset
        if (hoursDifference === 0) {
            this.startOfDayInRealTime = '00:00'
            this.endOfDayInRealTime   = '23:59'
        } else {
            let startOfDayInRealTime = 24 + hoursDifference
            if (startOfDayInRealTime > 24) {
                startOfDayInRealTime -= 24;
            } else {
                // todo: make a workaround for case when user's time offers is lower than game's offset
            }
            this.startOfDayInRealTime = `${startOfDayInRealTime > 9 ? '' : '0'}${startOfDayInRealTime}:00`
            this.endOfDayInRealTime   = `${startOfDayInRealTime - 1 > 9 ? '' : '0'}${startOfDayInRealTime - 1}:59`
        }
        this.update()
    }

    update() {
        const currentUserDateTime = moment()

        // Define Ortega date on construct or update it on new day in reality
        if (this.currentDate === undefined || this.currentDate !== currentUserDateTime.date()) {
            let days = currentUserDateTime.diff(this.initialRealDateTime, "days") + this.initialDay;

            this.year  = this.initialYear
            if (days > 360) {
                this.year += Math.floor(days / 360)
                days %= 360;
            }

            this.month = this.initialMonth
            if (days > 30) {
                this.month += Math.floor(days / 30)
                days %= 30;
            }
            if (this.month > 12) {
                this.month = 1;
                this.year++;
            }

            this.day = days || 1
        }

        this.currentDate = currentUserDateTime.date()
        currentUserDateTime.utcOffset(this.gameTimeOffset)

        this.hours   = currentUserDateTime.hours()
        this.minutes = currentUserDateTime.minutes()
        this.seconds = currentUserDateTime.seconds()
    }

    getRealDateTime(returnDateTime = false) {
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

    // todo: optimize me
    getTempa() {
        switch(this.hours) {
            case this.hours <= 3:  return ORTEGA_TEMPAS[0]
            case this.hours <= 6:  return ORTEGA_TEMPAS[1]
            case this.hours <= 9:  return ORTEGA_TEMPAS[2]
            case this.hours <= 12: return ORTEGA_TEMPAS[3]
            case this.hours <= 15: return ORTEGA_TEMPAS[4]
            case this.hours <= 18: return ORTEGA_TEMPAS[5]
            case this.hours <= 21: return ORTEGA_TEMPAS[6]
            case this.hours <= 24: return ORTEGA_TEMPAS[7]
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

    toRealDateTime(ortegaDateTime, returnDateTime = false) {
        return OrtegaDatetime.toRealDateTime(ortegaDateTime, this.initialOrtegaDate, this.initialRealDate, returnDateTime, this.gameTimeOffset)
    }

    static toRealDateTime(ortegaDateTime, ortegaInitialDate = '01.01.72', realInitialDate = '01.10.2018', returnDateTime = false, timeOffset = 0) {
        // Split specified ortega datetime to date and time
        const ortegaDateTimeParts = ortegaDateTime.split(' ')
        // Split specified ortega date date to year, month and day
        const ortegaDateParts = ortegaDateTimeParts[0].split('.')
        // Split specified ortega time to hours, minutes and seconds
        const ortegaTimeParts = ortegaDateTimeParts[1].split(':')
        // Split initial ortega date to year, month and day
        const ortegaInitialDateParts = ortegaInitialDate.split('.')
        // Split initial real date to year, month and day
        const realInitialDateParts = realInitialDate.split('.')

        // Get difference in days between specified and initial ortega date
        const yearsDiff    = ortegaDateParts[2] - ortegaInitialDateParts[2]
        const monthsDiff   = ortegaDateParts[1] - ortegaInitialDateParts[1]
        const daysDiff     = ortegaDateParts[0] - ortegaInitialDateParts[0] + monthsDiff * 30 + yearsDiff * 360

        // Add day difference between initial and specified ortega date to initial real date and remove time offset
        const realDateTime = addHours(
            addDays(
                new Date(
                    Number(realInitialDateParts[2]),
                    Number(realInitialDateParts[1]) - 1,
                    Number(realInitialDateParts[0]),
                    ortegaTimeParts[0],
                    ortegaTimeParts[1],
                    ortegaTimeParts[2]
                ),
                daysDiff
            ),
            (timeOffset * -1) + ((new Date()).getTimezoneOffset() / 60 * - 1)
        )
        // console.log(`${ortegaDateTime} => ${realDateTime}`)

        if (!returnDateTime) {
            const
                realDay   = realDateTime.getDate(),
                realMonth = realDateTime.getMonth() + 1,
                realYear  = realDateTime.getFullYear()
            return `${realDay > 9 ? '' : '0'}${realDay}.${realMonth > 9 ? '' : '0'}${realMonth}.${realYear > 9 ? '' : '0'}${realYear}`
        }

        return realDateTime
    }
}

export {
    ORTEGA_MONTHS,
    ORTEGA_DAYS,
    ORTEGA_TEMPAS
}