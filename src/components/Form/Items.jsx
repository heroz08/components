import styleLess from './index.module.less';
import React from 'react';
import { Col, Form } from 'antd';
const FormItem = Form.Item;
export default function Items(props) {
  const {
    items = [],
    cols,
    handles,
  } = props;
  return (items || []).map((item) => {
    const {
      title, // title
      none, // 节点不存在的隐藏 // 不展示 节点都不存在
      ...ext
    } = item;
    if (title) { // 展示分组的title
      return <div key={title} style={item.style} className={styleLess.title}>{title}</div>;
    }
    return none ? null : <CustomItem cols={cols} {...ext} handles={handles} key={item.name}/>;
  });
}

function CustomItem(props) {
  const {
    col,
    cols,
    hide, // 节点存在的隐藏
    wrapConfig, // 表单项 wrap配置
    ...ext
  } = props;

  return (
    <Col span={24 / (col || cols)}>
      {
        hide ? <div/> : <ColChildren wrapConfig={wrapConfig} ext={ext}/>
      }
    </Col>
  );
}

function ColChildren({ wrapConfig, ext }) {
  return (wrapConfig && wrapConfig?.wrapCom) ?
    <WrapContentItem wrapConfig={wrapConfig}>
      <ContentItem {...ext}/>
    </WrapContentItem> :
    <ContentItem {...ext}/>;
}

function WrapContentItem({ wrapConfig, children }) {
  const { wrapCom: WrapCom, ...wrapProps } = wrapConfig;
  return (
    <WrapCom {...wrapProps}>
      {children}
    </WrapCom>
  );
}

// 显示隐藏、占位隐藏、其他插槽 change回调事件、其他回调事件 提交、重置函数、
function ContentItem(props) {
  const {
    component: Component,
    comConfig,
    comTopNode,
    comBottomNode,
    itemBottomNode,
    itemTopNode,
    handles,
    required,
    rules,
    requiredMsg,
    ...itemConfig
  } = props;
  const { name } = itemConfig;
  const handleConfig = handles[name] || {};

  const _rules = required ? [
    {
      required: true,
      message: requiredMsg ? (itemConfig.label + requiredMsg) : `${itemConfig.label}为必填项`,
    },
    ...(rules || [])
  ] : rules;

  return (
    <>
      {
        itemTopNode
      }
      <FormItem {...itemConfig} style={{ paddingRight: '16px' }} rules={_rules}>
        <ItemChildren
          comTopNode={comTopNode}
          comBottomNode={comBottomNode}
          Component={Component}
          {...comConfig}
          {...handleConfig}
        />
      </FormItem>
      {
        itemBottomNode
      }
    </>
  );
}



const ItemChildren = (props) => {
  const { comTopNode, comBottomNode, ...ext } = props;
  return (
    <>
      {
        comTopNode
      }
      <RenderComponent  {...ext} />
      {
        comBottomNode
      }
    </>
  );
};

function RenderComponent(props) {
  const { Component, ...prop } = props;
  return (<Component {...prop} />);
}

