import { useState } from 'react';
import IconButton from '../IconButton';
import style from './index.module.less';

export default function PickUp(props) {
  const {
    openIcon = 'icon-xiangzuojiantou',
    closeIcon= 'icon-xiangyoujiantou',
    show = true,
    children = null,
    direction = 'row',
    buttonStyle = {},
    iconStyle,
    wrapPx = 352,
    offset
  } = props;
  const border = '1px solid rgba(0, 0, 0, 0.06)';
  const [isShowForm, setIsShowForm] = useState(show);
  const _buttonStyle =
    direction === 'row'
      ? {
        right: -13,
        top: offset || 16
      }
      : {
        top: -13,
        left: offset || '50%',
        transform: 'translateX(-50%) rotate(-90deg) '
      };
  const wrapStyle =
    direction === 'row'
      ? {
        width: isShowForm ? wrapPx : '0',
        height: '100%',
        borderRight: isShowForm && border,
        paddingRight: 8
      }
      : {
        height: isShowForm ? wrapPx : '0',
        width: '100%',
        borderTop: isShowForm && border,
        paddingTop: 8
      };

  return (
    <div className={style.pickUpWrap} style={wrapStyle}>
      <div
        style={{
          overflow: 'hidden',
          height: wrapStyle.height,
          width: wrapStyle.width
        }}
      >
        {children}
      </div>
      <IconButton
        shape="circle"
        icon={isShowForm ? openIcon : closeIcon}
        className="iconButton"
        style={{ ..._buttonStyle, ...buttonStyle }}
        iconStyle={iconStyle}
        onClick={() => setIsShowForm(!isShowForm)}
      />
    </div>
  );
}


export const PickUpConfig = {
  // direction: 'columns',
  children: (
    <div>children</div>
  )
}
