import * as React from 'react';
import * as PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import omit from 'omit.js';
import { tuple } from '../_util/type';
import ClearableLabeledInput, { hasPrefixSuffix } from './ClearableLabeledInput';
import { ConfigConsumer } from '../config-provider';
import warning from '../_util/warning';
export const InputSizes = tuple('small', 'default', 'large');
export function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}
export function resolveOnChange(target, e, onChange) {
    if (onChange) {
        let event = e;
        if (e.type === 'click') {
            // click clear icon
            event = Object.create(e);
            event.target = target;
            event.currentTarget = target;
            const originalInputValue = target.value;
            // change target ref value cause e.target.value should be '' when clear input
            target.value = '';
            onChange(event);
            // reset target ref value
            target.value = originalInputValue;
            return;
        }
        onChange(event);
    }
}
export function getInputClassName(prefixCls, size, disabled) {
    return classNames(prefixCls, {
        [`${prefixCls}-sm`]: size === 'small',
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-disabled`]: disabled,
    });
}
class Input extends React.Component {
    constructor(props) {
        super(props);
        this.saveClearableInput = (input) => {
            this.clearableInput = input;
        };
        this.saveInput = (input) => {
            this.input = input;
        };
        this.handleReset = (e) => {
            this.setValue('', () => {
                this.focus();
            });
            resolveOnChange(this.input, e, this.props.onChange);
        };
        this.renderInput = (prefixCls) => {
            const { className, addonBefore, addonAfter, size, disabled } = this.props;
            // Fix https://fb.me/react-unknown-prop
            const otherProps = omit(this.props, [
                'prefixCls',
                'onPressEnter',
                'addonBefore',
                'addonAfter',
                'prefix',
                'suffix',
                'allowClear',
                // Input elements must be either controlled or uncontrolled,
                // specify either the value prop, or the defaultValue prop, but not both.
                'defaultValue',
                'size',
                'inputType',
            ]);
            return (<input {...otherProps} onChange={this.handleChange} onKeyDown={this.handleKeyDown} className={classNames(getInputClassName(prefixCls, size, disabled), {
                [className]: className && !addonBefore && !addonAfter,
            })} ref={this.saveInput}/>);
        };
        this.handleChange = (e) => {
            this.setValue(e.target.value);
            resolveOnChange(this.input, e, this.props.onChange);
        };
        this.handleKeyDown = (e) => {
            const { onPressEnter, onKeyDown } = this.props;
            if (e.keyCode === 13 && onPressEnter) {
                onPressEnter(e);
            }
            if (onKeyDown) {
                onKeyDown(e);
            }
        };
        this.renderComponent = ({ getPrefixCls }) => {
            const { value } = this.state;
            const { prefixCls: customizePrefixCls } = this.props;
            const prefixCls = getPrefixCls('input', customizePrefixCls);
            return (<ClearableLabeledInput {...this.props} prefixCls={prefixCls} inputType="input" value={fixControlledValue(value)} element={this.renderInput(prefixCls)} handleReset={this.handleReset} ref={this.saveClearableInput}/>);
        };
        const value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
        this.state = {
            value,
        };
    }
    static getDerivedStateFromProps(nextProps) {
        if ('value' in nextProps) {
            return {
                value: nextProps.value,
            };
        }
        return null;
    }
    // Since polyfill `getSnapshotBeforeUpdate` need work with `componentDidUpdate`.
    // We keep an empty function here.
    componentDidUpdate() { }
    getSnapshotBeforeUpdate(prevProps) {
        if (hasPrefixSuffix(prevProps) !== hasPrefixSuffix(this.props)) {
            warning(this.input !== document.activeElement, 'Input', `When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ`);
        }
        return null;
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
    setValue(value, callback) {
        if (!('value' in this.props)) {
            this.setState({ value }, callback);
        }
    }
    render() {
        return <ConfigConsumer>{this.renderComponent}</ConfigConsumer>;
    }
}
Input.defaultProps = {
    type: 'text',
};
Input.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    size: PropTypes.oneOf(InputSizes),
    maxLength: PropTypes.number,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    className: PropTypes.string,
    addonBefore: PropTypes.node,
    addonAfter: PropTypes.node,
    prefixCls: PropTypes.string,
    onPressEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    allowClear: PropTypes.bool,
};
polyfill(Input);
export default Input;
