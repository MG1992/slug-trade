import Vue from 'vue'
import keys from '@/config/keyValue'

/**
 * @description: 键值对过滤器 参考https://cn.vuejs.org/v2/guide/filters.html
 * @param {string} k  传进来的值
 * @param {string} filterKey 需要过滤的字段名 多层的话直接a.b.c
 * @return {string}
 * 使用：
 * 1、在双花括号中 -->{{ message | capitalize }} ; 在 `v-bind` 中 --> <div :id="rawId | formatId"></div>      '0' | KeyFilter('status')
 * 2、单独使用：引入之后 KeyFilter(i18n.locale,'common.langNum')
 */
export function KeyFilter(k, filterKey) {
  // 获取目标数组
  const filterKeyArr = filterKey.split('.')
  let targetArr = keys
  filterKeyArr.map((item) => {
    targetArr = targetArr[item]
  })
  const data = targetArr.find((item) => item.key === k.toString())
  return data ? data.value : k
}

Vue.filter('KeyFilter', KeyFilter)
