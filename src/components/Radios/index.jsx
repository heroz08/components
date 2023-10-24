import { Radio } from 'antd';
import React from 'react';
import { isFn } from '@utils/type.js';
const RadioGroup = Radio.Group
export default function Radios(props) {
  const { onChange, ...other } = props;
  const _onChange = (e) => {
    const { value } = e?.target || {}
    isFn(onChange) && onChange(value);
  }
  return (
    <RadioGroup
      onChange={_onChange}
      {...other}
    />
  );
}

export const RadiosConfig = {
  options: [
    {
      label: 't1',
      value: 't1'
    },
    {
      label: 't2',
      value: 't2'
    }
  ]
}
