import * as React from 'react';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import classNames from 'classnames';
import Icon from '../icon';
export default class TabBar extends React.Component {
    render() {
        const { tabBarStyle, animated, renderTabBar, tabBarExtraContent, tabPosition, prefixCls, className, size, type, } = this.props;
        const inkBarAnimated = typeof animated === 'object' ? animated.inkBar : animated;
        const isVertical = tabPosition === 'left' || tabPosition === 'right';
        const prevIconType = isVertical ? 'up' : 'left';
        const nextIconType = isVertical ? 'down' : 'right';
        const prevIcon = (<span className={`${prefixCls}-tab-prev-icon`}>
        <Icon type={prevIconType} className={`${prefixCls}-tab-prev-icon-target`}/>
      </span>);
        const nextIcon = (<span className={`${prefixCls}-tab-next-icon`}>
        <Icon type={nextIconType} className={`${prefixCls}-tab-next-icon-target`}/>
      </span>);
        // Additional className for style usage
        const cls = classNames(`${prefixCls}-${tabPosition}-bar`, {
            [`${prefixCls}-${size}-bar`]: !!size,
            [`${prefixCls}-card-bar`]: type && type.indexOf('card') >= 0,
        }, className);
        const renderProps = Object.assign(Object.assign({}, this.props), { children: null, inkBarAnimated, extraContent: tabBarExtraContent, style: tabBarStyle, prevIcon,
            nextIcon, className: cls });
        let RenderTabBar;
        if (renderTabBar) {
            RenderTabBar = renderTabBar(renderProps, ScrollableInkTabBar);
        }
        else {
            RenderTabBar = <ScrollableInkTabBar {...renderProps}/>;
        }
        return React.cloneElement(RenderTabBar);
    }
}
TabBar.defaultProps = {
    animated: true,
    type: 'line',
};
