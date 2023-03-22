import * as React from 'react';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import Checkbox from '../checkbox';
import Dropdown from '../dropdown';
import Menu from '../menu';
import Icon from '../icon';
function checkSelection({ store, getCheckboxPropsByItem, getRecordKey, data, type, byDefaultChecked, }) {
    return byDefaultChecked
        ? data[type]((item, i) => getCheckboxPropsByItem(item, i).defaultChecked)
        : data[type]((item, i) => store.getState().selectedRowKeys.indexOf(getRecordKey(item, i)) >= 0);
}
function getIndeterminateState(props) {
    const { store, data } = props;
    if (!data.length) {
        return false;
    }
    const someCheckedNotByDefaultChecked = checkSelection(Object.assign(Object.assign({}, props), { data, type: 'some', byDefaultChecked: false })) &&
        !checkSelection(Object.assign(Object.assign({}, props), { data, type: 'every', byDefaultChecked: false }));
    const someCheckedByDefaultChecked = checkSelection(Object.assign(Object.assign({}, props), { data, type: 'some', byDefaultChecked: true })) &&
        !checkSelection(Object.assign(Object.assign({}, props), { data, type: 'every', byDefaultChecked: true }));
    if (store.getState().selectionDirty) {
        return someCheckedNotByDefaultChecked;
    }
    return someCheckedNotByDefaultChecked || someCheckedByDefaultChecked;
}
function getCheckState(props) {
    const { store, data } = props;
    if (!data.length) {
        return false;
    }
    if (store.getState().selectionDirty) {
        return checkSelection(Object.assign(Object.assign({}, props), { data, type: 'every', byDefaultChecked: false }));
    }
    return (checkSelection(Object.assign(Object.assign({}, props), { data, type: 'every', byDefaultChecked: false })) ||
        checkSelection(Object.assign(Object.assign({}, props), { data, type: 'every', byDefaultChecked: true })));
}
class SelectionCheckboxAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            indeterminate: false,
        };
        this.handleSelectAllChange = (e) => {
            const { checked } = e.target;
            this.props.onSelect(checked ? 'all' : 'removeAll', 0, null);
        };
        this.defaultSelections = props.hideDefaultSelections
            ? []
            : [
                {
                    key: 'all',
                    text: props.locale.selectAll,
                },
                {
                    key: 'invert',
                    text: props.locale.selectInvert,
                },
            ];
    }
    static getDerivedStateFromProps(props, state) {
        const checked = getCheckState(props);
        const indeterminate = getIndeterminateState(props);
        const newState = {};
        if (indeterminate !== state.indeterminate) {
            newState.indeterminate = indeterminate;
        }
        if (checked !== state.checked) {
            newState.checked = checked;
        }
        return newState;
    }
    componentDidMount() {
        this.subscribe();
    }
    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
    setCheckState(props) {
        const checked = getCheckState(props);
        const indeterminate = getIndeterminateState(props);
        this.setState(prevState => {
            const newState = {};
            if (indeterminate !== prevState.indeterminate) {
                newState.indeterminate = indeterminate;
            }
            if (checked !== prevState.checked) {
                newState.checked = checked;
            }
            return newState;
        });
    }
    subscribe() {
        const { store } = this.props;
        this.unsubscribe = store.subscribe(() => {
            this.setCheckState(this.props);
        });
    }
    renderMenus(selections) {
        return selections.map((selection, index) => {
            return (<Menu.Item key={selection.key || index}>
          <div onClick={() => {
                this.props.onSelect(selection.key, index, selection.onSelect);
            }}>
            {selection.text}
          </div>
        </Menu.Item>);
        });
    }
    render() {
        const { disabled, prefixCls, selections, getPopupContainer } = this.props;
        const { checked, indeterminate } = this.state;
        const selectionPrefixCls = `${prefixCls}-selection`;
        let customSelections = null;
        if (selections) {
            const newSelections = Array.isArray(selections)
                ? this.defaultSelections.concat(selections)
                : this.defaultSelections;
            const menu = (<Menu className={`${selectionPrefixCls}-menu`} selectedKeys={[]}>
          {this.renderMenus(newSelections)}
        </Menu>);
            customSelections =
                newSelections.length > 0 ? (<Dropdown overlay={menu} getPopupContainer={getPopupContainer}>
            <div className={`${selectionPrefixCls}-down`}>
              <Icon type="down"/>
            </div>
          </Dropdown>) : null;
        }
        return (<div className={selectionPrefixCls}>
        <Checkbox className={classNames({ [`${selectionPrefixCls}-select-all-custom`]: customSelections })} checked={checked} indeterminate={indeterminate} disabled={disabled} onChange={this.handleSelectAllChange}/>
        {customSelections}
      </div>);
    }
}
polyfill(SelectionCheckboxAll);
export default SelectionCheckboxAll;
