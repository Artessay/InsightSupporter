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
import createContext from '@ant-design/create-react-context';
import { ConfigConsumer } from '../config-provider';
export const LayoutContext = createContext({
    siderHook: {
        addSider: () => null,
        removeSider: () => null,
    },
});
function generator({ suffixCls, tagName }) {
    return (BasicComponent) => {
        return class Adapter extends React.Component {
            constructor() {
                super(...arguments);
                this.renderComponent = ({ getPrefixCls }) => {
                    const { prefixCls: customizePrefixCls } = this.props;
                    const prefixCls = getPrefixCls(suffixCls, customizePrefixCls);
                    return <BasicComponent prefixCls={prefixCls} tagName={tagName} {...this.props}/>;
                };
            }
            render() {
                return <ConfigConsumer>{this.renderComponent}</ConfigConsumer>;
            }
        };
    };
}
const Basic = (props) => {
    const { prefixCls, className, children, tagName } = props, others = __rest(props, ["prefixCls", "className", "children", "tagName"]);
    const classString = classNames(className, prefixCls);
    return React.createElement(tagName, Object.assign({ className: classString }, others), children);
};
class BasicLayout extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { siders: [] };
    }
    getSiderHook() {
        return {
            addSider: (id) => {
                this.setState(state => ({
                    siders: [...state.siders, id],
                }));
            },
            removeSider: (id) => {
                this.setState(state => ({
                    siders: state.siders.filter(currentId => currentId !== id),
                }));
            },
        };
    }
    render() {
        const _a = this.props, { prefixCls, className, children, hasSider, tagName: Tag } = _a, others = __rest(_a, ["prefixCls", "className", "children", "hasSider", "tagName"]);
        const classString = classNames(className, prefixCls, {
            [`${prefixCls}-has-sider`]: typeof hasSider === 'boolean' ? hasSider : this.state.siders.length > 0,
        });
        return (<LayoutContext.Provider value={{ siderHook: this.getSiderHook() }}>
        <Tag className={classString} {...others}>
          {children}
        </Tag>
      </LayoutContext.Provider>);
    }
}
const Layout = generator({
    suffixCls: 'layout',
    tagName: 'section',
})(BasicLayout);
const Header = generator({
    suffixCls: 'layout-header',
    tagName: 'header',
})(Basic);
const Footer = generator({
    suffixCls: 'layout-footer',
    tagName: 'footer',
})(Basic);
const Content = generator({
    suffixCls: 'layout-content',
    tagName: 'main',
})(Basic);
Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
export default Layout;
