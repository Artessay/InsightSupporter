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
import classNames from 'classnames';
import RowContext from './RowContext';
import { ConfigConsumer } from '../config-provider';
const objectOrNumber = PropTypes.oneOfType([PropTypes.object, PropTypes.number]);
export default class Col extends React.Component {
    constructor() {
        super(...arguments);
        this.renderCol = ({ getPrefixCls }) => {
            const { props } = this;
            const { prefixCls: customizePrefixCls, span, order, offset, push, pull, className, children } = props, others = __rest(props, ["prefixCls", "span", "order", "offset", "push", "pull", "className", "children"]);
            const prefixCls = getPrefixCls('col', customizePrefixCls);
            let sizeClassObj = {};
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(size => {
                let sizeProps = {};
                const propSize = props[size];
                if (typeof propSize === 'number') {
                    sizeProps.span = propSize;
                }
                else if (typeof propSize === 'object') {
                    sizeProps = propSize || {};
                }
                delete others[size];
                sizeClassObj = Object.assign(Object.assign({}, sizeClassObj), { [`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined, [`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0, [`${prefixCls}-${size}-offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0, [`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0, [`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0 });
            });
            const classes = classNames(prefixCls, {
                [`${prefixCls}-${span}`]: span !== undefined,
                [`${prefixCls}-order-${order}`]: order,
                [`${prefixCls}-offset-${offset}`]: offset,
                [`${prefixCls}-push-${push}`]: push,
                [`${prefixCls}-pull-${pull}`]: pull,
            }, className, sizeClassObj);
            return (<RowContext.Consumer>
        {({ gutter }) => {
                let { style } = others;
                if (gutter) {
                    style = Object.assign(Object.assign(Object.assign({}, (gutter[0] > 0
                        ? {
                            paddingLeft: gutter[0] / 2,
                            paddingRight: gutter[0] / 2,
                        }
                        : {})), (gutter[1] > 0
                        ? {
                            paddingTop: gutter[1] / 2,
                            paddingBottom: gutter[1] / 2,
                        }
                        : {})), style);
                }
                return (<div {...others} style={style} className={classes}>
              {children}
            </div>);
            }}
      </RowContext.Consumer>);
        };
    }
    render() {
        return <ConfigConsumer>{this.renderCol}</ConfigConsumer>;
    }
}
Col.propTypes = {
    span: PropTypes.number,
    order: PropTypes.number,
    offset: PropTypes.number,
    push: PropTypes.number,
    pull: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.node,
    xs: objectOrNumber,
    sm: objectOrNumber,
    md: objectOrNumber,
    lg: objectOrNumber,
    xl: objectOrNumber,
    xxl: objectOrNumber,
};
