// ================== Collapse Motion ==================
const getCollapsedHeight = () => ({ height: 0, opacity: 0 });
const getRealHeight = node => ({ height: node.scrollHeight, opacity: 1 });
const getCurrentHeight = node => ({ height: node.offsetHeight });
const collapseMotion = {
    motionName: 'ant-motion-collapse',
    onAppearStart: getCollapsedHeight,
    onEnterStart: getCollapsedHeight,
    onAppearActive: getRealHeight,
    onEnterActive: getRealHeight,
    onLeaveStart: getCurrentHeight,
    onLeaveActive: getCollapsedHeight,
};
export default collapseMotion;
