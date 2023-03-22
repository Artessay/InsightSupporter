import React, { Component } from 'react';
import { Modal, Tabs, Upload, Icon, message } from 'antd';
import './uploaddatamodal.css';
const { TabPane } = Tabs;
const { Dragger } = Upload;

const datasetList = ['CarSales.csv', 'covid19China.csv', 'deadstartup.csv']

export default class UploadDataModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: "CHANGE_DATA",
            datasetIndex: 0,
            fileList: []
        };
    }

    handleOk = () => {
        let tabValue = this.state.tab;
        let index = this.state.datasetIndex
        if (tabValue === 'CHANGE_DATA') {
            this.props.handleOk(tabValue, datasetList[index]);
        } else {
            let fileLength = this.state.fileList.length
            if (fileLength) {
                let file = this.state.fileList[fileLength - 1]
                this.props.handleOk(tabValue, file.originFileObj);
            } else {
                message.info('Please upload a file.');
            }
        }
    }

    onTabChange = (key) => {
        this.setState({
            tab: key
        })
    }

    onSwitchChange = (index) => {
        this.setState({
            datasetIndex: index
        })
        for (let i = 0; i < datasetList.length; i++) {
            this.refs['dataset' + i].style.borderColor = '#ddd'
        }
        this.refs['dataset' + index].style.borderColor = '#337ab7'
    }

    onUploadChange = (info) => {
        const { status } = info.file;
        if(info.file.size <= 200000) {
            if (status !== 'uploading') {
                message.success(`${info.file.name} file uploaded successfully.`);
                this.setState({
                    fileList: info.fileList
                })
            }
        } else if(status === 'error'){
            message.error(`File size exceeds limit(200kb).`);
        }
        
        // if (status === 'done') {
        //     message.success(`${info.file.name} file uploaded successfully.`);
        //     this.setState({
        //         fileList: info.fileList
        //     })
        // } else if (status === 'error') {
        //     message.error(`${info.file.name} file upload failed.`);
        // }
    }

    render() {
        let fileLength = this.state.fileList.length
        let currentFileName = fileLength ? this.state.fileList[fileLength - 1].name : ''
        return (
            <Modal
                title="Data Management"
                visible={this.props.visible}
                onOk={this.handleOk}
                confirmLoading={this.props.confirmLoading}
                onCancel={this.props.handleCancel}
            // okText={'Generate Story'}
            >
                <Tabs type="card" onChange={this.onTabChange}>
                    <TabPane tab="Samples" key="CHANGE_DATA">
                        <div className="row">
                            <div className="dataset-item" onClick={() => this.onSwitchChange(0)}>
                                <div className="thumbnail" ref="dataset0" style={{ borderColor: '#337ab7' }}>
                                    <h6>Car Sales</h6>
                                    <h6 style={{ float: 'right' }}>275 rows</h6>
                                    <p>This is the Car sales dataset which contains the information about type, brand, category, sales, etc.</p>
                                </div>
                            </div>
                            {/* <div className="dataset-item" onClick={() => this.onSwitchChange(1)}>
                                <div className="thumbnail" ref="dataset1">
                                    <h6>COVID-19</h6>
                                    <h6 style={{ float: 'right' }}>903 rows</h6>
                                    <p>This dataset shows COVID-19 infections in all provinces in China as well as other countries from 2020/3/1 to 2020/3/21. This dataset will help us understand how COVID-19 is spread aroud the world.</p>
                                </div>
                            </div> */}
                            <div className="dataset-item" onClick={() => this.onSwitchChange(1)}>
                                <div className="thumbnail" ref="dataset1">
                                    <h6>COVID-19(China)</h6>
                                    <h6 style={{ float: 'right' }}>430 rows</h6>
                                    <p>This dataset shows COVID-19 infections in all provinces in China from 2020/3/1 to 2020/3/21. This dataset will help us understand how COVID-19 is spread in China.</p>
                                </div>
                            </div>
                            {/* <div className="dataset-item" onClick={() => this.onSwitchChange(2)}>
                                <div className="thumbnail" ref="dataset2">
                                    <h6>COVID-19(world)</h6>
                                    <h6 style={{ float: 'right' }}>1,494 rows</h6>
                                    <p>This dataset shows COVID-19 infections in all provinces in the world from 2020/3/1 to 2020/3/21. This dataset will help us understand how COVID-19 is spread aroud the world.</p>
                                </div>
                            </div> */}
                            <div className="dataset-item" onClick={() => this.onSwitchChange(2)}>
                                <div className="thumbnail" ref="dataset2">
                                    <h6>Startup Failures</h6>
                                    <h6 style={{ float: 'right' }}>1,234 rows</h6>
                                    <p>This dataset shows the situation of startup failures in China from 2010 to 2019. Each startup company in the data is described from six criteria including its broken year, location, industry, funded status, survival time, and the main cause of failure.</p>
                                </div>
                            </div>
                            {/* <div className="dataset-item" onClick={() => this.onSwitchChange(3)}>
                                <div className="thumbnail" ref="dataset3">
                                    <h6>Sporty</h6>
                                    <h6 style={{ float: 'right' }}>20 rows</h6>
                                    <p></p>
                                </div>
                            </div>
                            <div className="dataset-item" onClick={() => this.onSwitchChange(4)}>
                                <div className="thumbnail" ref="dataset4">
                                    <h6>BMW</h6>
                                    <h6 style={{ float: 'right' }}>45 rows</h6>
                                    <p></p>
                                </div>
                            </div>
                            <div className="dataset-item" onClick={() => this.onSwitchChange(5)}>
                                <div className="thumbnail" ref="dataset5">
                                    <h6>Gold</h6>
                                    <h6 style={{ float: 'right' }}>9,984 rows</h6>
                                    <p></p>
                                </div>
                            </div> */}
                        </div>
                    </TabPane>
                    <TabPane tab="Upload" key="UPLOAD_DATA">
                        <div>
                            <p>Before you upload data, please note that you are agreed to publish a dataset publicly to Calliope for anyone to view, download, and analyze. Please refer to Term of Use for more details.</p>
                            <h3>1. Prepare Data</h3>
                            <p>First, find the dataset (.csv file) that you want to upload. The size limit is 200KB.</p>
                            <ul>
                            <li>If your data is a list of values, please format it into a table with informative column headers and save it as a csv file.</li>
                            <li>If your columns contain temporal data, please format it as "year/month/day" (e.g., 2020/4/30). Note that temporal data only contains information of year, month, or day cannot be recognized.</li>
                            <li>If your columns contain categorical data, please format it as texts (e.g., male, female). Note that the country name is detected as geographic information (e.g., USA, United Kingdom). </li>
                            <li>If your columns contain numerical data, please format it as integer or decimal number.</li>
                            </ul>
                            <h3>2. Upload Data</h3>
                        </div>
                        <Dragger
                            onChange={this.onUploadChange}
                            showUploadList={false}
                            accept=".csv"
                        // action={'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
                        // {...props}
                        >
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Please upload one file at a time
                            </p>
                        </Dragger>
                        <div style={{marginTop: 10}}>
                        <Icon type="paper-clip" style={{ display: currentFileName ? 'inline-block' : 'none', marginRight: 10 }} />{currentFileName}
                        </div>
                    </TabPane>
                </Tabs>
            </Modal>
        )
    }
}
