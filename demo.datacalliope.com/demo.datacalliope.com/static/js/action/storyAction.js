import ActionType from './type';

export const selectFact = (index) => ({
    type: ActionType.SELECT_FACT,
    index
})

export const changeMethod = (method) => ({
    type: ActionType.CHANGE_METHOD,
    method,
})

export const setStoryParameter = (maxStoryLength, information, chartDiversity, timeLimit) => ({
    type: ActionType.SET_STORY_PARAMETER,
    maxStoryLength,
    information,
    chartDiversity,
    timeLimit,
})

export const setRewardWeight = (logicality, diversity, integrity) => ({
    type: ActionType.SET_REWARD_WEIGHT,
    logicality,
    diversity,
    integrity,
})

export const setAggregationLevel = (level) => ({
    type: ActionType.SET_AGGREGATION_LEVEL,
    level,
})

export const generateStory = (facts, relations, coverage) => ({
    type: ActionType.GENERATE_STORY,
    facts,
    relations,
    coverage,
})

export const changeTitle = (title) => ({
    type: ActionType.CHANGE_TITLE,
    title,
})