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
import * as React from 'react';
import Checkbox from '../checkbox';
import Radio from '../radio';
export default class SelectionBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.getCheckState(props),
        };
    }
    componentDidMount() {
        this.subscribe();
    }
    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
    // eslint-disable-next-line class-methods-use-this
    getCheckState(props) {
        const { store, defaultSelection, rowIndex } = props;
        let checked = false;
        if (store.getState().selectionDirty) {
            checked = store.getState().selectedRowKeys.indexOf(rowIndex) >= 0;
        }
        else {
            checked =
                store.getState().selectedRowKeys.indexOf(rowIndex) >= 0 ||
                    defaultSelection.indexOf(rowIndex) >= 0;
        }
        return checked;
    }
    subscribe() {
        const { store } = this.props;
        this.unsubscribe = store.subscribe(() => {
            const checked = this.getCheckState(this.props);
            this.setState({ checked });
        });
    }
    render() {
        const _a = this.props, { type, rowIndex } = _a, rest = __rest(_a, ["type", "rowIndex"]);
        const { checked } = this.state;
        if (type === 'radio') {
            return <Radio checked={checked} value={rowIndex} {...rest}/>;
        }
        return <Checkbox checked={checked} {...rest}/>;
    }
}
