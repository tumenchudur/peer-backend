import { DateTime } from 'luxon'
// import { Types } from 'mongoose'

function now(): Date {
    return new Date(`${DateTime.local().toISO().substr(0, 23)}Z`)
}

function nowFormat(): string {
    return DateTime.utc().plus({ hours: 8 }).toFormat('yyyy/MM/dd  HH:mm:ss')
}

function yesterday(): Date {
    return new Date(`${DateTime.local().minus({ days: 1 }).toISO().substr(0, 23)}Z`)
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
    yesterday
    // objectIdWithTimestamp
}
