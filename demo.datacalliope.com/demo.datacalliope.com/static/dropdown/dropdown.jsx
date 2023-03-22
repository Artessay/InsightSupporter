import * as React from 'react';
import RcDropdown from 'rc-dropdown';
import classNames from 'classnames';
import { ConfigConsumer } from '../config-provider';
import warning from '../_util/warning';
import Icon from '../icon';
import { tuple } from '../_util/type';
const Placements = tuple('topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight');
export default class Dropdown extends React.Component {
    constructor() {
        super(...arguments);
        this.renderOverlay = (prefixCls) => {
            // rc-dropdown already can process the function of overlay, but we have check logic here.
            // So we need render the element to check and pass back to rc-dropdown.
            const { overlay } = this.props;
            let overlayNode;
            if (typeof overlay === 'function') {
                overlayNode = overlay();
            }
            else {
                overlayNode = overlay;
            }
            overlayNode = React.Children.only(overlayNode);
            const overlayProps = overlayNode.props;
            // Warning if use other mode
            warning(!overlayProps.mode || overlayProps.mode === 'vertical', 'Dropdown', `mode="${overlayProps.mode}" is not supported for Dropdown's Menu.`);
            // menu cannot be selectable in dropdown defaultly
            // menu should be focusable in dropdown defaultly
            const { selectable = false, focusable = true } = overlayProps;
            const expandIcon = (<span className={`${prefixCls}-menu-submenu-arrow`}>
        <Icon type="right" className={`${prefixCls}-menu-submenu-arrow-icon`}/>
      </span>);
            const fixedModeOverlay = typeof overlayNode.type === 'string'
                ? overlay
                : React.cloneElement(overlayNode, {
                    mode: 'vertical',
                    selectable,
                    focusable,
                    expandIcon,
                });
            return fixedModeOverlay;
        };
        this.renderDropDown = ({ getPopupContainer: getContextPopupContainer, getPrefixCls, }) => {
            const { prefixCls: customizePrefixCls, children, trigger, disabled, getPopupContainer, } = this.props;
            const prefixCls = getPrefixCls('dropdown', customizePrefixCls);
            const child = React.Children.only(children);
            const dropdownTrigger = React.cloneElement(child, {
                className: classNames(child.props.className, `${prefixCls}-trigger`),
                disabled,
            });
            const triggerActions = disabled ? [] : trigger;
            let alignPoint;
            if (triggerActions && triggerActions.indexOf('contextMenu') !== -1) {
                alignPoint = true;
            }
            return (<RcDropdown alignPoint={alignPoint} {...this.props} prefixCls={prefixCls} getPopupContainer={getPopupContainer || getContextPopupContainer} transitionName={this.getTransitionName()} trigger={triggerActions} overlay={() => this.renderOverlay(prefixCls)}>
        {dropdownTrigger}
      </RcDropdown>);
        };
    }
    getTransitionName() {
        const { placement = '', transitionName } = this.props;
        if (transitionName !== undefined) {
            return transitionName;
        }
        if (placement.indexOf('top') >= 0) {
            return 'slide-down';
        }
        return 'slide-up';
    }
    render() {
        return <ConfigConsumer>{this.renderDropDown}</ConfigConsumer>;
    }
}
Dropdown.defaultProps = {
    mouseEnterDelay: 0.15,
    mouseLeaveDelay: 0.1,
    placement: 'bottomLeft',
};
