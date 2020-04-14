/**
 * 判断元素是否在可视范围
 * @param el
 * @param partiallyVisible 是否部分可见
 */
export const elementIsVisibleInViewport = (el: Element, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect()
  const { innerHeight, innerWidth } = window
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
}

/**
 * ```js
 * getScrollPosition(); // {x: 0, y: 200}
 * ```
 * 获取滚动距离
 * @param el 元素，默认为当前页面
 */
export const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : (el as any).scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : (el as any).scrollTop
})

/**
 * 复制
 */
export const copyToClipboard = (str: string) => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  const selected =
    (document.getSelection() as any).rangeCount > 0
      ? (document.getSelection() as any).getRangeAt(0)
      : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (selected) {
    ;(document.getSelection() as any).removeAllRanges()
    ;(document.getSelection() as any).addRange(selected)
  }
}

/**
 * 获取页面隐藏属性的前缀
 * 如果页面支持 hidden 属性，返回 '' 就行
 * 如果不支持，各个浏览器对 hidden 属性，有自己的实现，不同浏览器不同前缀，遍历看支持哪个
 */
function getPagePropertyPrefix() {
  const prefixes = ['webkit', 'moz', 'ms', 'o']
  let correctPrefix

  if ('hidden' in document) return ''

  prefixes.forEach(prefix => {
    if (`${prefix}Hidden` in document) {
      correctPrefix = prefix
    }
  })
  if (document) {
    correctPrefix = (document as any).visibilityState === 'visible'
  }
  return correctPrefix || false
}

/**
 * 获取判断页面 显示|隐藏 状态改变的属性
 */
function getVisibilityChangeProperty() {
  const prefix = getPagePropertyPrefix()
  if (prefix === false) return false

  return `${prefix}visibilitychange`
}

/**
 * 有兼容性问题
 * @param {function} cb - 页面可见性变化
 */
export function addEventToVisibility(cb: (isVisible: boolean) => void) {
  const visibilityChangeProperty = getVisibilityChangeProperty()
  if (visibilityChangeProperty) {
    let cbWrapper = () => {
      cb(!document.hidden)
    }
    document.addEventListener(visibilityChangeProperty, cbWrapper)
    return cbWrapper
  }
}

export function removeEventFromVisibility(cb: () => void) {
 const visibilityChangeProperty = getVisibilityChangeProperty()
 if (visibilityChangeProperty) {
   document.removeEventListener(visibilityChangeProperty, cb)
   return
 }
}

/**
 * 判断页面是否到底
 */
export const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight || document.documentElement.clientHeight)

/**
 * smoothScroll 到某个位置
 * ```js
 * smoothScroll('#fooBar'); // scrolls smoothly to the element with the id fooBar
 * smoothScroll('.fooBar'); // scrolls smoothly to the first element with a class of fooBar
 * ```
 */
export const smoothScroll = (element: string) =>
  document.querySelector(element as any).scrollIntoView({
    behavior: 'smooth'
  })
