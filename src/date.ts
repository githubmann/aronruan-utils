/**
 * 获取现在过去了多少天
 * @param date Date
 */
export const dayOfYear = (date: Date) =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)

/**
 * 获取时间的字符串，HH:MM:SS
 */
export const getColonTimeFromDate = (date: Date) => date.toTimeString().slice(0, 8) // "08:38:00"

/**
 * ```js
 * getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9
 * ```
 * @param dateInitial 前
 * @param dateFinal 后
 */
export const getDaysDiffBetweenDates = (dateInitial: Date, dateFinal: Date) =>
         (dateFinal - dateInitial) / (1000 * 3600 * 24)
