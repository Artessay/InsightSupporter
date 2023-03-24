import React, { useContext } from 'react';
import ReactTable from "react-table";  
import { store } from "../store";
import boxscore from '../data/boxscore';
import boxscoreLabel from '../data/boxscoreLabel';

function BoxTable() {
    const {state, dispatch} = useContext(store);

    // const players = boxscore.athletes || [];
    // const labels = boxscoreLabel || [];
    
    const athletes = boxscore.athletes || [];
    const tableList = [];
    let length = athletes.length;
    for (let index = 0; index < length; index++) {
        tableList.push(
            {
                name  : athletes[index].athlete.shortName || '-',
                MIN   : athletes[index].stats[0] || '-',
                FG    : athletes[index].stats[1] || '-',
                TPT   : athletes[index].stats[2] || '-',
                FT    : athletes[index].stats[3] || '-',
                OREB  : athletes[index].stats[4] || '-',
                DREB  : athletes[index].stats[5] || '-',
                REB   : athletes[index].stats[6] || '-',
                AST   : athletes[index].stats[7] || '-',
                STL   : athletes[index].stats[8] || '-',
                BLK   : athletes[index].stats[9] || '-',
                TO    : athletes[index].stats[10] || '-',
                PF    : athletes[index].stats[11] || '-',
                bias  : athletes[index].stats[12] || '-',
                points : athletes[index].stats[13] || '-',
                active : (athletes[index].athlete.displayName === state.athlete) ? "active-row" : ""
            }
        );
        // console.log(tableList[index])
    }
    return (
        <table className='styled-table'>
            {/* <caption>BoxScore</caption> */}
            <thead>
                <tr>
                    <th>    </th>
                    <th>MIN </th>
                    <th>FG  </th>
                    <th>3PT </th>
                    <th>FT  </th>
                    <th>OREB</th>
                    <th>DREB</th>
                    <th>REB </th>
                    <th>AST </th>
                    <th>STL </th>
                    <th>BLK </th>
                    <th>TO  </th>
                    <th>PF  </th>
                    <th>+/- </th>
                    <th>PTS </th>
                </tr>
            </thead>
            <tbody>
                {
                    tableList.map(
                        item =>
                            <tr key={item.name} className={item.active}>
                                <td className="table-row">
                                    {item.name}
                                </td>
                                <td className="table-row">
                                    {item.MIN}
                                </td>
                                <td className="table-row">
                                    {item.FG}
                                </td>
                                <td className="table-row">
                                    {item.TPT}
                                </td>
                                <td className="table-row">
                                    {item.FT}
                                </td>
                                <td className="table-row">
                                    {item.OREB}
                                </td>
                                <td className="table-row">
                                    {item.DREB}
                                </td>
                                <td className="table-row">
                                    {item.REB}
                                </td>
                                <td className="table-row">
                                    {item.AST}
                                </td>
                                <td className="table-row">
                                    {item.STL}
                                </td>
                                <td className="table-row">
                                    {item.BLK}
                                </td>
                                <td className="table-row">
                                    {item.TO}
                                </td>
                                <td className="table-row">
                                    {item.PF}
                                </td>
                                <td className="table-row">
                                    {item.bias}
                                </td>
                                <td className="table-row">
                                    {item.points}
                                </td>
                            </tr>
                    )
                }
                
            </tbody>
            
        </table>
    )
    // return (
    //     <div className='table'>
    //     {
    //         list.map(
    //         item =>
    //             <div key={item.objectID} className="table-row">
    //             <span style={{width: '50%'}}>
    //                 <a href={item.url}> {item.title} </a>
    //             </span>
    //             <span style={{width: '35%'}}>
    //                 {item.author}
    //             </span>
    //             </div>
    //         )
    //     }
    //     </div>
    // )
}

export default BoxTable