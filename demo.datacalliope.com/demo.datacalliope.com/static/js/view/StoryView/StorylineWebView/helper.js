import FactType from '../../../constant/FactType'
import { isValid } from '../../FactView/helper'

const hightlightItem = function (script, parameter) {
    if(script.indexOf(parameter) === -1) return script
    let srtEndIndex = script.indexOf(parameter) + parameter.length;
    let srtStartIndex = script.indexOf(parameter);
    let newScript = script.substring(0, srtEndIndex) + "</i></span>" + script.substring(srtEndIndex);
    newScript = newScript.substring(0, srtStartIndex) + '<span class="timeline-hightlight"><i>' + newScript.substring(srtStartIndex);
    return newScript
}

export const hightlight = function (fact) {
    if (!isValid(fact))
        return ''
    // if (!fact.parameter)
    //     return fact.script()
    if (!fact.measure)
        return fact.generatedScript

    if (fact.aggregated && fact.aggregatedFact) {
        return fact.generatedScript + " " + fact.aggregatedFact.generatedScript;
    }

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

export const getMinFontSize = function(longest) {
    let temp;
    if(longest >= 80) {
        temp = 1
    } else if(longest >= 60) {
        temp = 10
    } else if (longest >= 40) {
        temp = 12
    } else if (longest >= 21) {
        temp = 14
    } else if (longest >= 19) {
        temp = 16
    } else {
        temp = 18
    }
    return temp
}

export const normalized = function(val, max, min) { return (val - min) / (max - min); }

export const textFormat = function(e) {
    e.preventDefault()
    var text
    var clp = (e.originalEvent || e).clipboardData
    if (clp === undefined || clp === null) {
      text = window.clipboardData.getData('text') || ''
      if (text !== '') {
        if (window.getSelection) {
          var newNode = document.createElement('span')
          newNode.innerHTML = text
          window.getSelection().getRangeAt(0).insertNode(newNode)
        } else {
          document.selection.createRange().pasteHTML(text)
        }
      }
    } else {
      text = clp.getData('text/plain') || ''
      if (text !== '') {
        document.execCommand('insertText', false, text)
      }
    }
}