import { connect } from 'react-redux';
import {fileName, title, data, schema, facts, relations, selectedFactIndex, storyParameter, resultCoverage, aggregationLevel} from '@/selector/story';
import StoryView from './StoryView';
import * as storyAction from '../../action/storyAction';
import * as factAction from '../../action/factAction';

const mapStateToProps = (state) => ({
    fileName: fileName(state),
    title: title(state),
    data: data(state),
    schema: schema(state),
    facts: facts(state),
    relations: relations(state),
    selectedFactIndex: selectedFactIndex(state),
    storyParameter: storyParameter(state),
    resultCoverage: resultCoverage(state),
    aggregationLevel: aggregationLevel(state),
})

const mapDispatchToProps = dispatch => {
    return {
        updateFact: (index, fact) => dispatch(factAction.updateFact(index, fact)),
        selectFact: (index) => dispatch(storyAction.selectFact(index)),
        changeTitle: (title) => dispatch(storyAction.changeTitle(title))
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryView);
