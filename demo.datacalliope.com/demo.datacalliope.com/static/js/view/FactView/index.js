import { connect } from 'react-redux';
import { data, schema, selectedFactIndex, selectedFact, fileName, method } from '@/selector/story';
import FactView from './FactView';
import * as factAction from '../../action/factAction';

const mapStateToProps = (state) => ({
    data: data(state),
    schema: schema(state),
    selectedFactIndex: selectedFactIndex(state),
    selectedFact: selectedFact(state),
    fileName: fileName(state),
    method: method(state),
})

const mapDispatchToProps = dispatch => {
    return {
        updateFact: (index, fact) => dispatch(factAction.updateFact(index, fact)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FactView);