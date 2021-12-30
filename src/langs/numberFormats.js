// 构造函数
// declare type NumberFormatOptions = {
//   style?: 'decimal' | 'currency' | 'percent',
//   currency?: string, // ISO 4217 currency codes
//   currencyDisplay?: 'symbol' | 'code' | 'name',
//   useGrouping?: boolean,
//   minimumIntegerDigits?: number, // 最小整数位
//   minimumFractionDigits?: number, // 最小小数位
//   maximumFractionDigits?: number,
//   minimumSignificantDigits?: number, // 最小有效数字位
//   maximumSignificantDigits?: number,
//   localeMatcher?: 'lookup' | 'best fit',
//   formatMatcher?: 'basic' | 'best fit'
// };
const numberFormats = {
  'en': {
    // 金钱
    currency: {
      style: 'currency', currency: 'USD', currencyDisplay: 'symbol'
    },
    // 数字（不限制）
    number: {
      style: 'decimal'
    },
    // 数字 小数最大保留8位、最小2位
    maximumSignificantDigits8: {
      style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 8
    },
    // 数字 小数最大保留4位
    maximumSignificantDigits4: {
      style: 'decimal', maximumFractionDigits: 4
    },
    // 数字 小数最大保留2位
    maximumSignificantDigits2: {
      style: 'decimal', maximumFractionDigits: 2
    }
  },
  'zh': {
    // 金钱
    currency: {
      style: 'currency', currency: 'CNY', currencyDisplay: 'symbol'
    },
    // 数字（不限制）
    number: {
      style: 'decimal'
    },
    // 数字 小数最大保留8位、最小2位
    maximumSignificantDigits8: {
      style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 8
    },
    // 数字 小数最大保留4位
    maximumSignificantDigits4: {
      style: 'decimal', maximumFractionDigits: 4
    },
    // 数字 小数最大保留2位
    maximumSignificantDigits2: {
      style: 'decimal', maximumFractionDigits: 2
    }
  }
}
const numberFormatsLocal = function (num, type) {
  let length = 0
  switch (type) {
    case 'maximumSignificantDigits2':
      length = 2
      break;
    case 'maximumSignificantDigits4':
      length = 4
      break;
    case 'maximumSignificantDigits8':
      length = 8
      break;

    default:
      length = 0;
      break;
  }
  let reNum = num
  if (!(num instanceof String)) { reNum = String(num) }
  if (/\./g.test(reNum)) {
    const array = reNum.split('.')
    const digits = array[1].substring(0, length)
    reNum = array[0]
    if (digits) {
      reNum = `${array[0]}.${digits}`
    }
  }
  return reNum
}
export default numberFormats
export {
  numberFormatsLocal
}