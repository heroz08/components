import { Descriptions } from 'antd';
import { useMemo } from 'react';
import { hasData, isFn } from '@utils/type.js'
import { nameMapValue } from '@utils/data.js'
import thousands from '@utils/thounds.js'
import dayjs from 'dayjs';

const formatDict = (tempValue, dict, dictName, dictSplitFlag) => {
  const currentDict = dict?.[dictName];
  if (currentDict) { // 找不到字典不操作
    if (dictSplitFlag) { // 多个值拼接在一起需要翻译
      const values = tempValue.split(dictSplitFlag);
      const dictValues = values.map((value) => nameMapValue(value, currentDict));
      tempValue = dictValues.join(dictSplitFlag);
    } else { // 单个需要翻译
      tempValue = currentDict ? nameMapValue(tempValue, currentDict) : tempValue;
    }
  }
  return tempValue;
};
const createChildren = (key, data, config, dict = {}) => {
  const {
    format,
    hiddenFn,
    isTs,
    isTime,
    formatIn,
    formatOut,
    dictName,
    suffix,
    prefix,
    dictSplitFlag,
    ReactNode,
    nullText = '- -',
    nullTextFn,
  } = config;
  if (hiddenFn && isFn(hiddenFn)) {
    const res = hiddenFn(data, dict?.[dictName] || dict, config); // 如果返回true则隐藏
    if (res === true) { // 隐藏返回false 外面判断
      return false;
    }
  }
  let tempValue = (format && isFn(format)) ? format(data, dict?.[dictName] || dict, {
    ...config,
    value: key
  }) : data?.[key]; // format的时候传入data和对应字典或者全部字典
  if (hasData(tempValue)) { //  判断是否有数据
    if (dictName) { // 字典翻译
      tempValue = formatDict(tempValue, dict, dictName, dictSplitFlag);
    }
    if (isTs) { // 千分符
      tempValue = thousands(tempValue);
    }
    if (isTime && dayjs.isMoment(tempValue)) { // 时间 格式化
      tempValue = tempValue ? dayjs(tempValue, formatIn || 'YYYY-MM-DD').format(formatOut || 'YYYY-MM-DD') : tempValue;
    }
    if (prefix) { // 前缀
      tempValue = prefix + tempValue;
    }
    if (suffix) { // 后缀
      tempValue += suffix;
    }
    if (ReactNode) {
      tempValue = <ReactNode>{tempValue}</ReactNode>;
    }
  } else {
    tempValue = isFn(nullTextFn) ? nullTextFn() : nullText;
  }
  return tempValue;
};

export default function Desc(props) {
  const {
    data, list, dict = {}, labelStyle, contentStyle, title, ...ext
  } = props;

  const items = useMemo(() => (list || [])?.filter((item) => !item.hide)?.map((item) => {
    const { value, label, ...ext } = item;
    const children = createChildren(value, data, ext, dict);
    if (children === false) { // 如果返回false则隐藏此字段返回null
      return null;
    }
    return {
      key: value,
      label,
      children,
    };
  }), [list, data, dict]);
  return (
    <Descriptions
      title={title}
      column={{
        xxl: 4,
        xl: 3,
        lg: 3,
        md: 3,
        sm: 2,
        xs: 1,
      }}
      {...ext}
      contentStyle={{ color: 'rgba(0,0,0,0.85)', minWidth: 100, ...contentStyle }}
      items={items.filter(item => item !== null)}
    />
  );
}

export const DescConfig = {
  title: 'demo',
  data: {
    t1: '1231231',
    t2: ''
  }, list: [
    {
      label: 'test1',
      value: 't1',
      isTs: true
    },
    {
      label: 'test2',
      value: 't2',
      format: (data, dict, config) => {
        return 't2'
      }
    },
    {
      label: 'test3',
      value: 't3',
      isTs: true
    },
  ]
}
