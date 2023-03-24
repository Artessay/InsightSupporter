import React from 'react';
import './Table.css'

function ScoreTable(props) {
    var {ChartData} = props
    // console.log(ChartData)

    let tableList = []
    for ( let key in ChartData) {
        if (ChartData.hasOwnProperty(key)) {
            const quarterData = ChartData[key];
            tableList.push(quarterData)
        }
    }
    // console.log(tableList[0])
    // console.log(tableList)
    const keys = tableList.length>0 ? Object.keys(tableList[0]) : []
    // console.log("table key length: " + keys.length)

    return (
        <table className='styled-table'>
            <thead>
                <tr>
                    {
                        keys.map(key => (
                            <th key={key}>{key}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    tableList.map(
                        (item, index) =>
                            <tr key={index} className=''>
                                {
                                    keys.map(key => (
                                        <td key={key}>{item[key]}</td>
                                    ))
                                }
                            </tr>
                    )
                }
                
            </tbody>
            
        </table>
    )
}

export default ScoreTable