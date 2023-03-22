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
import * as PropTypes from 'prop-types';
import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import Icon from '../icon';
import { ConfigConsumer } from '../config-provider';
import { tuple } from '../_util/type';
import Line from './Line';
import Circle from './Circle';
import { validProgress } from './utils';
const ProgressTypes = tuple('line', 'circle', 'dashboard');
const ProgressStatuses = tuple('normal', 'exception', 'active', 'success');
export default class Progress extends React.Component {
    constructor() {
        super(...arguments);
        this.renderProgress = ({ getPrefixCls }) => {
            const { props } = this;
            const { prefixCls: customizePrefixCls, className, size, type, showInfo } = props, restProps = __rest(props, ["prefixCls", "className", "size", "type", "showInfo"]);
            const prefixCls = getPrefixCls('progress', customizePrefixCls);
            const progressStatus = this.getProgressStatus();
            const progressInfo = this.renderProcessInfo(prefixCls, progressStatus);
            let progress;
            // Render progress shape
            if (type === 'line') {
                progress = (<Line {...this.props} prefixCls={prefixCls}>
          {progressInfo}
        </Line>);
            }
            else if (type === 'circle' || type === 'dashboard') {
                progress = (<Circle {...this.props} prefixCls={prefixCls} progressStatus={progressStatus}>
          {progressInfo}
        </Circle>);
            }
            const classString = classNames(prefixCls, {
                [`${prefixCls}-${(type === 'dashboard' && 'circle') || type}`]: true,
                [`${prefixCls}-status-${progressStatus}`]: true,
                [`${prefixCls}-show-info`]: showInfo,
                [`${prefixCls}-${size}`]: size,
            }, className);
            return (<div {...omit(restProps, [
                'status',
                'format',
                'trailColor',
                'successPercent',
                'strokeWidth',
                'width',
                'gapDegree',
                'gapPosition',
                'strokeColor',
                'strokeLinecap',
                'percent',
            ])} className={classString}>
        {progress}
      </div>);
        };
    }
    getPercentNumber() {
        const { successPercent, percent = 0 } = this.props;
        return parseInt(successPercent !== undefined ? successPercent.toString() : percent.toString(), 10);
    }
    getProgressStatus() {
        const { status } = this.props;
        if (ProgressStatuses.indexOf(status) < 0 && this.getPercentNumber() >= 100) {
            return 'success';
        }
        return status || 'normal';
    }
    renderProcessInfo(prefixCls, progressStatus) {
        const { showInfo, format, type, percent, successPercent } = this.props;
        if (!showInfo)
            return null;
        let text;
        const textFormatter = format || (percentNumber => `${percentNumber}%`);
        const iconType = type === 'circle' || type === 'dashboard' ? '' : '-circle';
        if (format || (progressStatus !== 'exception' && progressStatus !== 'success')) {
            text = textFormatter(validProgress(percent), validProgress(successPercent));
        }
        else if (progressStatus === 'exception') {
            text = <Icon type={`close${iconType}`} theme={type === 'line' ? 'filled' : 'outlined'}/>;
        }
        else if (progressStatus === 'success') {
            text = <Icon type={`check${iconType}`} theme={type === 'line' ? 'filled' : 'outlined'}/>;
        }
        return (<span className={`${prefixCls}-text`} title={typeof text === 'string' ? text : undefined}>
        {text}
      </span>);
    }
    render() {
        return <ConfigConsumer>{this.renderProgress}</ConfigConsumer>;
    }
}
Progress.defaultProps = {
    type: 'line',
    percent: 0,
    showInfo: true,
    trailColor: '#f3f3f3',
    size: 'default',
    gapDegree: 0,
    strokeLinecap: 'round',
};
Progress.propTypes = {
    status: PropTypes.oneOf(ProgressStatuses),
    type: PropTypes.oneOf(ProgressTypes),
    showInfo: PropTypes.bool,
    percent: PropTypes.number,
    width: PropTypes.number,
    strokeWidth: PropTypes.number,
    strokeLinecap: PropTypes.oneOf(['round', 'square']),
    strokeColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    trailColor: PropTypes.string,
    format: PropTypes.func,
    gapDegree: PropTypes.number,
};
