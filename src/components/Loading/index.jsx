import { Spin } from "antd";
import style from "./index.module.less";

/**
 * @description Loading
 * @param props direction loading ...ext
 * @returns {JSX.Element}
 * @constructor
 */
export default function Loading(props) {
  const { loading, direction = "column", children, ...ext } = props;
  const name = `custom-loading-${direction}`;
  return (
    <div className={style.loadingWrap}>
      <Spin spinning={loading} {...ext} wrapperClassName={name}>
        {children}
      </Spin>
    </div>
  );
}

export const LoadingConfig = {
  loading: true,
  children: <span>children</span>
}
