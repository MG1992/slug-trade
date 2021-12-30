// 构造函数
// declare type DateTimeFormatOptions = {
//   year?: 'numeric' | '2-digit',
//   month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long',
//   day?: 'numeric' | '2-digit',
//   hour?: 'numeric' | '2-digit',
//   minute?: 'numeric' | '2-digit',
//   second?: 'numeric' | '2-digit',
//   weekday?: 'narrow' | 'short' | 'long',
//   hour12?: boolean,
//   era?: 'narrow' | 'short' | 'long',
//   timeZone?: string, // IANA time zone
//   timeZoneName?: 'short' | 'long',
//   localeMatcher?: 'lookup' | 'best fit',
//   formatMatcher?: 'basic' | 'best fit'
// };
const dateTimeFormats = {
  'en': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: "numeric", hour12: false
    },
    timeOnly: {
      hour: 'numeric', minute: 'numeric', second: "numeric", hour12: false
    }
  },
  'zh': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: "numeric", hour12: false
    },
    timeOnly: {
      hour: 'numeric', minute: 'numeric', second: "numeric", hour12: false
    }
  }
}
export default dateTimeFormats