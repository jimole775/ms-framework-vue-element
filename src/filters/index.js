// set function parseTime,formatTime to filter
export { parseTime, formatTime } from '@/utils'

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function fixedNumber(numberOrStr, bit) {
  const baseTimes = Number.parseInt((1).toFixed(bit).replace(/\./, ''))
  const roundStringArr = Math.round(Number.parseFloat(numberOrStr) * baseTimes).toString().split('')

  // 补全类似 0.0001 这种小数类型，获取到的数列长度不正确引起的各种问题
  if (roundStringArr.length < bit) {
    let suffixTimes = bit - roundStringArr.length
    while (suffixTimes--) {
      roundStringArr.unshift(0)
    }
  }
  const res = []
  let loop = 0
  while (loop < roundStringArr.length) {
    if (loop === roundStringArr.length - bit) {
      res.push('.')
    }
    res.push(roundStringArr[loop])
    loop++
  }
  return Number.parseFloat(res.join(''))
}
