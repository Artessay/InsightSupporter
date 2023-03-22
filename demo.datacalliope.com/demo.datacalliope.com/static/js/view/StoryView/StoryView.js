import React, { Component } from 'react';
import { Select, Button, Modal, Input, Icon, message } from 'antd';
import LayoutType from '../../constant/LayoutType';
import StorylineWebView from './StorylineWebView';
import FactSheetView from './FactSheetView';
import MobileView from './MobileView';
import TextView from './TextView';
import TableView from './TableView';
import { getPublishLink, getEmbedLink } from '../../tool/publish'
import shareStory from '../../network/shareStory';
import { genTitle } from './MobileView/helper'
import './storyview.css';

const { Option } = Select;

export default class StoryView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            layout: LayoutType.STORY_TEXT,
            isShareModalVisible: false,
            publishLink: '',
            embedLink: '',
            title: genTitle(this.props.fileName),
            mobilePreTitle: 'The story of'
        }
    }

    changeMobilePreTitle = (value) => {
        this.setState({
            mobilePreTitle: value
        })
    }

    changeLayout = (value) => {
        this.setState({
            layout: value
        })
    }

    showShareModal = async () => {
        let story = {
            "title": this.props.title,
            "mobilePreTitle": this.state.mobilePreTitle,
            "schema": this.props.schema,
            "facts": this.props.facts,
            "aggregationLevel": this.props.aggregationLevel,
            "storyParameter": this.props.storyParameter,
            "resultCoverage": this.props.resultCoverage
        }
        let response = await shareStory(this.props.fileName, story);
        let storyId = response.data.public_id
        this.setState({
            isShareModalVisible: true,
            publishLink: getPublishLink(this.state.layout) + storyId,
            embedLink: getEmbedLink(this.state.layout).replace('{{storyId}}', storyId)
        });
    };

    handleShareCancel = e => {
        this.setState({
            isShareModalVisible: false,
        });
    };

    copy(e) {
        const copyEle = document.querySelector(e) // 获取要复制的节点
        const range = document.createRange(); // 创造range
        window.getSelection().removeAllRanges(); //清除页面中已有的selection
        range.selectNode(copyEle); // 选中需要复制的节点
        window.getSelection().addRange(range); // 执行选中元素
        const copyStatus = document.execCommand("Copy"); // 执行copy操作
        // 对成功与否定进行提示
        if (copyStatus) {
            message.success('copied successfully');
        } else {
            message.fail('copied failed');
        }
        window.getSelection().removeAllRanges(); //清除页面中已有的selection
    }

    render() {
        const { layout, publishLink, embedLink } = this.state;
        let { facts } = this.props;
        facts = facts.map((x, index)=>{
            x.index = index;
            return x
        })
        let aggfacts = facts.filter(e => {
            if (!e.aggregated) {
                return true
            } else {
                return e.aggregated && e.aggregatedFact
            }
        })
        
        let storyview;
        switch (layout) {
            case LayoutType.STORY_TEXT:
                storyview = <TextView {...this.props} />
                break;
            case LayoutType.TABLE:
                storyview = <TableView {...this.props} />
                break;
            case LayoutType.STORYLINE_WEB:
                storyview = <StorylineWebView forPublish={false} {...this.props} wholeFacts={this.props.facts} facts={aggfacts}/>
                break;
            case LayoutType.SLIDER_MOBILE:
                storyview = <div id='mobile-view' style={{ height: 589, width: 300, margin: '0 auto' }}><MobileView {...this.props} forPublish={false} mobilePreTitle={this.state.mobilePreTitle} changeMobilePreTitle={this.changeMobilePreTitle}/></div>
                break;
            case LayoutType.FACTSHEET:
                storyview = <FactSheetView {...this.props} forPublish={false}/>
                break;

            default:
                break;
        }
        return (
            <div id='storyview' className='pane'>
                <div className='header'>View</div>
                <div style={{ margin: 5, display: 'inline-block' }}>
                    {/* <span>Layout</span> */}
                    <span>
                        <Select defaultValue="summary" style={{ width: 200 }} onChange={this.changeLayout}>
                            <Option value={LayoutType.STORY_TEXT}>summary</Option>
                            <Option value={LayoutType.TABLE}>table</Option>
                            <Option value={LayoutType.STORYLINE_WEB}>storyline</Option>
                            <Option value={LayoutType.SLIDER_MOBILE}>mobile</Option>
                            <Option value={LayoutType.FACTSHEET}>factsheet</Option>
                        </Select>
                    </span>
                </div>
                <div style={{ margin: '5px', display: (this.state.layout === LayoutType.STORY_TEXT || this.state.layout === LayoutType.TABLE) ? 'none' : 'block', float: 'right', }}>
                    <Button onClick={this.showShareModal}>
                        <Icon type="share-alt" />
                        Share
                    </Button>
                    <Modal
                        title="Share and More…"
                        visible={this.state.isShareModalVisible}
                        onOk={this.handleShareOk}
                        onCancel={this.handleShareCancel}
                        footer={null}
                    >
                        <div>
                            <h4 style={{ fontWeight: 600 }}>Link to this view</h4>
                            <Input placeholder="https://datacalliope.com/" value={publishLink} className="publishLink" style={{display:'inline-block', width:'90%'}}/>
                            <Button onClick={()=>this.copy('.publishLink')} style={{display:'inline-block', position:'relative', top:-1}}><Icon
                                type="copy"
                                 />
                            </Button>
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <h4 style={{ fontWeight: 600 }}>Embed this view</h4>
                            <Input placeholder="https://datacalliope.com/" value={embedLink} className="embedLink" style={{display:'inline-block', width:'90%'}}/>
                            <Button onClick={()=>this.copy('.embedLink')} style={{display:'inline-block', position:'relative'}}><Icon
                                type="copy"
                                 />
                            </Button>
                        </div>
                    </Modal>
                </div>

                <div>
                    {storyview}
                </div>
            </div >
        )
    }
}
