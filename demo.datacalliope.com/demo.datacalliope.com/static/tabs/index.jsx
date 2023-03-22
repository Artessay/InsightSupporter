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
import * as ReactDOM from 'react-dom';
import RcTabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import classNames from 'classnames';
import omit from 'omit.js';
import TabBar from './TabBar';
import Icon from '../icon';
import { ConfigConsumer } from '../config-provider';
import warning from '../_util/warning';
import { isFlexSupported } from '../_util/styleChecker';
export default class Tabs extends React.Component {
    constructor() {
        super(...arguments);
        this.removeTab = (targetKey, e) => {
            e.stopPropagation();
            if (!targetKey) {
                return;
            }
            const { onEdit } = this.props;
            if (onEdit) {
                onEdit(targetKey, 'remove');
            }
        };
        this.handleChange = (activeKey) => {
            const { onChange } = this.props;
            if (onChange) {
                onChange(activeKey);
            }
        };
        this.createNewTab = (targetKey) => {
            const { onEdit } = this.props;
            if (onEdit) {
                onEdit(targetKey, 'add');
            }
        };
        this.renderTabs = ({ getPrefixCls }) => {
            const { prefixCls: customizePrefixCls, className = '', size, type = 'line', tabPosition, children, animated = true, hideAdd, } = this.props;
            let { tabBarExtraContent } = this.props;
            let tabPaneAnimated = typeof animated === 'object' ? animated.tabPane : animated;
            // card tabs should not have animation
            if (type !== 'line') {
                tabPaneAnimated = 'animated' in this.props ? tabPaneAnimated : false;
            }
            warning(!(type.indexOf('card') >= 0 && (size === 'small' || size === 'large')), 'Tabs', "`type=card|editable-card` doesn't have small or large size, it's by design.");
            const prefixCls = getPrefixCls('tabs', customizePrefixCls);
            const cls = classNames(className, {
                [`${prefixCls}-vertical`]: tabPosition === 'left' || tabPosition === 'right',
                [`${prefixCls}-${size}`]: !!size,
                [`${prefixCls}-card`]: type.indexOf('card') >= 0,
                [`${prefixCls}-${type}`]: true,
                [`${prefixCls}-no-animation`]: !tabPaneAnimated,
            });
            // only card type tabs can be added and closed
            let childrenWithClose = [];
            if (type === 'editable-card') {
                childrenWithClose = [];
                React.Children.forEach(children, (child, index) => {
                    if (!React.isValidElement(child))
                        return child;
                    let { closable } = child.props;
                    closable = typeof closable === 'undefined' ? true : closable;
                    const closeIcon = closable ? (<Icon type="close" className={`${prefixCls}-close-x`} onClick={e => this.removeTab(child.key, e)}/>) : null;
                    childrenWithClose.push(React.cloneElement(child, {
                        tab: (<div className={closable ? undefined : `${prefixCls}-tab-unclosable`}>
                {child.props.tab}
                {closeIcon}
              </div>),
                        key: child.key || index,
                    }));
                });
                // Add new tab handler
                if (!hideAdd) {
                    tabBarExtraContent = (<span>
            <Icon type="plus" className={`${prefixCls}-new-tab`} onClick={this.createNewTab}/>
            {tabBarExtraContent}
          </span>);
                }
            }
            tabBarExtraContent = tabBarExtraContent ? (<div className={`${prefixCls}-extra-content`}>{tabBarExtraContent}</div>) : null;
            const tabBarProps = __rest(this.props, []);
            const contentCls = classNames(`${prefixCls}-${tabPosition}-content`, type.indexOf('card') >= 0 && `${prefixCls}-card-content`);
            return (<RcTabs {...this.props} prefixCls={prefixCls} className={cls} tabBarPosition={tabPosition} renderTabBar={() => (<TabBar {...omit(tabBarProps, ['className'])} tabBarExtraContent={tabBarExtraContent}/>)} renderTabContent={() => (<TabContent className={contentCls} animated={tabPaneAnimated} animatedWithMargin/>)} onChange={this.handleChange}>
        {childrenWithClose.length > 0 ? childrenWithClose : children}
      </RcTabs>);
        };
    }
    componentDidMount() {
        const NO_FLEX = ' no-flex';
        const tabNode = ReactDOM.findDOMNode(this);
        if (tabNode && !isFlexSupported && tabNode.className.indexOf(NO_FLEX) === -1) {
            tabNode.className += NO_FLEX;
        }
    }
    render() {
        return <ConfigConsumer>{this.renderTabs}</ConfigConsumer>;
    }
}
Tabs.TabPane = TabPane;
Tabs.defaultProps = {
    hideAdd: false,
    tabPosition: 'top',
};
