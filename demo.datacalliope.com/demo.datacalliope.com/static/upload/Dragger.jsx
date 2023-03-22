import * as React from 'react';
import Upload from './Upload';
// stick class comoponent to avoid React ref warning inside Form
// https://github.com/ant-design/ant-design/issues/18707
// eslint-disable-next-line react/prefer-stateless-function
export default class Dragger extends React.Component {
    render() {
        const { props } = this;
        return <Upload {...props} type="drag" style={Object.assign(Object.assign({}, props.style), { height: props.height })}/>;
    }
}
