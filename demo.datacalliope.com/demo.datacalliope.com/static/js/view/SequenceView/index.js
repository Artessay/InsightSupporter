import { connect } from 'react-redux';
import {fileName, data, schema, facts, relations, method, selectedFactIndex, storyParameter, rewardWeight, aggregationLevel} from '@/selector/story';
import SequenceView from './SequenceView';
import * as factAction from '../../action/factAction';
import * as storyAction from '../../action/storyAction';
import * as dataAction from '../../action/dataAction';

const mapStateToProps = (state) => ({
    fileName: fileName(state),
    data: data(state),
    schema: schema(state),
    facts: facts(state),
    relations: relations(state),
    method: method(state),
    selectedFactIndex: selectedFactIndex(state),
    storyParameter: storyParameter(state),
    rewardWeight: rewardWeight(state),
    aggregationLevel: aggregationLevel(state),
})

const mapDispatchToProps = dispatch => {
    return {
        addFact: () => dispatch(factAction.addFact()),
        updateFact: (index, fact) => dispatch(factAction.updateFact(index, fact)),
        deleteFact: (index) => dispatch(factAction.deleteFact(index)),
        orderFacts: (sourceIndex, destinationIndex) => dispatch(factAction.orderFacts(sourceIndex, destinationIndex)),
        selectFact: (index) => dispatch(storyAction.selectFact(index)),
        generateStory: (facts, relations, coverage) => dispatch(storyAction.generateStory(facts, relations, coverage)),
        changeMethod: (method) => dispatch(storyAction.changeMethod(method)),
        setStoryParameter: (maxStoryLength, information, chartDiversity, timeLimit) => dispatch(storyAction.setStoryParameter(maxStoryLength, information, chartDiversity, timeLimit)),
        setRewardWeight: (logicality, diversity, integrity) => dispatch(storyAction.setRewardWeight(logicality, diversity, integrity)),
        setAggregationLevel: (level) => dispatch(storyAction.setAggregationLevel(level)),
        uploadData: (fileName, schema, data) => dispatch(dataAction.uploadData(fileName, schema, data)),
        changeData: (fileName) => dispatch(dataAction.changeData(fileName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SequenceView);