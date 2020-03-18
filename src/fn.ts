export function getQueryStr(name: string) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return r[2]
  return null
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 *
 * @param url 地址，如: https://www.google.com 或者 https://www.google.com?
 * @param params query object 参数
 */
export const transformObjtoUrlQueryString = (url: string, params:{[key: string]: string}) => {
  if (!params) return url
  const hasQuestionSymbol = url.slice(-1) === '?'
  const strParam = Object.keys(params).reduce((pre, cur, currentIndex) => {
    if (currentIndex === 0) {
      return (
        pre +
        `${cur}=${encodeURIComponent(
          typeof params[cur] === 'object'
            ? JSON.stringify(params[cur])
            : params[cur]
        )}`
      )
    }
    else {
      return (
        pre +
        '&' +
        `${cur}=${encodeURIComponent(
          typeof params[cur] === 'object'
            ? JSON.stringify(params[cur])
            : params[cur]
        )}`
      )
    }
  }, '')
  return url + (hasQuestionSymbol ? '' : '?') + strParam
}

/**
 * 将 object 变成排序的 string
 * @param obj params
 * @param linkChar key-val 对连接使用的字符串
 * @param replaceSpaceWith
 */
export function twistObjectInToSortedString(
  obj: { [key: string]: string},
  linkChar = '',
  replaceSpaceWith = ''
) {
  let keys = Object.keys(obj)
  keys = keys.sort((a, b) => (a as any) - (b as any))
  return keys.reduce((prev, cur, curIndx) => {
    let encodeValue = encodeURIComponent(obj[cur])
    encodeValue =
      replaceSpaceWith && encodeValue
        ? encodeValue.replace(/%20/g, replaceSpaceWith)
        : encodeValue
    return `${prev && `${prev}${linkChar}`}${cur}=${encodeValue}`
  }, '')
}

/**
 * 比如 objToQuery({ name: 'aronruan', age: 23 })  -> name=aronruan&age=23
 * @param obj 非嵌套对象
 */
export function objToQuery(obj) {
  return Object.keys(obj).reduce((pre, cur) => pre ? `${pre}&${cur}=${encodeURIComponent(obj[cur])}` : `${cur}=${encodeURIComponent(obj[cur])}`, '')
}

/**
 * 获取 object 的排序 key
 * @param obj
 */
export function sortKeys(obj: { [key: string]: string}) {
  const rt: { [key: string]: string} = {}
  const sortedKeys = Object.keys(obj).sort()
  sortedKeys.forEach(key => {
    rt[key] = obj[key]
  })
  return rt
}

/**
 * @param fn 函数
 * @param wait 时间
 */
export const throttle = (fn: () => void, wait: number) => {
  // tslint:disable-next-line: one-variable-per-declaration
  let inThrottle: any, lastFn: any, lastTime: any;
  return function() {
    // tslint:disable-next-line: one-variable-per-declaration
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, (args as any));
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function() {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, (args as any));
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

/**
 * @param fn
 * @param ms
 */
export const debounce = (fn: Function, ms = 0) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};


export const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length;
export const isObject = (obj: any) => obj === Object(obj);
export const compact = (arr: Array<any>) => arr.filter(Boolean);
export const difference = (a: Array<number | string | undefined | null>, b: Array<number | string | undefined | null>) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};
/**
 * Randomizes the order of the values of an array, returning a new array.
 * @param param0
 */
export const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

/**
 * take([1, 2, 3], 5); // [1, 2, 3]
 * take([1, 2, 3], 0); // []
 *
 * Returns an array with n elements removed from the beginning.
 * @param arr
 * @param n
 */
export const take = (arr: Array<any>, n = 1) => arr.slice(0, n);

export const takeRight = (arr: Array<any>, n = 1) => arr.slice(arr.length - n, arr.length);


export const chainAsync = (fns: (next: () => void) => void) => {
  let curr = 0
  const last = fns[(fns.length - 1)]
  const next = () => {
    const fn = fns[curr++]
    fn === last ? fn() : fn(next)
  }
  next()
}

/**
 *
 * @param n 需要被判断的值
 * @param start 起始值
 * @param end 结束值
 */
export const inRange = (n: number, start: number, end: number) => {
  if (end && start > end) [end, start] = [start, end]
  return end == null ? n >= 0 && n < start : n >= start && n < end
}

/**
 * 判断给定的值是什么类型
 * @param type String, Array, ArrayBuffer, RegExp, Set, Number, Boolean, WeakMap, WeakSet
 * @param val
 */
export const is = (type: any, val: any) => ![, null].includes(val) && val.constructor === type
