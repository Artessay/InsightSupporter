import * as React from 'react';
import { Circle as RCCircle } from 'rc-progress';
import classNames from 'classnames';
import { validProgress } from './utils';
const statusColorMap = {
    normal: '#108ee9',
    exception: '#ff5500',
    success: '#87d068',
};
function getPercentage({ percent, successPercent }) {
    const ptg = validProgress(percent);
    if (!successPercent) {
        return ptg;
    }
    const successPtg = validProgress(successPercent);
    return [successPercent, validProgress(ptg - successPtg)];
}
function getStrokeColor({ progressStatus, successPercent, strokeColor }) {
    const color = strokeColor || statusColorMap[progressStatus];
    if (!successPercent) {
        return color;
    }
    return [statusColorMap.success, color];
}
const Circle = props => {
    const { prefixCls, width, strokeWidth, trailColor, strokeLinecap, gapPosition, gapDegree, type, children, } = props;
    const circleSize = width || 120;
    const circleStyle = {
        width: circleSize,
        height: circleSize,
        fontSize: circleSize * 0.15 + 6,
    };
    const circleWidth = strokeWidth || 6;
    const gapPos = gapPosition || (type === 'dashboard' && 'bottom') || 'top';
    const gapDeg = gapDegree || (type === 'dashboard' ? 75 : undefined);
    const strokeColor = getStrokeColor(props);
    const isGradient = Object.prototype.toString.call(strokeColor) === '[object Object]';
    const wrapperClassName = classNames(`${prefixCls}-inner`, {
        [`${prefixCls}-circle-gradient`]: isGradient,
    });
    return (<div className={wrapperClassName} style={circleStyle}>
      <RCCircle percent={getPercentage(props)} strokeWidth={circleWidth} trailWidth={circleWidth} strokeColor={strokeColor} strokeLinecap={strokeLinecap} trailColor={trailColor} prefixCls={prefixCls} gapDegree={gapDeg} gapPosition={gapPos}/>
      {children}
    </div>);
};
export default Circle;
