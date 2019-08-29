import {DateTime, Duration, Interval} from 'luxon'

export function createTimeHour(hour: number) {
    return DateTime.local(0).set({hour: hour})
}

export function createDurMin(mins: number) {
    return Duration.fromObject({minutes: mins})
}


export function intervalToStr(int: Interval) {
    return `${int.start.hour}:${int.start.minute} to ${int.end.hour}:${int.end.minute}`
}