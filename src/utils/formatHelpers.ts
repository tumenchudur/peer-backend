import { DateTime } from 'luxon'
// import { Types } from 'mongoose'
import _ from 'lodash'

function now(): Date {
    return new Date(`${DateTime.local().toISO().substr(0, 23)}Z`)
}

function nowFormat(): string {
    return DateTime.utc().plus({ hours: 8 }).toFormat('yyyy/MM/dd  HH:mm:ss')
}

function yesterday(): Date {
    return new Date(`${DateTime.local().minus({ days: 1 }).toISO().substr(0, 23)}Z`)
}

function convertNameValuePairs(data: any): any {
    return Object.keys(data).reduce((obj, key) => {
        obj.push({
            Name: key,
            Value: data[key]
        })
        return obj
    }, [])
}

function properCase(data: any): any {
    const response = Object.keys(data).reduce((destination: any, key) => {
        destination[_.camelCase(key)] = data[key]
        return destination
    }, {})

    return response
}
// function objectIdWithTimestamp(timestamp: Date | string): Types.ObjectId {
//     // Convert string date to Date object (otherwise assume timestamp is a date)
//     if (typeof timestamp == 'string') {
//         timestamp = new Date(timestamp)
//     }
//     // Convert date object to hex seconds since Unix epoch
//     const hexSeconds = Math.floor(timestamp.getTime() / 1000).toString(16)
//     // Create an ObjectId with that hex timestamp
//     const constructedObjectId = Types.ObjectId(`${hexSeconds}0000000000000000`)
//     return constructedObjectId
// }

export default {
    now,
    nowFormat,
    yesterday,
    properCase,
    convertNameValuePairs
    // objectIdWithTimestamp
}
