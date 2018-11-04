export const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export const addHours = (date, hours) => {
    const result = new Date(date);
    result.setTime(result.getTime() + hours * 60 * 60 * 1000);
    return result;
}

export const dateTimeToDate = (dateTime) => {
    return datePartsToDate(dateTime.getDate(), dateTime.getMonth() + 1, dateTime.getFullYear())
}

export const dateTimeToTime = (dateTime) => {
    const
        hours   = dateTime.getHours(),
        minutes = dateTime.getMinutes(),
        seconds = dateTime.getSeconds()
    return `${hours > 9 ? '' : '0'}${hours}:${minutes > 9 ? '' : '0'}${minutes}:${seconds > 9 ? '' : '0'}${seconds}`
}

export const datePartsToDate = (day, month, year) => {
    return `${day > 9 ? '' : '0'}${day}.${month > 9 ? '' : '0'}${month}.${year}`
}