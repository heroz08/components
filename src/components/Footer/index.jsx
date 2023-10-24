import { Button, Space } from 'antd';
import style from './index.module.less';
import React, { useMemo } from 'react';

function Footer(props) {
  const {
    onClose,
    onSubmit,
    onReset,
    loading,
    submitText = '确定',
    resetText = '重置',
    cancelText = '取消',
    className,
    submitDisabled = false,
    sortKey = ['cancel', 'ok', 'reset'],
    marginWidth = 16
  } = props;

  const formButtonContent = useMemo(() => {

    const submitButton = (index, key) => createButton(onSubmit, key, index, submitText, true,
      {
        disabled: submitDisabled, loading, type: 'primary'
      }
    );

    const resetButton = (index, key) => createButton(onReset, key, index, resetText);
    const closeButton = (index, key) => createButton(onClose, key, index, cancelText);

    const Map = {
      ok: submitButton,
      cancel: closeButton,
      reset: resetButton,
    };

    return sortKey.map((key, index) => Map[key](index, key));
  }, [sortKey, submitDisabled, loading, submitText, resetText, cancelText]);


  const custom = className ? `${className} ${style.footer_wrap}` : style.footer_wrap;
  return (
    <Space size={marginWidth} className={custom}>
      {formButtonContent}
    </Space>
  );
}

function createButton(callback, key, index, text, mustExist = false, otherInfo={}) {
  const {
    disabled, type, loading
  } = otherInfo
  const isShow = mustExist ? true : !!callback;
  return isShow ? (
    <Button
      onClick={callback}
      type={type}
      disabled={disabled}
      loading={loading}
      key={key}
    >
      {text}
    </Button>) : null;
}

export default Footer;

export const FooterConfig = {
  onReset: () => {},
  onClose: () => {},
  sortKey: ['reset', 'cancel', 'ok']
}
