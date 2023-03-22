import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer } from '../config-provider';
const Group = props => (<ConfigConsumer>
    {({ getPrefixCls }) => {
    const { prefixCls: customizePrefixCls, className = '' } = props;
    const prefixCls = getPrefixCls('input-group', customizePrefixCls);
    const cls = classNames(prefixCls, {
        [`${prefixCls}-lg`]: props.size === 'large',
        [`${prefixCls}-sm`]: props.size === 'small',
        [`${prefixCls}-compact`]: props.compact,
    }, className);
    return (<span className={cls} style={props.style} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} onFocus={props.onFocus} onBlur={props.onBlur}>
          {props.children}
        </span>);
}}
  </ConfigConsumer>);
export default Group;
