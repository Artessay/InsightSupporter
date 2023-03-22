import warning, { resetWarned } from 'rc-util/lib/warning';
export { resetWarned };
export default (valid, component, message) => {
    warning(valid, `[antd: ${component}] ${message}`);
};
