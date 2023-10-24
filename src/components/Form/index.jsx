import { Form, Row, } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useMemo } from 'react';
import { isArr, isFn } from '@utils/type.js';
import { getComByName, getOptsByDict } from './utils';
import Items from './Items.jsx'


/**
 * @desc form
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function MyForm(props) {
  const [_form] = useForm();
  const {
    form,
    localDict = {}, // 字典2
    dict = {}, // 字典
    cols = 2, // 列数
    initialValues = {}, // 初始值
    layout = 'vertical', // 布局
    scrollToFirstError = true, // 错误滚动
    onFinish, // submit
    onReset, // reset
    backfillData, // 回填数据
    formItems = [], // 表单项配置
    formTopNode, // form上方组件节点
    formBottomNode, // form 下方组件节点
    changeItemsHandles = [], // change 回调handle配置
    onValuesChange: _onValuesChange,
    ...ext
  } = props;

  const finalForm = form || _form;

  const newFormItems = useMemo(() => formItems.map((item) => {
    const { opts, component, localOpts, ...ext } = item?.comConfig || {};
    const com = getComByName(component || item?.component); // 获取组件
    const changeObj = {
      component: com
    };
    if (opts) {
      const currentOpt = getOptsByDict(opts, dict); // 获取字典
      changeObj.comConfig = { ...ext, options: currentOpt };
    }
    if (localOpts) {
      const currentOpt = getOptsByDict(localOpts, localDict); // 获取字典
      changeObj.comConfig = { ...ext, options: currentOpt };
    }
    return {
      ...{},
      ...item,
      ...changeObj
    };
  }), [formItems, dict, localDict]);
  const _onFinish = (data) => { // 提交
    onFinish && onFinish(data);
  };
  const _onReset = () => { // 重置
    onReset && onReset();
  };
  const changeHandles = {};
  const otherHandles = {};
  const handlePro = (name, handle) => (e) => { // 生成统一数据格式
    const { value } = e?.target || {};
    const allValues = finalForm.getFieldsValue(true);
    handle && handle(value, allValues, name);
  };

  changeItemsHandles.forEach((item) => { // 区分不同类型的changehandle
    const { type = 'onChange', name, handle } = item;
    const nameList = isArr(name) ? name : [name];
    nameList.forEach((k) => {
      if (type === 'onChange') {
        changeHandles[k] = { handle };
      } else {
        otherHandles[k] = { [type]: handlePro(k, handle) };
      }
    });
  });
  const onValuesChange = (changeValues, allValues) => { // value change
    const changeName = Object.keys(changeValues)[0];
    const { handle } = changeHandles[changeName] || {};
    if (handle && isFn(handle)) {
      const result = handle(changeValues[changeName], allValues);
      if (result) {
        finalForm.setFieldsValue({ ...allValues, ...result }); // 根据result更新form
      }
    }
    _onValuesChange && _onValuesChange(changeValues, allValues);
  };

  useEffect(() => { // 回填数据
    if (backfillData && Object.keys(backfillData).length) {
      finalForm.setFieldsValue(backfillData);
    }
  }, [JSON.stringify(backfillData)]);

  const formConfig = {
    form: finalForm,
    initialValues,
    layout,
    scrollToFirstError,
    onFinish: _onFinish,
    onReset: _onReset,
    onValuesChange,
    ...ext,
  };
  return (
    <Form {...formConfig}>
      {
        formTopNode
      }
      <Row>
        <Items items={newFormItems} cols={cols} handles={otherHandles}/>
      </Row>
      {
        formBottomNode
      }
    </Form>
  );
}

export const FormConfig = {
  initialValues: {
    t1: 'haha'
  },
  formItems: [
    {
      name: 't1',
      label: '表单1',
      component: 'Input',
    },
    {
      name: 't2',
      label: '表单2',
      component: 'Radios',
      required: true,
      comConfig: {
        opts: 'bd2'
      }
    },
    {
      title: 'group'
    },
    {
      name: 't3',
      label: '表单3',
      component: 'Select',
      required: true,
      comConfig:{
        localOpts: 'bd3'
      }
    }
  ],
  dict: {
    bd2: [
      {
        label: 't22',
        value: 't2'
      },
      {
        label: 't12',
        value: 't1'
      }
    ]
  },
  localDict: {
    bd3: [
      {
        label: 't32',
        value: 't3'
      }
    ]
  },
  cols: 2
}
