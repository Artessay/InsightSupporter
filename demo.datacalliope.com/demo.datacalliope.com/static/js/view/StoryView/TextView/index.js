import React, { Component } from 'react';
import { Progress } from 'antd';
import Color from '../../../constant/Color';
import { genStoryText } from '../../../sentencer/index';
import demo from '../../../demo';

export default class TextView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facts:demo.facts,
            relations: demo.relations
        }
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            relations: nextProps.relations,
            facts: nextProps.facts
          };
    }
    
    shouldComponentUpdate(nextProps) {
        let relationUpdate = nextProps.relations.toString() !== this.state.relations.toString()
        let factUpdate = nextProps.facts !== this.state.facts
        return relationUpdate || factUpdate
    }

    render() {
        const { facts, relations, resultCoverage, storyParameter, manual } = this.props;
        let averageFactScore = (facts.map(x => x.score).reduce((a, b) => a + b, 0)) / facts.length;
        if(!averageFactScore) averageFactScore = 0
        // //Backup: relation
        // let relationText = ''
        // for (const relation of relations) {
        //     if (relation === 'none') {
        //         relationText += relation
        //     } else {
        //         relationText += ('=>'+relation)
        //     }
        // }
        // console.log(relationText);
        // console.log(facts);
        let text = genStoryText(facts, relations);

        if (manual) {
            return (
                <div style={{ height: '100%', width: 500, margin: '0 auto', fontSize: 16 }}>
                    <h2>Story</h2>
                    <div style={{ height: 500, width: 500, overflowY: 'auto'}}>
                        <p>{text}</p>
                    </div>
                </div>
            )
        }

        return (
            <div style={{ height: '100%', width: 500, margin: '0 auto', fontSize: 16 }}>
                <h2>Summary</h2>
                <p>
                    This generated data story includes <b>{facts.length}</b> facts.
                    The average importance score is <b>{parseInt(averageFactScore * 1000) / 1000}</b> bit and the data coverage is <b>{parseInt(resultCoverage * 10000) / 100}%</b>.
                </p>
                <div style={{ width: 380 }}>
                    <Progress strokeColor={Color.BLUE} percent={(facts.length/storyParameter.maxStoryLength * 100) } format={() => `${facts.length} facts (${facts.length}/${storyParameter.maxStoryLength})`} />
                    <Progress strokeColor={Color.BLUE} percent={(resultCoverage * 10000) / 100} format={percent => `coverage ${parseInt(percent*10)/10} %`} />
                    {/* <Progress strokeColor={Color.BLUE} percent={parseInt(averageFactScore * 100)} format={() => `importance ${parseInt(averageFactScore * 1000)/1000}`} /> */}
                </div>
                {/* <h2>Relation</h2>
                <p>{relationText}</p> */}
                <br/>
                <h2>Story</h2>
                <div style={{ height: 320, width: 500, overflowY: 'auto'}}>
                    <p>{text}</p>
                </div>
            </div>
        )
    }
}
