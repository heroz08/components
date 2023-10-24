import { isStr, hasData } from '@utils/type.js';
import * as ComMap from '@coms';
import * as AntdMap from 'antd';
export const getOptsByDict = (opts, dict) => {
  return getDict(opts, dict);
}

export const getComByName = (component) => {
  if (isStr(component)) { // 字符串需要返回一个组件
    return ComMap[component] || AntdMap[component] || component;
  } else {
    return component
  }
}

export function translateDict(list, dict, key = 'opts') {
  return list.map(item => {
    const keyValue = item[key];
    const obj = {};
    if (hasData(keyValue)) {
      obj.options = getDict(keyValue, dict) || [];
    }
    const temp = {
      ...{},
      ...item,
      ...obj
    };
    delete temp[key];
    return temp;
  });
}

export function getDict(key, dict) {
  return dict?.[key] || [];
}

export default {
}
