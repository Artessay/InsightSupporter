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
/**
 * Wrap of sub component which need use as Button capacity (like Icon component).
 * This helps accessibility reader to tread as a interactive button to operation.
 */
import * as React from 'react';
import KeyCode from 'rc-util/lib/KeyCode';
const inlineStyle = {
    border: 0,
    background: 'transparent',
    padding: 0,
    lineHeight: 'inherit',
    display: 'inline-block',
};
class TransButton extends React.Component {
    constructor() {
        super(...arguments);
        this.onKeyDown = event => {
            const { keyCode } = event;
            if (keyCode === KeyCode.ENTER) {
                event.preventDefault();
            }
        };
        this.onKeyUp = event => {
            const { keyCode } = event;
            const { onClick } = this.props;
            if (keyCode === KeyCode.ENTER && onClick) {
                onClick();
            }
        };
        this.setRef = (btn) => {
            this.div = btn;
        };
    }
    focus() {
        if (this.div) {
            this.div.focus();
        }
    }
    blur() {
        if (this.div) {
            this.div.blur();
        }
    }
    render() {
        const _a = this.props, { style, noStyle } = _a, restProps = __rest(_a, ["style", "noStyle"]);
        return (<div role="button" tabIndex={0} ref={this.setRef} {...restProps} onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp} style={Object.assign(Object.assign({}, (!noStyle ? inlineStyle : null)), style)}/>);
    }
}
export default TransButton;
