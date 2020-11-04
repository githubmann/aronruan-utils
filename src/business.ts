// remainTime 以毫秒为单位
export const getReaminTime = (remainTime: number) => {
  if (remainTime > 0) {
    const [remainHour, remainMinute, remainSecond] = [
      remainTime % (60 * 60 * 24),
      remainTime % (60 * 60),
      remainTime % 60,
    ]
    const [day, hour, minute, second] = [
      Math.floor(remainTime / (60 * 60 * 24)),
      Math.floor(remainHour / (60 * 60)),
      Math.floor(remainMinute / 60),
      remainSecond,
    ]
    if (!day) {
      return `${hour.toString().padStart(2, '0') + ':'}${
        minute.toString().padStart(2, '0') + ':'
        }${second.toString().padStart(2, '0')}`
    }
    return `${day ? day + '天' : ''}${
      hour.toString().padStart(2, '0') + '小时'
      }`
  } else {
    return ''
  }
}


/**
 * 比如: 2.1 -> 2.10, 40 -> 40.00
 */
export const splitInteger = (num: number) => {
  let [integer, decimal = '00'] = num.toString().split('.')
  decimal = (decimal + '00').slice(0, 2)
  return { integer, decimal }
}


/**
 * const consumeQueue = new ConsumeQueue()
 * consumeQueue.push(consume_keys.CAN_DIRECT_TO_ADDR)
 */
export class ConsumeQueue {
  queue: Array<{ key: string, count: number, data: any }> = []
  push<T>(key: string, data?: T) {
    const theItem = this.queue.find(item => item.key === key)

    if (!theItem) {
      return this.queue.push({ key, count: 1, data })
    }


    theItem.count += 1
  }

  pop(key: string) {

    const theItem = this.queue.find(item => item.key === key)
    if (!theItem) return false

    theItem.count -= 1

    if (theItem.count === 0) this.queue = this.queue.filter(item => item.key !== key)

    return theItem
  }
}
