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
import Input from './Input';
import Icon from '../icon';
import Button from '../button';
import { ConfigConsumer } from '../config-provider';
export default class Search extends React.Component {
    constructor() {
        super(...arguments);
        this.saveInput = (node) => {
            this.input = node;
        };
        this.onChange = (e) => {
            const { onChange, onSearch } = this.props;
            if (e && e.target && e.type === 'click' && onSearch) {
                onSearch(e.target.value, e);
            }
            if (onChange) {
                onChange(e);
            }
        };
        this.onSearch = (e) => {
            const { onSearch, loading, disabled } = this.props;
            if (loading || disabled) {
                return;
            }
            if (onSearch) {
                onSearch(this.input.input.value, e);
            }
            this.input.focus();
        };
        this.renderLoading = (prefixCls) => {
            const { enterButton, size } = this.props;
            if (enterButton) {
                return (<Button className={`${prefixCls}-button`} type="primary" size={size} key="enterButton">
          <Icon type="loading"/>
        </Button>);
            }
            return <Icon className={`${prefixCls}-icon`} type="loading" key="loadingIcon"/>;
        };
        this.renderSuffix = (prefixCls) => {
            const { suffix, enterButton, loading } = this.props;
            if (loading && !enterButton) {
                return [suffix, this.renderLoading(prefixCls)];
            }
            if (enterButton)
                return suffix;
            const icon = (<Icon className={`${prefixCls}-icon`} type="search" key="searchIcon" onClick={this.onSearch}/>);
            if (suffix) {
                return [
                    React.isValidElement(suffix)
                        ? React.cloneElement(suffix, {
                            key: 'suffix',
                        })
                        : null,
                    icon,
                ];
            }
            return icon;
        };
        this.renderAddonAfter = (prefixCls) => {
            const { enterButton, size, disabled, addonAfter, loading } = this.props;
            const btnClassName = `${prefixCls}-button`;
            if (loading && enterButton) {
                return [this.renderLoading(prefixCls), addonAfter];
            }
            if (!enterButton)
                return addonAfter;
            let button;
            const enterButtonAsElement = enterButton;
            const isAntdButton = enterButtonAsElement.type &&
                enterButtonAsElement.type.__ANT_BUTTON === true;
            if (isAntdButton || enterButtonAsElement.type === 'button') {
                button = React.cloneElement(enterButtonAsElement, Object.assign({ onClick: this.onSearch, key: 'enterButton' }, (isAntdButton
                    ? {
                        className: btnClassName,
                        size,
                    }
                    : {})));
            }
            else {
                button = (<Button className={btnClassName} type="primary" size={size} disabled={disabled} key="enterButton" onClick={this.onSearch}>
          {enterButton === true ? <Icon type="search"/> : enterButton}
        </Button>);
            }
            if (addonAfter) {
                return [
                    button,
                    React.isValidElement(addonAfter)
                        ? React.cloneElement(addonAfter, {
                            key: 'addonAfter',
                        })
                        : null,
                ];
            }
            return button;
        };
        this.renderSearch = ({ getPrefixCls }) => {
            const _a = this.props, { prefixCls: customizePrefixCls, inputPrefixCls: customizeInputPrefixCls, size, enterButton, className } = _a, restProps = __rest(_a, ["prefixCls", "inputPrefixCls", "size", "enterButton", "className"]);
            delete restProps.onSearch;
            delete restProps.loading;
            const prefixCls = getPrefixCls('input-search', customizePrefixCls);
            const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
            let inputClassName;
            if (enterButton) {
                inputClassName = classNames(prefixCls, className, {
                    [`${prefixCls}-enter-button`]: !!enterButton,
                    [`${prefixCls}-${size}`]: !!size,
                });
            }
            else {
                inputClassName = classNames(prefixCls, className);
            }
            return (<Input onPressEnter={this.onSearch} {...restProps} size={size} prefixCls={inputPrefixCls} addonAfter={this.renderAddonAfter(prefixCls)} suffix={this.renderSuffix(prefixCls)} onChange={this.onChange} ref={this.saveInput} className={inputClassName}/>);
        };
    }
    focus() {
        this.input.focus();
    }
    blur() {
        this.input.blur();
    }
    render() {
        return <ConfigConsumer>{this.renderSearch}</ConfigConsumer>;
    }
}
Search.defaultProps = {
    enterButton: false,
};
