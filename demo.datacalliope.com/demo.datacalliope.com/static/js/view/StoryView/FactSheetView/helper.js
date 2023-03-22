import FactType from '../../../constant/FactType'
import { isValid } from '../../FactView/helper'

const hightlightItem = function (script, parameter) {
    if(script.indexOf(parameter) === -1) return script
    let srtEndIndex = script.indexOf(parameter) + parameter.length;
    let srtStartIndex = script.indexOf(parameter);
    let newScript = script.substring(0, srtEndIndex) + "</span>" + script.substring(srtEndIndex);
    newScript = newScript.substring(0, srtStartIndex) + '<span class="factsheet-hightlight">' + newScript.substring(srtStartIndex);
    return newScript
}

export const hightlight = function (fact) {
    if (!isValid(fact))
        return ''
    // if (!fact.parameter)
    //     return fact.script()
    if (!fact.measure)
        return fact.generatedScript

    let script = fact.generatedScript
    let parameter
    let newScript

    switch (fact.type) {
        // TODO: NO template parameter
        case FactType.ASSOCIATION:
            newScript = script
            break;

        case FactType.RANK:
            let parameter1 = fact.parameter[0];
            let parameter2 = fact.parameter[1];
            let parameter3 = fact.parameter[2];
            newScript = hightlightItem(script, parameter1)
            if(parameter2) newScript = hightlightItem(newScript, parameter2)
            if(parameter2 && parameter3) newScript = hightlightItem(newScript, parameter3)
            break;

        case FactType.VALUE:
            // parameter = formatNum(fact.parameter);
            newScript = hightlightItem(script, fact.measure[0].field.toLowerCase())
            break;

        case FactType.DIFFERENCE:
            // parameter = formatNum(fact.parameter);
            newScript = hightlightItem(script, fact.measure[0].field.toLowerCase())
            break;

        // TODO: NO template parameter
        case FactType.OUTLIER:
            newScript = script
            break;

        case FactType.DISTRIBUTION:
            newScript = script
            break;

        case FactType.CATEGORIZATION:
            parameter = fact.parameter.length.toString();
            newScript = hightlightItem(script, parameter)
            break;

        default:
            parameter = fact.parameter;
            newScript = hightlightItem(script, parameter)
            break;
    }
    return newScript
}

export const normalized = function(val, max, min) { return (val - min) / (max - min); }