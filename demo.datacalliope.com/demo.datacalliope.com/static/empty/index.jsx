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
import { ConfigConsumer } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import DefaultEmptyImg from './empty';
import SimpleEmptyImg from './simple';
const defaultEmptyImg = <DefaultEmptyImg />;
const simpleEmptyImg = <SimpleEmptyImg />;
const Empty = (props) => (<ConfigConsumer>
    {({ getPrefixCls }) => {
    const { className, prefixCls: customizePrefixCls, image = defaultEmptyImg, description, children, imageStyle } = props, restProps = __rest(props, ["className", "prefixCls", "image", "description", "children", "imageStyle"]);
    return (<LocaleReceiver componentName="Empty">
          {(locale) => {
        const prefixCls = getPrefixCls('empty', customizePrefixCls);
        const des = typeof description !== 'undefined' ? description : locale.description;
        const alt = typeof des === 'string' ? des : 'empty';
        let imageNode = null;
        if (typeof image === 'string') {
            imageNode = <img alt={alt} src={image}/>;
        }
        else {
            imageNode = image;
        }
        return (<div className={classNames(prefixCls, {
            [`${prefixCls}-normal`]: image === simpleEmptyImg,
        }, className)} {...restProps}>
                <div className={`${prefixCls}-image`} style={imageStyle}>
                  {imageNode}
                </div>
                {des && <p className={`${prefixCls}-description`}>{des}</p>}
                {children && <div className={`${prefixCls}-footer`}>{children}</div>}
              </div>);
    }}
        </LocaleReceiver>);
}}
  </ConfigConsumer>);
Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;
export default Empty;
