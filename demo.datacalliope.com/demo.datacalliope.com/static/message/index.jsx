import * as React from 'react';
import Notification from 'rc-notification';
import Icon from '../icon';
let defaultDuration = 3;
let defaultTop;
let messageInstance;
let key = 1;
let prefixCls = 'ant-message';
let transitionName = 'move-up';
let getContainer;
let maxCount;
function getMessageInstance(callback) {
    if (messageInstance) {
        callback(messageInstance);
        return;
    }
    Notification.newInstance({
        prefixCls,
        transitionName,
        style: { top: defaultTop },
        getContainer,
        maxCount,
    }, (instance) => {
        if (messageInstance) {
            callback(messageInstance);
            return;
        }
        messageInstance = instance;
        callback(instance);
    });
}
function notice(args) {
    const duration = args.duration !== undefined ? args.duration : defaultDuration;
    const iconType = {
        info: 'info-circle',
        success: 'check-circle',
        error: 'close-circle',
        warning: 'exclamation-circle',
        loading: 'loading',
    }[args.type];
    const target = args.key || key++;
    const closePromise = new Promise(resolve => {
        const callback = () => {
            if (typeof args.onClose === 'function') {
                args.onClose();
            }
            return resolve(true);
        };
        getMessageInstance(instance => {
            const iconNode = (<Icon type={iconType} theme={iconType === 'loading' ? 'outlined' : 'filled'}/>);
            const switchIconNode = iconType ? iconNode : '';
            instance.notice({
                key: target,
                duration,
                style: {},
                content: (<div className={`${prefixCls}-custom-content${args.type ? ` ${prefixCls}-${args.type}` : ''}`}>
            {args.icon ? args.icon : switchIconNode}
            <span>{args.content}</span>
          </div>),
                onClose: callback,
            });
        });
    });
    const result = () => {
        if (messageInstance) {
            messageInstance.removeNotice(target);
        }
    };
    result.then = (filled, rejected) => closePromise.then(filled, rejected);
    result.promise = closePromise;
    return result;
}
function isArgsProps(content) {
    return typeof content === 'object' && !!content.content;
}
const api = {
    open: notice,
    config(options) {
        if (options.top !== undefined) {
            defaultTop = options.top;
            messageInstance = null; // delete messageInstance for new defaultTop
        }
        if (options.duration !== undefined) {
            defaultDuration = options.duration;
        }
        if (options.prefixCls !== undefined) {
            prefixCls = options.prefixCls;
        }
        if (options.getContainer !== undefined) {
            getContainer = options.getContainer;
        }
        if (options.transitionName !== undefined) {
            transitionName = options.transitionName;
            messageInstance = null; // delete messageInstance for new transitionName
        }
        if (options.maxCount !== undefined) {
            maxCount = options.maxCount;
            messageInstance = null;
        }
    },
    destroy() {
        if (messageInstance) {
            messageInstance.destroy();
            messageInstance = null;
        }
    },
};
['success', 'info', 'warning', 'error', 'loading'].forEach(type => {
    api[type] = (content, duration, onClose) => {
        if (isArgsProps(content)) {
            return api.open(Object.assign(Object.assign({}, content), { type }));
        }
        if (typeof duration === 'function') {
            onClose = duration;
            duration = undefined;
        }
        return api.open({ content, duration, type, onClose });
    };
});
api.warn = api.warning;
export default api;
