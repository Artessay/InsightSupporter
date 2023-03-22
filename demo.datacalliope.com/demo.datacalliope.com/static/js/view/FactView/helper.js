import FactType from '../../constant/FactType'

// chart valid
export const isValid = function (fact) {
    let isValid = false;
    switch (fact.type) {
        case FactType.ASSOCIATION:
            if (fact.measure.length === 2 && fact.groupby.length)
                isValid = true
            break;

        case FactType.CATEGORIZATION:
            if (fact.groupby.length)
                isValid = true
            break;

        case FactType.DIFFERENCE:
            if (fact.measure.length && fact.measure[0].field && fact.measure[0].aggregate && fact.groupby.length && fact.focus.length >= 2)
                isValid = true
            break;

        case FactType.DISTRIBUTION:
            if (fact.measure.length && fact.measure[0].field && fact.measure[0].aggregate && fact.groupby.length)
                isValid = true
            break;

        case FactType.EXTREME:
            if (fact.measure.length && fact.measure[0].field && fact.measure[0].aggregate && fact.groupby.length && fact.focus.length)
                isValid = true
            break;

        case FactType.OUTLIER:
            if (fact.measure.length && fact.measure[0].field && fact.measure[0].aggregate && fact.groupby.length && fact.focus.length)
                isValid = true
            break;

        case FactType.PROPORTION:
            if (fact.measure.length && fact.measure[0].field && fact.measure[0].aggregate && fact.groupby.length && fact.focus.length)
                isValid = true
            break;

        case FactType.RANK:
            if (fact.measure.length && fact.measure[0].field && fact.measure[0].aggregate && fact.groupby.length)
                isValid = true
            break;

        case FactType.TREND:
            if (fact.measure.length && fact.measure[0].field && fact.measure[0].aggregate && fact.groupby.length)
                isValid = true
            break;

        case FactType.VALUE:
            if (fact.measure.length)
                isValid = true
            break;

        default:
            break;
    }
    return isValid
}

// 清空不必要的fact属性
export const customizeFact = function (fact) {
    let newFact = Object.assign({}, fact)
    switch (fact.type) {
        case FactType.ASSOCIATION:
            newFact.focus = []
            break;

        case FactType.CATEGORIZATION:
            newFact.measure = []
            newFact.focus = []
            break;

        case FactType.DIFFERENCE:
            break;

        case FactType.DISTRIBUTION:
            newFact.focus = []
            break;

        case FactType.EXTREME:
            break;

        case FactType.OUTLIER:
            break;

        case FactType.PROPORTION:
            break;

        case FactType.RANK:
            newFact.focus = []
            break;

        case FactType.TREND:
            newFact.focus = []
            break;

        case FactType.VALUE:
            newFact.groupby = []
            newFact.focus = []
            break;

        default:
            break;
    }
    return newFact
}

// fact valid for score to update(RANK/PROPORTION/OUTLIER/DIFFERENCE)
export const isFactValid = function (_fact) {
    let fact = Object.assign({}, _fact)
    let isFactValid = false;
    switch (fact.type) {
        case FactType.ASSOCIATION:
            if (fact.measure.length === 2 && fact.groupby)
                isFactValid = true
            break;

        case FactType.CATEGORIZATION:
            if (fact.groupby)
                isFactValid = true
            break;

        case FactType.DIFFERENCE:
            if (fact.measure && fact.groupby && fact.focus.length >= 2)
                isFactValid = true
            break;

        case FactType.DISTRIBUTION:
            if (fact.measure && fact.groupby)
                isFactValid = true
            break;

        case FactType.EXTREME:
            if (fact.measure && fact.groupby)
                isFactValid = true
            break;

        case FactType.OUTLIER:
            if (fact.measure && fact.groupby && fact.focus.length)
                isFactValid = true
            break;

        case FactType.PROPORTION:
            if (fact.measure && fact.groupby && fact.focus.length)
                isFactValid = true
            break;

        case FactType.RANK:
            if (fact.measure.length && fact.groupby.length && fact.focus.length >= 3)
                isFactValid = true
            break;

        case FactType.TREND:
            if (fact.measure && fact.groupby)
                isFactValid = true
            break;

        case FactType.VALUE:
            if (fact.measure)
                isFactValid = true
            break;

        default:
            break;
    }
    return isFactValid
}