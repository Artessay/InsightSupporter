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
import RcPagination from 'rc-pagination';
import enUS from 'rc-pagination/lib/locale/en_US';
import classNames from 'classnames';
import MiniSelect from './MiniSelect';
import Icon from '../icon';
import Select from '../select';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { ConfigConsumer } from '../config-provider';
export default class Pagination extends React.Component {
    constructor() {
        super(...arguments);
        this.getIconsProps = (prefixCls) => {
            const prevIcon = (<a className={`${prefixCls}-item-link`}>
        <Icon type="left"/>
      </a>);
            const nextIcon = (<a className={`${prefixCls}-item-link`}>
        <Icon type="right"/>
      </a>);
            const jumpPrevIcon = (<a className={`${prefixCls}-item-link`}>
        
        <div className={`${prefixCls}-item-container`}>
          <Icon className={`${prefixCls}-item-link-icon`} type="double-left"/>
          <span className={`${prefixCls}-item-ellipsis`}>•••</span>
        </div>
      </a>);
            const jumpNextIcon = (<a className={`${prefixCls}-item-link`}>
        
        <div className={`${prefixCls}-item-container`}>
          <Icon className={`${prefixCls}-item-link-icon`} type="double-right"/>
          <span className={`${prefixCls}-item-ellipsis`}>•••</span>
        </div>
      </a>);
            return {
                prevIcon,
                nextIcon,
                jumpPrevIcon,
                jumpNextIcon,
            };
        };
        this.renderPagination = (contextLocale) => {
            const _a = this.props, { prefixCls: customizePrefixCls, selectPrefixCls: customizeSelectPrefixCls, className, size, locale: customLocale } = _a, restProps = __rest(_a, ["prefixCls", "selectPrefixCls", "className", "size", "locale"]);
            const locale = Object.assign(Object.assign({}, contextLocale), customLocale);
            const isSmall = size === 'small';
            return (<ConfigConsumer>
        {({ getPrefixCls }) => {
                const prefixCls = getPrefixCls('pagination', customizePrefixCls);
                const selectPrefixCls = getPrefixCls('select', customizeSelectPrefixCls);
                return (<RcPagination {...restProps} prefixCls={prefixCls} selectPrefixCls={selectPrefixCls} {...this.getIconsProps(prefixCls)} className={classNames(className, { mini: isSmall })} selectComponentClass={isSmall ? MiniSelect : Select} locale={locale}/>);
            }}
      </ConfigConsumer>);
        };
    }
    render() {
        return (<LocaleReceiver componentName="Pagination" defaultLocale={enUS}>
        {this.renderPagination}
      </LocaleReceiver>);
    }
}
