import ActionType from './type';

export const addFact = () => ({
    type: ActionType.ADD_FACT,
})

export const updateFact = (index, fact) => ({
    type: ActionType.UPDATE_FACT,
    index,
    fact,
})

export const deleteFact = (index) => ({
    type: ActionType.DELETE_FACT,
    index,
})

export const orderFacts = (sourceIndex, destinationIndex) => ({
    type: ActionType.ORDER_FACTS,
    sourceIndex,
    destinationIndex,
})