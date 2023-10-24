import { Drawer, Modal } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'antd/es/form/Form';
import Struct, { StructTypeMap } from '../Struct';
import Footer from '../Footer';
import style from './index.less';
import { Loading } from '@coms';
import { isFn } from '@utils/type.js';

export default function ModalAndDrawerForm(props) {
  const {
    title,
    form: _form,
    okLoading = false,
    width = 650,
    closeIconRight = true,
    mode = 'modal',
    open = true,
    onClose,
    onOk,
    left,
    right,
    footerProps,
    onReset,
    showFooter = true,
    bodyHeight,
    contentLoading = false,
    leftStyle, rightStyle,
    structConfig,
    showSplitLine,
    ...ext
  } = props;
  const [ innerForm] = useForm();
  const form = _form || innerForm;


  const onSubmit = () => {
    form?.submit();
    isFn(onOk) && onOk()
  };
  const _onReset = onReset ? () => {
    form?.resetFields();
    isFn(onReset) && onReset();
  } : undefined;
  const _onClose = () => {
    onClose && onClose();
  };

  useEffect(() => { // 关闭Wrap 重置form
    if (!open) {
      form?.resetFields();
    }
  }, [open]);

  const commonProps = {
    destroyOnClose: true,
    bodyStyle: { maxHeight: bodyHeight || 600, overflowY: 'auto' },
    open,
    title,
    width,
    maskClosable: false,
    footer: showFooter ?
      (<Footer
        loading={okLoading}
        {...footerProps}
        onClose={_onClose}
        onSubmit={onSubmit}
        onReset={_onReset}
      />)
      : null,
  };
  const modalProps = {
    centered: true, onCancel: _onClose, ...commonProps, ...ext
  };
  const drawerProps = {
    className: closeIconRight ? style.rightCloseIcon : '', onClose: _onClose, ...commonProps, ...ext
  };

  const Wrap = mode === 'modal' ? Modal : Drawer;
  const wrapConfig = mode === 'modal' ? modalProps : drawerProps;
  return (
    <Wrap {...wrapConfig}>
      <Loading loading={contentLoading}>
        <Struct
          form={form}
          left={left}
          right={right}
          structConfig={structConfig}
          showSplitLine={showSplitLine}
          leftStyle={leftStyle}
          rightStyle={rightStyle}/>
      </Loading>
    </Wrap>
  );
}

export const ModalAndDrawerFormConfig = {
  title: 'xxxx',
  showSplitLine: true,
  open: true,
  okLoading: false,
  onOk: () => {
    console.log(2333);
  },
  right: {
    descProps: {
      list: [
        {
          label: 'xxx',
          value: 'xx'
        }
      ],
    }
  },
  left: {
    formProps: {
      formItems: [{
        label: 'xxx',
        name: 'ahah',
        component: 'Input'
      }]
    },
    descProps: {
      list: [
        {
          label: 'xxx',
          value: 'xx'
        }
      ],
    }
  },
  structConfig: [ StructTypeMap.DESCANDFORM, StructTypeMap.DESC],
  // leftStyle: {
  //   width: '50%'
  // },
  // rightStyle: {
  //   width: '50%'
  // },
}
