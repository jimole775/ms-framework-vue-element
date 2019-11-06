/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * 金额，可带两位小数的正数
 * @param str
 * @returns {boolean}
 */
export function validateMoney(str) {
  const reg = /^[0-9]+(.[0-9]{2})?$/
  return reg.test(str)
}

/**
 * 正数、负数、和小数
 * @param str
 * @returns {boolean}
 */
export function isNumber(str) {
  const reg = /^(\-|\+)?\d+(\.\d+)?$/
  return str != null && reg.test(str)
}

/**
 * 正数、负数、和小数 或者是空
 * @param str
 * @returns {boolean}
 */
export function isNumberOrEmpty(str) {
  const reg = /^(\-|\+)?\d+(\.\d+)?$/
  return str == null || reg.test(str)
}

/**
 * 数值0
 * @param str
 * @returns {boolean}
 */
export function isNotZero(str) {
  return str !== 0
}

/**
 * 正整数
 * @param str
 * @returns {boolean}
 */
export function isInteger(str) {
  const reg = /^[0-9]*[1-9][0-9]*$/
  return str == null || reg.test(str)
}

/**
 * 数值最大限制
 * @param number
 * @param maximum
 * @returns {boolean}
 */
export function validateNumberMaximum(number, maximum) {
  return isNumber(number) && number <= maximum
}

/**
 * 数值最小限制
 * @param number
 * @param maximum
 * @returns {boolean}
 */
export function validateNumberMinimum(number, minimum) {
  return isNumber(number) && number >= minimum
}

/**
 * 字符串最大长度限制
 * @param number
 * @param maximum
 * @returns {boolean}
 */
export function validateStringMaximum(str, maximum) {
  return str && str.toString().length <= maximum
}

/**
 * 字符串最小长度限制
 * @param number
 * @param maximum
 * @returns {boolean}
 */
export function validateStringMinimum(str, minimum) {
  return str && str.toString().length >= minimum
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export function isNotEmpty(val) {
  if (val != null && val !== '') {
    return true
  }
  return false
}

export function dataObjectValidate(data, rules) {
  const errorObejct = {}
  const keys = Object.keys(rules)
  keys.forEach(key => {
    if (rules[key] && rules[key].length && rules[key].length > 0) {
      const error = []
      rules[key].forEach(rule => {
        if (rule.param == null) {
          if (!rule.validate(data[key])) {
            error.push(rule)
          }
        } else if (rule.param.length == null || rule.param.length === 1) {
          if (!rule.validate(data[key], rule.param.length == null ? rule.param : rule.param[0])) {
            error.push(rule)
          }
        } else if (rule.param.length === 2) {
          if (!rule.validate(data[key], rule.param[0], rule.param[1])) {
            error.push(rule)
          }
        } else if (rule.param.length === 3) {
          if (!rule.validate(data[key], rule.param[0], rule.param[1], rule.param[2])) {
            error.push(rule)
          }
        } else if (rule.param.length === 4) {
          if (!rule.validate(data[key], rule.param[0], rule.param[1], rule.param[2], rule.param[3])) {
            error.push(rule)
          }
        } else if (rule.param.length === 5) {
          if (!rule.validate(data[key], rule.param[0], rule.param[1], rule.param[2], rule.param[3], rule.param[4])) {
            error.push(rule)
          }
        }
      })
      if (error.length > 0) errorObejct[key] = error
    }
  })
  if (Object.keys(errorObejct).length > 0) return errorObejct
  else return null
}

export default {
  isvalidUsername,
  validateURL,
  validateLowerCase,
  validateUpperCase,
  validateAlphabets,
  validateEmail,
  isNotEmpty,
  validateMoney,
  isNumber,
  isNotZero,
  validateNumberMaximum,
  validateNumberMinimum,
  validateStringMaximum,
  validateStringMinimum,
  dataObjectValidate,
  isNumberOrEmpty,
  isInteger
}
