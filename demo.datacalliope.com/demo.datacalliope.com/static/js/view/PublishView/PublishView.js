import React, { Component } from 'react';
import MobileView from '../StoryView/MobileView';
import StorylineWebView from '../StoryView/StorylineWebView';
import FactSheetView from '../StoryView/FactSheetView';
import LayoutType from '../../constant/LayoutType';
import fetchStory from '../../network/fetchStory';
import { url } from '../../network/url';
import * as d3 from 'd3';

export default class PublishView extends Component {
    constructor(props) {
        super(props);
        this.state = { usertitle: "" };
    }

    componentDidMount = async () => {
        this.props.generateStory([], [], '')
        let response = await fetchStory(this.props.storyId);
        let story = JSON.parse(response.data.story)
        let title = story.title;
        this.setState({
            usertitle: title,
            mobilePreTitle: story.mobilePreTitle
        });
        let facts = story.facts;
        let aggregationLevel = story.aggregationLevel;
        this.props.setAggregationLevel(aggregationLevel);
        let schema = story.schema;
        let fileName = response.data.file_name;
        const datasetList = ['CarSales.csv', 'nCoV2020.csv', 'deadstartup.csv'];
        if (datasetList.indexOf(fileName) !== -1) {
            this.props.changeData(fileName);
            this.props.generateStory(facts, [], story.resultCoverage)
        } else {
            this.getUserLocalData(fileName, schema, facts, story.resultCoverage)
            //this.props.generateStory(facts, [], story.resultCoverage)
        }
    }

    getUserLocalData = (fileName, schema, facts, resultCoverage) => {
        // process data according to schema
        let fileURL = url + '/data/' + fileName
        this.process(schema, fileURL)
            .then((data) => {
                this.props.uploadData(fileName, schema, data)
                this.props.generateStory(facts, [], resultCoverage)
            }).catch((reason) => {
                console.log(reason);
            });
    }

    process = (schema, fileURL) => {
        return new Promise((resolve, reject) => {
            let numericalFields = []
            let numerical = schema.filter(d => d.type === "numerical")
            numericalFields = numerical.map(d => d.field)
            d3.csv(fileURL)
                .then(function (data) {
                    data.forEach((d, i) => {
                        for (let key in d) {
                            if (numericalFields.indexOf(key) !== -1) {
                                d[key] = parseFloat(d[key])
                            }
                        }
                    })
                    resolve(data);
                }).catch(function (error) {
                    reject(error);
                })
        });
    }

    render() {
        let { layout, facts } = this.props;
        const { usertitle, mobilePreTitle } = this.state;
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
            case LayoutType.STORYLINE_WEB:
                storyview = <StorylineWebView forPublish={true}  {...this.props} wholeFacts={this.props.facts} facts={aggfacts} usertitle={usertitle}/>
                break;
            case LayoutType.SLIDER_MOBILE:
                storyview = <MobileView {...this.props} forPublish={true} usertitle={usertitle} mobilePreTitle={mobilePreTitle}/>
                break;
            case LayoutType.FACTSHEET:
                storyview = <FactSheetView {...this.props} forPublish={true} usertitle={usertitle}/>
                break;

            default:
                break;
        }
        return (
            <div>
                {storyview}
            </div>
        )
    }
}
