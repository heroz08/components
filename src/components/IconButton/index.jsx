import { Tooltip, Button } from 'antd';
import Icon from '../IconFont';
export default function IconButton(props) {
  const {
    icon, name, tooltip, placement = 'topLeft',
    dataType, hidden, type = 'link', disabled, disabledToolTip, iconStyle, ...other
  } = props;
  if (hidden) {
    return <></>;
  }
  return (
    <Tooltip placement={placement} title={(disabled && disabledToolTip) ? disabledToolTip : tooltip}>
      <Button
        type={type}
        disabled={disabled}
        data-type={dataType}
        icon={icon && <Icon icon={icon} style={iconStyle}/>}
        {...other}
      >
        <span style={{ paddingLeft: icon && name ? 4 : 0 }} data-type={dataType}>
          {name}
        </span>
      </Button>
    </Tooltip>
  );
}

export const IconButtonConfig = {
  icon: 'home',
  name: '首页',
  type: 'primary'
}
