import { Toast } from 'vant'
import i18n from '@/langs'

/**
 *
 * @param { Object } originObj 检验的对象
 * @param { Array } rules 校验规则，实例如下
 *
    checkRuls: [
      {
        attr: 'name', // originObj中的属性
        cnName: '名字', // 中文名
        rules: {
          maxLength: 16, // 最大长度
          minLength: 6, // 最小长度
          allowNull: true, // default: false 是否允许非空 默认是false
          defineLength: 10, // 规定长度
          regex: /\d/g, // 正则表达式
          regexMsg: '正则表达式提示信息'
        },
      }
    ]
    检查非空只需传入attr和cnName
 */
const checkRules = function (originObj, rules) {
    let errorMessage = ''
    rules.forEach(item => {
        if (item.rules) {
            const iRule = item.rules
            
            if (!iRule.allowNull && !originObj[item.attr]) {         
              errorMessage = getMessage(errorMessage, iRule.customHint ? `${item.cnName}` : `${i18n.t('common.pleaseEnter')}${item.cnName}`)         
            }
            if (iRule.maxLength && (originObj[item.attr] && originObj[item.attr].length > iRule.maxLength)) {
                errorMessage = getMessage(errorMessage, `${item.cnName}${i18n.t('common.lengthCantOver')}${iRule.maxLength}`)
            } else if (iRule.minLength && (originObj[item.attr] && originObj[item.attr].length < iRule.minLength)) {
                errorMessage = getMessage(errorMessage, `${item.cnName}${i18n.t('common.lengthCantLessThan')}${iRule.minLength}`)
            } else if (iRule.defineLength && (originObj[item.attr] && originObj[item.attr].length !== iRule.defineLength)) {
                errorMessage = getMessage(errorMessage, `${i18n.t('common.pleaseEnter')}${i18n.t('common.correct')}${item.cnName}${i18n.t('common.length')}`)
            } else if (iRule.regex && (originObj[item.attr] && !iRule.regex.test(originObj[item.attr]))) {
                errorMessage = getMessage(errorMessage, iRule.regexMsg || `${item.cnName}${i18n.t('common.filledWrong')}`)
            }
        } else {
            if (!originObj[item.attr]) {
                errorMessage = getMessage(errorMessage, `${item.cnName}${i18n.t('common.notAllowToBeNull')}`)
            }
        }
    })
    if (errorMessage) Toast(errorMessage)
    return errorMessage
}

function getMessage(container, mes) {
    return container || mes
}

export default checkRules