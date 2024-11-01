import * as React from 'react';
import Modal, { destroyFns } from './Modal';
import confirm from './confirm';
import Icon from '../icon';
function modalWarn(props) {
    const config = Object.assign({ type: 'warning', icon: <Icon type="exclamation-circle"/>, okCancel: false }, props);
    return confirm(config);
}
Modal.info = function infoFn(props) {
    const config = Object.assign({ type: 'info', icon: <Icon type="info-circle"/>, okCancel: false }, props);
    return confirm(config);
};
Modal.success = function successFn(props) {
    const config = Object.assign({ type: 'success', icon: <Icon type="check-circle"/>, okCancel: false }, props);
    return confirm(config);
};
Modal.error = function errorFn(props) {
    const config = Object.assign({ type: 'error', icon: <Icon type="close-circle"/>, okCancel: false }, props);
    return confirm(config);
};
Modal.warning = modalWarn;
Modal.warn = modalWarn;
Modal.confirm = function confirmFn(props) {
    const config = Object.assign({ type: 'confirm', okCancel: true }, props);
    return confirm(config);
};
Modal.destroyAll = function destroyAllFn() {
    while (destroyFns.length) {
        const close = destroyFns.pop();
        if (close) {
            close();
        }
    }
};
export default Modal;
