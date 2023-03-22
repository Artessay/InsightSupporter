var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer } from '../config-provider';
const ButtonGroup = props => (<ConfigConsumer>
    {({ getPrefixCls }) => {
    const { prefixCls: customizePrefixCls, size, className } = props, others = __rest(props, ["prefixCls", "size", "className"]);
    const prefixCls = getPrefixCls('btn-group', customizePrefixCls);
    // large => lg
    // small => sm
    let sizeCls = '';
    switch (size) {
        case 'large':
            sizeCls = 'lg';
            break;
        case 'small':
            sizeCls = 'sm';
            break;
        default:
            break;
    }
    const classes = classNames(prefixCls, {
        [`${prefixCls}-${sizeCls}`]: sizeCls,
    }, className);
    return <div {...others} className={classes}/>;
}}
  </ConfigConsumer>);
export default ButtonGroup;
