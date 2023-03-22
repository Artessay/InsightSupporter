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
import Radio from './radio';
import { ConfigConsumer } from '../config-provider';
export default class RadioButton extends React.Component {
    constructor() {
        super(...arguments);
        this.renderRadioButton = ({ getPrefixCls }) => {
            const _a = this.props, { prefixCls: customizePrefixCls } = _a, radioProps = __rest(_a, ["prefixCls"]);
            const prefixCls = getPrefixCls('radio-button', customizePrefixCls);
            if (this.context.radioGroup) {
                radioProps.checked = this.props.value === this.context.radioGroup.value;
                radioProps.disabled = this.props.disabled || this.context.radioGroup.disabled;
            }
            return <Radio prefixCls={prefixCls} {...radioProps}/>;
        };
    }
    render() {
        return <ConfigConsumer>{this.renderRadioButton}</ConfigConsumer>;
    }
}
RadioButton.contextTypes = {
    radioGroup: PropTypes.any,
};
