import * as d3 from 'd3';

const getCategories = (rawData, encoding) => {
    let dataCategories = {}
    for (let i = 0; i < rawData.length; i++) {
        if (dataCategories[rawData[i][encoding.x.field]]) {
            dataCategories[rawData[i][encoding.x.field]].push(rawData[i]);
        }
        else {
            dataCategories[rawData[i][encoding.x.field]] = [rawData[i]];
        }
    }
    return dataCategories;
}

const getSize = (rawData, encoding) => {
    let dataSize = {}
    for (let i = 0; i < rawData.length; i++) {
        if (dataSize[rawData[i][encoding.y.field]]) {
            dataSize[rawData[i][encoding.y.field]].push(rawData[i]);
        }
        else {
            dataSize[rawData[i][encoding.y.field]] = [rawData[i]];
        }
    }
    return dataSize;
}


const getCountRows = (rawData, encoding) => {
    let calculateData = d3.nest().key(d => d[encoding.x.field]).entries(rawData);
    let countData = new Array(calculateData.length).fill(0);
    let data = calculateData.map(function (d,i) {
        d.values.forEach(() => {
            countData[i] += 1
        })
        let countRows = Object.assign({},d.values[0])
        countRows['COUNT'] = countData[i]
        return countRows
    });
    return data;
}

const getMinRows = (rawData, encoding) => {
    let calculateData = d3.nest().key(d => d[encoding.x.field]).entries(rawData);
    let data = calculateData.map(function (d) {
        let index = d3.scan(d.values, function(a, b) {
            if(a[encoding.y.field] && b[encoding.y.field])
                return a[encoding.y.field]- b[encoding.y.field]; 
            });
        if (index >= 0) {
            return d.values[index]
        } else {
            return d.values[0]
        }
    });
    return data;
}

const getMaxRows = (rawData, encoding) =>{
    let calculateData = d3.nest().key(d => d[encoding.x.field]).entries(rawData);
    let data = calculateData.map(function (d,i) {
        let index = d3.scan(d.values, function(a, b) {
            if(a[encoding.y.field] && b[encoding.y.field])
                return b[encoding.y.field]- a[encoding.y.field]; 
            });
        if (index >= 0) {
            return d.values[index]
        } else {
            return d.values[0];
        }
    });
    return data;
}

const getSumRows = (rawData, encoding) =>{
    let calculateData = d3.nest().key(d => d[encoding.x.field]).entries(rawData);
    let sumData = new Array(calculateData.length).fill(0);
    let data = calculateData.map(function (d,i) {
        d.values.forEach(d=>{
            sumData[i] += d[encoding.y.field]
        })
        let sumRows = Object.assign({},d.values[0])
        sumRows[encoding.y.field] = sumData[i]
        return sumRows
    });
    return data;
}

const getAverageRows = (rawData, encoding) =>{
    let calculateData = d3.nest().key(d => d[encoding.x.field]).entries(rawData);
    let sumData = new Array(calculateData.length).fill(0);
    let data = calculateData.map(function (d,i) {
        d.values.forEach(d=>{
            sumData[i] += d[encoding.y.field]
        })
        let sumRows = Object.assign({},d.values[0])
        sumRows[encoding.y.field] = sumData[i] / d.values.length;
        return sumRows;
    });
    return data;
}

const getAggregatedRows = (rawData, encoding) => {
    let data;
    switch (encoding.y.aggregation) {
        case 'sum':
            data = getSumRows(rawData, encoding);
            break;
        case 'avg':
            data = getAverageRows(rawData, encoding);
            break;
        case 'max':
            data = getMaxRows(rawData, encoding);
            break;
        case 'min':
            data = getMinRows(rawData, encoding);
            break;
        case 'count':
            data = getCountRows(rawData, encoding)
            break;

        default:
            data = getMaxRows(rawData, encoding);
            break;
    }
    return data;
}

const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false; 
    return num > 1;
}

export {getCategories,  getAggregatedRows, getSize, isPrime}