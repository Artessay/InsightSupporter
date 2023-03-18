import React, { useContext } from 'react';
import './Table.css'

function ScoreTable(props) {
    var {ChartData} = props
    console.log(ChartData)

    let tableList = []
    for ( let key in ChartData) {
        if (ChartData.hasOwnProperty(key)) {
            const quarterData = ChartData[key];
            //   const quarter = quarterData.Quarter;
            //   console.log(`Quarter: ${quarter}`);
            tableList.push({
                quarter: quarterData.Quarter,
                shots: quarterData["Number of Shots"],
                make: quarterData.Made
            })
        }
    }
    

    return (
        <table className='styled-table'>
            <thead>
                <tr>
                    <th>Quarter</th>
                    <th>Number of Shots</th>
                    <th>Made</th>
                </tr>
            </thead>
            <tbody>
                {
                    tableList.map(
                        item =>
                            <tr key={item.quarter} className=''>
                                <td className="table-row">
                                    {item.quarter}
                                </td>
                                <td className="table-row">
                                    {item.shots}
                                </td>
                                <td className="table-row">
                                    {item.made}
                                </td>
                            </tr>
                    )
                }
                
            </tbody>
            
        </table>
    )
}

export default ScoreTable