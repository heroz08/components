import Form from '../Form';
import Desc from '../Desc';
import style from './index.module.less';
import React from 'react';

function DESCANDFORM(props) {
  const { descProps, formProps, form } = props;
  return (
    <>
      <Desc {...descProps} />
      <Form {...formProps} form={form}/>
    </>
  );
}

function FormInstance(props) {
  const { form, ...formProps } = props;
  return (
    <Form {...formProps} form={form}/>
  );
}

function DescInstance(props) {
  const { form, ...descProps } = props;
  return (
    <Desc {...descProps} />
  );
}


export const StructTypeMap = {
  FORM: "FORM",
  DESC: "DESC",
  DESCANDFORM: 'DESCANDFORM'
}

export const StructPropNameMap = {
  [StructTypeMap.FORM]: 'formProps',
  [StructTypeMap.DESC]: 'descProps',
  [StructTypeMap.DESCANDFORM]: 'self',
};

export const StructComMap = {
  [StructTypeMap.FORM]: FormInstance,
  [StructTypeMap.DESC]: DescInstance,
  [StructTypeMap.DESCANDFORM]: DESCANDFORM
};


export default function Struct(props) {
  const {
    form,
    left,
    right,
    structConfig = [StructTypeMap.DESC, StructTypeMap.FORM],
    showSplitLine = true,
    leftStyle,
    rightStyle
  } = props;

  const single = !(structConfig.length === 2)

  const LeftCom = StructComMap?.[structConfig?.[0]];
  const leftPropName = StructPropNameMap?.[structConfig?.[0]];
  const leftProps = leftPropName === 'self' ? left: left?.[leftPropName] || {};
  const RightCom = StructComMap[structConfig[1]];
  const rightPropName = StructPropNameMap?.[structConfig?.[1]];
  const rightProps = (rightPropName === 'self' ? right : right?.[rightPropName]) || {};

  const _leftStyle = {
    ...leftStyle,
    ...single ? { width: '100%' } : {}
  }
  const _rightStyle = {
    ...rightStyle,
    ...single ? { display: 'none' } : {}
  }
  return (
    <div className={style.wrap}>
      <div className={style.leftWrap} style={_leftStyle}>
        {LeftCom && <LeftCom {...leftProps} form={form}/>}
      </div>
      <div className={(showSplitLine && !single) ? style.line : ''}/>
      <div className={style.rightWrap} style={_rightStyle} >
        {RightCom && <RightCom {...rightProps} form={form}/>}
      </div>
    </div>
  );
}
