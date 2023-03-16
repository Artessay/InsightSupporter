import React, { useContext } from 'react';
import './Table.css'

function ScoreTable() {
    // const {state, dispatch} = useContext(store);
    
    // const athletes = boxscore.athletes || [];
    // const tableList = [];
    // let length = athletes.length;
    // for (let index = 0; index < length; index++) {
    //     tableList.push(
    //         {
    //             name  : athletes[index].athlete.shortName || '-',
    //             MIN   : athletes[index].stats[0] || '-',
    //             FG    : athletes[index].stats[1] || '-',
    //             TPT   : athletes[index].stats[2] || '-',
    //             FT    : athletes[index].stats[3] || '-',
    //             OREB  : athletes[index].stats[4] || '-',
    //             DREB  : athletes[index].stats[5] || '-',
    //             REB   : athletes[index].stats[6] || '-',
    //             AST   : athletes[index].stats[7] || '-',
    //             STL   : athletes[index].stats[8] || '-',
    //             BLK   : athletes[index].stats[9] || '-',
    //             TO    : athletes[index].stats[10] || '-',
    //             PF    : athletes[index].stats[11] || '-',
    //             bias  : athletes[index].stats[12] || '-',
    //             points : athletes[index].stats[13] || '-',
    //             active : (athletes[index].athlete.displayName === state.athlete) ? "active-row" : ""
    //         }
    //     );
    //     // console.log(tableList[index])
    // }
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