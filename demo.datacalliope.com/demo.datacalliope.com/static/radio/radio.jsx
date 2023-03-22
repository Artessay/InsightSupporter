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
import * as PropTypes from 'prop-types';
import RcCheckbox from 'rc-checkbox';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import { ConfigConsumer } from '../config-provider';
export default class Radio extends React.Component {
    constructor() {
        super(...arguments);
        this.saveCheckbox = (node) => {
            this.rcCheckbox = node;
        };
        this.onChange = (e) => {
            if (this.props.onChange) {
                this.props.onChange(e);
            }
            if (this.context.radioGroup && this.context.radioGroup.onChange) {
                this.context.radioGroup.onChange(e);
            }
        };
        this.renderRadio = ({ getPrefixCls }) => {
            const { props, context } = this;
            const { prefixCls: customizePrefixCls, className, children, style } = props, restProps = __rest(props, ["prefixCls", "className", "children", "style"]);
            const { radioGroup } = context;
            const prefixCls = getPrefixCls('radio', customizePrefixCls);
            const radioProps = Object.assign({}, restProps);
            if (radioGroup) {
                radioProps.name = radioGroup.name;
                radioProps.onChange = this.onChange;
                radioProps.checked = props.value === radioGroup.value;
                radioProps.disabled = props.disabled || radioGroup.disabled;
            }
            const wrapperClassString = classNames(className, {
                [`${prefixCls}-wrapper`]: true,
                [`${prefixCls}-wrapper-checked`]: radioProps.checked,
                [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
            });
            return (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label className={wrapperClassString} style={style} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
        <RcCheckbox {...radioProps} prefixCls={prefixCls} ref={this.saveCheckbox}/>
        {children !== undefined ? <span>{children}</span> : null}
      </label>);
        };
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (!shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState) ||
            !shallowEqual(this.context.radioGroup, nextContext.radioGroup));
    }
    focus() {
        this.rcCheckbox.focus();
    }
    blur() {
        this.rcCheckbox.blur();
    }
    render() {
        return <ConfigConsumer>{this.renderRadio}</ConfigConsumer>;
    }
}
Radio.defaultProps = {
    type: 'radio',
};
Radio.contextTypes = {
    radioGroup: PropTypes.any,
};
