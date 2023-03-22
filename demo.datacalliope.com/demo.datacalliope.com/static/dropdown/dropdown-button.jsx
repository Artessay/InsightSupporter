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
import Button from '../button';
import { ConfigConsumer } from '../config-provider';
import Dropdown from './dropdown';
import Icon from '../icon';
const ButtonGroup = Button.Group;
export default class DropdownButton extends React.Component {
    constructor() {
        super(...arguments);
        this.renderButton = ({ getPopupContainer: getContextPopupContainer, getPrefixCls, }) => {
            const _a = this.props, { prefixCls: customizePrefixCls, type, disabled, onClick, htmlType, children, className, overlay, trigger, align, visible, onVisibleChange, placement, getPopupContainer, href, icon = <Icon type="ellipsis"/>, title } = _a, restProps = __rest(_a, ["prefixCls", "type", "disabled", "onClick", "htmlType", "children", "className", "overlay", "trigger", "align", "visible", "onVisibleChange", "placement", "getPopupContainer", "href", "icon", "title"]);
            const prefixCls = getPrefixCls('dropdown-button', customizePrefixCls);
            const dropdownProps = {
                align,
                overlay,
                disabled,
                trigger: disabled ? [] : trigger,
                onVisibleChange,
                placement,
                getPopupContainer: getPopupContainer || getContextPopupContainer,
            };
            if ('visible' in this.props) {
                dropdownProps.visible = visible;
            }
            return (<ButtonGroup {...restProps} className={classNames(prefixCls, className)}>
        <Button type={type} disabled={disabled} onClick={onClick} htmlType={htmlType} href={href} title={title}>
          {children}
        </Button>
        <Dropdown {...dropdownProps}>
          <Button type={type}>{icon}</Button>
        </Dropdown>
      </ButtonGroup>);
        };
    }
    render() {
        return <ConfigConsumer>{this.renderButton}</ConfigConsumer>;
    }
}
DropdownButton.defaultProps = {
    placement: 'bottomRight',
    type: 'default',
};
