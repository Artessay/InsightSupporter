import { connect } from 'react-redux';
import {fileName, data, schema, facts, relations, selectedFactIndex, storyParameter, resultCoverage} from '@/selector/story';
import PublishView from './PublishView';
import * as storyAction from '../../action/storyAction';
import * as dataAction from '../../action/dataAction';

const mapStateToProps = (state) => ({
    fileName: fileName(state),
    data: data(state),
    schema: schema(state),
    facts: facts(state),
    relations: relations(state),
    selectedFactIndex: selectedFactIndex(state),
    storyParameter: storyParameter(state),
    resultCoverage: resultCoverage(state),
})

const mapDispatchToProps = dispatch => {
    return {
        selectFact: (index) => dispatch(storyAction.selectFact(index)),
        generateStory: (facts, relations, coverage) => dispatch(storyAction.generateStory(facts, relations, coverage)),
        changeData: (fileName) => dispatch(dataAction.changeData(fileName)),
        uploadData: (fileName, schema, data) => dispatch(dataAction.uploadData(fileName, schema, data)),
        setAggregationLevel: (level) => dispatch(storyAction.setAggregationLevel(level)),
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishView);
