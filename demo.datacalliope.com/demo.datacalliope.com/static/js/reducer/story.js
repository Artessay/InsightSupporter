import demo from '../demo';
import { CarSales_data, CarSales_schema } from '../dataset/carsales';
import { covid19China_data, covid19China_schema } from '../dataset/covid19China';
import { covid19World_data, covid19World_schema } from '../dataset/covid19World';
import { DeadStartup_data, DeadStartup_schema } from '../dataset/deadstartup';
// import { Sporty_data, Sporty_schema } from '../dataset/sporty';
// import { BMW_data, BMW_schema } from '../dataset/bmw';
// import { Gold_data, Gold_schema } from '../dataset/gold';
import { facts2charts } from '../tool/fact2vis';
import ActionType from '../action/type';
// import {getFactChartType} from '../tool/fact2vis';
import Fact from '../model/fact';
import FactType from '../constant/FactType';
import { genTitle } from "../sentencer/index";
import _ from 'lodash';

const initialState = {
    fileName: demo.fileName,
    title: demo.title,
    data: CarSales_data,
    schema: CarSales_schema,
    method: 'sig',
    facts: demo.facts,
    relations: demo.relations,
    selectedFactIndex: 0,
    maxStoryLength: 6,
    timeLimit: 5000, // for each iteration
    information: 40, // default 50 bits for 6 facts
    resultCoverage: 1,
    chartDiversity: 0,
    aggregationLevel: 0,
    rewardWeight: {
        logicality: 0.33,
        diversity: 0.33,
        integrity: 0.33,
    }
};

export default (state = initialState, action) => {
    const newState = Object.assign({}, state);
    let newFacts;
    switch (action.type) {
        case ActionType.SELECT_FACT:
            newState.selectedFactIndex = action.index;
            return newState;

        case ActionType.ADD_FACT:
            newFacts = newState.facts.slice();
            let newFact = new Fact(FactType.VALUE);
            newFacts.push(newFact);
            newState.facts = newFacts;
            newState.selectedFactIndex = newFacts.length - 1;
            newState.relations = Array(newState.facts.length).fill('none'); // reset relations
            return newState;

        case ActionType.UPDATE_FACT:
            newState.selectedFactIndex = action.index;
            let fact = _.cloneDeep(action.fact);
            // fact.chart = getFactChartType(fact, state.data);
            newFacts = newState.facts.slice();
            newFacts[action.index] = fact;
            newState.facts = newFacts;
            newState.relations = Array(newState.facts.length).fill('none'); // reset relations
            return newState;

        case ActionType.DELETE_FACT:
            newFacts = newState.facts.slice();
            newFacts.splice(action.index, 1);
            newState.selectedFactIndex = action.index > 0 ? action.index - 1 : 0;
            if (newFacts.length === 0) {
                // add default fact
                let newFact = new Fact(FactType.VALUE);
                newFacts.push(newFact);
            }
            newState.facts = newFacts;
            newState.selectedFactIndex = newFacts.length - 1;
            newState.relations = Array(newState.facts.length).fill('none'); // reset relations
            return newState;

        case ActionType.ORDER_FACTS:
            newFacts = newState.facts.slice();
            const [moved] = newFacts.splice(action.sourceIndex, 1);
            newFacts.splice(action.destinationIndex, 0, moved);
            newState.facts = newFacts;
            newState.selectedFactIndex = action.destinationIndex;
            newState.relations = Array(newState.facts.length).fill('none'); // reset relations
            return newState;

        case ActionType.CHANGE_METHOD:
            newState.method = action.method;
            return newState;

        case ActionType.SET_STORY_PARAMETER:
            newState.maxStoryLength = action.maxStoryLength;
            newState.information = action.information;
            newState.chartDiversity = action.chartDiversity;
            if (action.chartDiversity !== state.chartDiversity) {
                newFacts = newState.facts.slice();
                newFacts = facts2charts(newFacts, state.data, action.chartDiversity);
                newState.facts = newFacts;
            }
            newState.timeLimit = action.timeLimit;
            return newState;

        case ActionType.SET_AGGREGATION_LEVEL:
            newState.aggregationLevel = action.level;
            return newState;

        case ActionType.SET_REWARD_WEIGHT:
            let newWeight = Object.assign({}, newState.rewardWeight);
            newWeight.logicality = action.logicality;
            newWeight.diversity = action.diversity;
            newWeight.integrity = action.integrity;
            newState.rewardWeight = newWeight;
            return newState;

        case ActionType.GENERATE_STORY:
            newState.facts = action.facts;
            newState.relations = action.relations;
            newState.resultCoverage = action.coverage;
            return newState;

        case ActionType.CHANGE_TITLE:
            newState.title = action.title;
            return newState;

        case ActionType.UPLOAD_DATA:
            newState.fileName = action.fileName;
            newState.title = genTitle(action.fileName);
            newState.facts = [];
            newState.relations = [];
            newState.schema = action.schema;
            newState.data = action.data;
            return newState

        case ActionType.CHANGE_DATA:
            newState.fileName = action.fileName;
            newState.title = genTitle(action.fileName);
            newState.facts = [];
            newState.relations = [];
            switch (action.fileName) {
                case 'CarSales.csv':
                    newState.data = CarSales_data;
                    newState.schema = CarSales_schema;
                    break;

                case 'covid19China.csv':
                    newState.data = covid19China_data;
                    newState.schema = covid19China_schema;
                    break;
                
                case 'covid19World.csv':
                    newState.data = covid19World_data;
                    newState.schema = covid19World_schema;
                    break;

                case 'deadstartup.csv':
                    newState.data = DeadStartup_data;
                    newState.schema = DeadStartup_schema;
                    break;

                // case 'Sporty.csv':
                //     newState.data = Sporty_data;
                //     newState.schema = Sporty_schema;
                //     break;

                // case 'BMW.csv':
                //     newState.data = BMW_data;
                //     newState.schema = BMW_schema;
                //     break;

                // case 'Gold.csv':
                //     newState.data = Gold_data;
                //     newState.schema = Gold_schema;
                //     break;

                default:
                    break;
            }
            return newState

        default:
            break;
    }
    return newState;
}