import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import { polyfill } from 'react-lifecycles-compat';
import Radio from './radio';
import { ConfigConsumer } from '../config-provider';
function getCheckedValue(children) {
    let value = null;
    let matched = false;
    React.Children.forEach(children, (radio) => {
        if (radio && radio.props && radio.props.checked) {
            value = radio.props.value;
            matched = true;
        }
    });
    return matched ? { value } : undefined;
}
class RadioGroup extends React.Component {
    constructor(props) {
        super(props);
        this.onRadioChange = (ev) => {
            const lastValue = this.state.value;
            const { value } = ev.target;
            if (!('value' in this.props)) {
                this.setState({
                    value,
                });
            }
            const { onChange } = this.props;
            if (onChange && value !== lastValue) {
                onChange(ev);
            }
        };
        this.renderGroup = ({ getPrefixCls }) => {
            const { props } = this;
            const { prefixCls: customizePrefixCls, className = '', options, buttonStyle } = props;
            const prefixCls = getPrefixCls('radio', customizePrefixCls);
            const groupPrefixCls = `${prefixCls}-group`;
            const classString = classNames(groupPrefixCls, `${groupPrefixCls}-${buttonStyle}`, {
                [`${groupPrefixCls}-${props.size}`]: props.size,
            }, className);
            let { children } = props;
            // 如果存在 options, 优先使用
            if (options && options.length > 0) {
                children = options.map(option => {
                    if (typeof option === 'string') {
                        // 此处类型自动推导为 string
                        return (<Radio key={option} prefixCls={prefixCls} disabled={this.props.disabled} value={option} checked={this.state.value === option}>
              {option}
            </Radio>);
                    }
                    // 此处类型自动推导为 { label: string value: string }
                    return (<Radio key={`radio-group-value-options-${option.value}`} prefixCls={prefixCls} disabled={option.disabled || this.props.disabled} value={option.value} checked={this.state.value === option.value}>
            {option.label}
          </Radio>);
                });
            }
            return (<div className={classString} style={props.style} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} id={props.id}>
        {children}
      </div>);
        };
        let value;
        if ('value' in props) {
            value = props.value;
        }
        else if ('defaultValue' in props) {
            value = props.defaultValue;
        }
        else {
            const checkedValue = getCheckedValue(props.children);
            value = checkedValue && checkedValue.value;
        }
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
        const checkedValue = getCheckedValue(nextProps.children);
        if (checkedValue) {
            return {
                value: checkedValue.value,
            };
        }
        return null;
    }
    getChildContext() {
        return {
            radioGroup: {
                onChange: this.onRadioChange,
                value: this.state.value,
                disabled: this.props.disabled,
                name: this.props.name,
            },
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }
    render() {
        return <ConfigConsumer>{this.renderGroup}</ConfigConsumer>;
    }
}
RadioGroup.defaultProps = {
    buttonStyle: 'outline',
};
RadioGroup.childContextTypes = {
    radioGroup: PropTypes.any,
};
polyfill(RadioGroup);
export default RadioGroup;
