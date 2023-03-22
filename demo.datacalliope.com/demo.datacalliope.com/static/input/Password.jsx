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
import omit from 'omit.js';
import Input from './Input';
import Icon from '../icon';
const ActionMap = {
    click: 'onClick',
    hover: 'onMouseOver',
};
export default class Password extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            visible: false,
        };
        this.onChange = () => {
            const { disabled } = this.props;
            if (disabled) {
                return;
            }
            this.setState(({ visible }) => ({ visible: !visible }));
        };
        this.saveInput = (instance) => {
            if (instance && instance.input) {
                this.input = instance.input;
            }
        };
    }
    getIcon() {
        const { prefixCls, action } = this.props;
        const iconTrigger = ActionMap[action] || '';
        const iconProps = {
            [iconTrigger]: this.onChange,
            className: `${prefixCls}-icon`,
            type: this.state.visible ? 'eye' : 'eye-invisible',
            key: 'passwordIcon',
            onMouseDown: (e) => {
                // Prevent focused state lost
                // https://github.com/ant-design/ant-design/issues/15173
                e.preventDefault();
            },
        };
        return <Icon {...iconProps}/>;
    }
    focus() {
        this.input.focus();
    }
    blur() {
        this.input.blur();
    }
    select() {
        this.input.select();
    }
    render() {
        const _a = this.props, { className, prefixCls, inputPrefixCls, size, visibilityToggle } = _a, restProps = __rest(_a, ["className", "prefixCls", "inputPrefixCls", "size", "visibilityToggle"]);
        const suffixIcon = visibilityToggle && this.getIcon();
        const inputClassName = classNames(prefixCls, className, {
            [`${prefixCls}-${size}`]: !!size,
        });
        return (<Input {...omit(restProps, ['suffix'])} type={this.state.visible ? 'text' : 'password'} size={size} className={inputClassName} prefixCls={inputPrefixCls} suffix={suffixIcon} ref={this.saveInput}/>);
    }
}
Password.defaultProps = {
    inputPrefixCls: 'ant-input',
    prefixCls: 'ant-input-password',
    action: 'click',
    visibilityToggle: true,
};
