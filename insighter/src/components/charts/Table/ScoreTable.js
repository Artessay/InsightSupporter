import React, { useContext } from 'react';
import './Table.css'

function ScoreTable() {
    let tableList = [
        {
            quarter: 1,
            shots: 7,
            made: 6,
        },
        {
            quarter: 2,
            shots: 3,
            made: 2,
        },
        {
            quarter: 3,
            shots: 5,
            made: 2,
        },
        {
            quarter: 4,
            shots: 2,
            made: 2,
        },
    ];

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