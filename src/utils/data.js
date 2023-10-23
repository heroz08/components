import { hasData } from './type.js';

/**
 * 根据keys去重list
 * @param list
 * @param keys
 * @returns {*[]}
 */
export function unique(list, keys) {
  const arr = new Set();
  const res = [];
  for (const item of list) {
    const onlyKey = keys.map((key) => item[key]).join('-');
    if (!arr.has(onlyKey)) {
      arr.add(onlyKey);
      res.push(item);
    }
  }
  return res;
}

/**
 * @desc 寻找map里面originKey等于v的对象的key的值
 * @param v
 * @param map
 * @param key
 * @param originKey
 * @returns {*}
 */
export function nameMapValue(v, map = [], key, originKey) {
  if ((map || []).length === 0) return v;
  const result = map.find((item) => (item[originKey || 'value'] === v || `${item[originKey || 'value']}` === `${v}`));
  if (result) {
    return key ? result[key] : result.label;
  }
  return v;
}

export function getItemByKey(v, map = [], key) {
  return map.find(item => item[key] === v);
}

export function or(data, data2) {
  return hasData(data) ? data : data2;
}
