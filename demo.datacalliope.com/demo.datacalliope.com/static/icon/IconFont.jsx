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
import Icon from './index';
const customCache = new Set();
export default function create(options = {}) {
    const { scriptUrl, extraCommonProps = {} } = options;
    /**
     * DOM API required.
     * Make sure in browser environment.
     * The Custom Icon will create a <script/>
     * that loads SVG symbols and insert the SVG Element into the document body.
     */
    if (typeof document !== 'undefined' &&
        typeof window !== 'undefined' &&
        typeof document.createElement === 'function' &&
        typeof scriptUrl === 'string' &&
        scriptUrl.length &&
        !customCache.has(scriptUrl)) {
        const script = document.createElement('script');
        script.setAttribute('src', scriptUrl);
        script.setAttribute('data-namespace', scriptUrl);
        customCache.add(scriptUrl);
        document.body.appendChild(script);
    }
    const Iconfont = props => {
        const { type, children } = props, restProps = __rest(props, ["type", "children"]);
        // component > children > type
        let content = null;
        if (props.type) {
            content = <use xlinkHref={`#${type}`}/>;
        }
        if (children) {
            content = children;
        }
        return (<Icon {...extraCommonProps} {...restProps}>
        {content}
      </Icon>);
    };
    Iconfont.displayName = 'Iconfont';
    return Iconfont;
}
