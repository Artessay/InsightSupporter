import FactType from '../../../constant/FactType'
import { isValid } from '../../FactView/helper'
// import { formatNum } from '../../../sentencer/index'

export const genTitle = function (fileName) {
    let title;
    switch (fileName) {
        case 'CarSales.csv':
            title = 'Car Sales'
            break;

        case 'nCoV2020.csv':
            title = 'COVID-19'
            break;

        case 'deadstartup.csv':
            title = 'Startup Failures'
            break;

        default:
            if (fileName.indexOf('.') > 0) {
                let number = fileName.indexOf('.');
                // let csv = fileName.substr(number);
                title = fileName.substring(0, number);
            } else {
                title = fileName
            }
            break;
    }
    return title
}

const hightlightItem = function (script, parameter) {
    if(script.indexOf(parameter) === -1) return script
    let srtEndIndex = script.indexOf(parameter) + parameter.length;
    let srtStartIndex = script.indexOf(parameter);
    let newScript = script.substring(0, srtEndIndex) + "</i></span>" + script.substring(srtEndIndex);
    newScript = newScript.substring(0, srtStartIndex) + '<span class="mobile-hightlight"><i>' + newScript.substring(srtStartIndex);
    return newScript
}

export const hightlight = function (fact) {
    if (!isValid(fact))
        return ''
    if (!fact.parameter)
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
            if (parameter2) newScript = hightlightItem(newScript, parameter2)
            if (parameter2 && parameter3) newScript = hightlightItem(newScript, parameter3)
            break;

        case FactType.VALUE:
            newScript = hightlightItem(script, fact.measure[0].field.toLowerCase())
            break;

        case FactType.DIFFERENCE:
            newScript = hightlightItem(script, fact.measure[0].field.toLowerCase())
            break;
        // case FactType.VALUE:
        //     parameter = formatNum(fact.parameter);
        //     newScript = hightlightItem(script, parameter)
        //     break;

        // case FactType.DIFFERENCE:
        //     parameter = formatNum(fact.parameter);
        //     newScript = hightlightItem(script, parameter)
        //     break;

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

export const genSubtitle = function (fact) {
    let title;
    if (!isValid(fact))
        return ''

    title = 'The ' + fact.type
    switch (fact.type) {
        case FactType.ASSOCIATION:
            title += ' of ' + fact.measure[0].field + ' and ' + fact.measure[1].field
            break;
        case FactType.CATEGORIZATION:
            title += ' of ' + fact.groupby[0]
            break;

        case FactType.DIFFERENCE:
            title += ' between ' + fact.focus[0].value + ' and ' + fact.focus[1].value
            break;
        case FactType.DISTRIBUTION:
            title += ' of ' + fact.measure[0].field
            break;
        case FactType.EXTREME:
            title += ' of ' + fact.measure[0].field
            break;
        case FactType.OUTLIER:
            title += ' of ' + fact.measure[0].field
            break;
        case FactType.PROPORTION:
            title += ' of ' + fact.focus[0].value
            break;
        case FactType.RANK:
            title += ' of ' + fact.measure[0].field
            break;
        case FactType.TREND:
            title += ' of ' + fact.measure[0].field
            break;
        case FactType.VALUE:
            title += ' of ' + fact.focus[0].value
            break;
        default:
            break;
    }
    if (fact.subspace.length) {
        let subspace = '';
        fact.subspace.map((key, i) => { return subspace += ` in ${key.value}` })
        title += subspace;
    }

    return title;
}