import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import ResizeObserver from 'rc-resize-observer';
import omit from 'omit.js';
import classNames from 'classnames';
import calculateNodeHeight from './calculateNodeHeight';
import raf from '../_util/raf';
import warning from '../_util/warning';
class ResizableTextArea extends React.Component {
    constructor(props) {
        super(props);
        this.saveTextArea = (textArea) => {
            this.textArea = textArea;
        };
        this.resizeOnNextFrame = () => {
            raf.cancel(this.nextFrameActionId);
            this.nextFrameActionId = raf(this.resizeTextarea);
        };
        this.resizeTextarea = () => {
            const autoSize = this.props.autoSize || this.props.autosize;
            if (!autoSize || !this.textArea) {
                return;
            }
            const { minRows, maxRows } = autoSize;
            const textareaStyles = calculateNodeHeight(this.textArea, false, minRows, maxRows);
            this.setState({ textareaStyles, resizing: true }, () => {
                raf.cancel(this.resizeFrameId);
                this.resizeFrameId = raf(() => {
                    this.setState({ resizing: false });
                });
            });
        };
        this.renderTextArea = () => {
            const { prefixCls, autoSize, autosize, className, disabled } = this.props;
            const { textareaStyles, resizing } = this.state;
            warning(autosize === undefined, 'Input.TextArea', 'autosize is deprecated, please use autoSize instead.');
            const otherProps = omit(this.props, [
                'prefixCls',
                'onPressEnter',
                'autoSize',
                'autosize',
                'defaultValue',
                'allowClear',
            ]);
            const cls = classNames(prefixCls, className, {
                [`${prefixCls}-disabled`]: disabled,
            });
            // Fix https://github.com/ant-design/ant-design/issues/6776
            // Make sure it could be reset when using form.getFieldDecorator
            if ('value' in otherProps) {
                otherProps.value = otherProps.value || '';
            }
            const style = Object.assign(Object.assign(Object.assign({}, this.props.style), textareaStyles), (resizing ? { overflow: 'hidden' } : null));
            return (<ResizeObserver onResize={this.resizeOnNextFrame} disabled={!(autoSize || autosize)}>
        <textarea {...otherProps} className={cls} style={style} ref={this.saveTextArea}/>
      </ResizeObserver>);
        };
        this.state = {
            textareaStyles: {},
            resizing: false,
        };
    }
    componentDidMount() {
        this.resizeTextarea();
    }
    componentDidUpdate(prevProps) {
        // Re-render with the new content then recalculate the height as required.
        if (prevProps.value !== this.props.value) {
            this.resizeTextarea();
        }
    }
    componentWillUnmount() {
        raf.cancel(this.nextFrameActionId);
        raf.cancel(this.resizeFrameId);
    }
    render() {
        return this.renderTextArea();
    }
}
polyfill(ResizableTextArea);
export default ResizableTextArea;
