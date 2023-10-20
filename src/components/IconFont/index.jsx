import React from 'react';
export default function IconFont(props) {
  const { icon, ...other } = props;
  if (icon) {
    const finalIcon = icon.replace('icon-', '')
    return <i className={`icon iconfont icon-${finalIcon}`} {...other} />;
  }
  return null;
}

export const IconFontConfig = {
  icon: 'icon-home'
}
