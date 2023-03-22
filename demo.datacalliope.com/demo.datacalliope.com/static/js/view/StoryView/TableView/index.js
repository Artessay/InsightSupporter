import React, { Component } from 'react';
import { Table } from 'antd';
import _ from 'lodash';


export default class TableView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
        };
    }


    render() {
        const { data, schema } = this.props;
        let data_table = data.map((item, index) =>({...item, key: index}))
        const columns = schema.map((col, index) => {
            if(col.type==='categorical') { // 对应筛选
                return {
                    title: col.field,
                    dataIndex: col.field,
                    filters: _.keys(_.countBy(data, function(data) { return data[col.field]; })).map((item,i)=>{
                        return {
                            text: item,
                            value: item
                        }
                    }),
                    onFilter: (value, record) => record[col.field].indexOf(value) === 0,
                }
            } else if(col.type==='temporal'){ // 对应排序
                return {
                    title: col.field,
                    dataIndex: col.field,
                    sorter: (a, b) => new Date(a[col.field]) - new Date(b[col.field]),
                    sortDirections: ['descend', 'ascend'],
                }
            } else { // 对应排序
                return {
                    title: col.field,
                    dataIndex: col.field,
                    sorter: (a, b) => a[col.field] - b[col.field],
                    sortDirections: ['descend', 'ascend'],
                }
            }
            
        })
        
        return <div style={{ width: "100%", height: "400px", marginTop: '10px'}}>
                <Table size="middle" style={{ width: "100%", height: "400px", padding:'5px'}} columns={columns} dataSource={data_table} />
            </div>

        
    }
}