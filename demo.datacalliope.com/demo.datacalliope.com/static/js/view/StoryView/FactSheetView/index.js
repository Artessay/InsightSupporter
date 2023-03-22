import React, { Component } from 'react'
import uuidv4 from 'uuid/v4';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ReactResizeDetector from 'react-resize-detector';
import ReactToPrint from 'react-to-print';
import Draggable from 'react-draggable';
import { Radio, Icon, Button } from 'antd';
import './index.css';
import _ from 'lodash';
import { normalized} from './helper'
import { factDistance } from '../../../tool/distance'
import FactSheet from './FactSheet' 
export default class FactSheetView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            containerWidth: 0,
            zoomState: 'ZoomOut'
            // statusScroll: 'unableScroll',
        }
        this.componentRef = React.createRef();
        this.zoomRef = React.createRef();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    factDis(prevFact, nextFact) {
        let _prev = prevFact.aggregated && prevFact.aggregatedFact ? [prevFact, prevFact.aggregatedFact]:[prevFact]
        let _next = nextFact.aggregated && nextFact.aggregatedFact ? [nextFact, nextFact.aggregatedFact]:[nextFact]
        let diss = []
        _prev.forEach((p)=>{
            _next.forEach((n)=>{
                diss.push(factDistance(p, n))
            })
        })
        return _.min(diss)
    }
    calculate_(relations, facts) {
        if (facts.length === 0 || facts[0] === undefined) return
        function addOne(arr, res, final) {
            if (arr.length === 0) {
                final.push(res);
                return
            }
            _.range(1, 4).forEach((i) => {
                let c = arr.slice(0, i);
                if (c.length < i) return
                let temp_arr = arr.slice(i)
                let res_temp = [...res]
                res_temp.push(c)
                addOne(temp_arr, res_temp, final)
            })
        }
        let _res = [], result = [];
        addOne(_.range(0, facts.length), _res, result)
        result = result.filter((r) => {
            return r.length <= _.max([r.length>2?2:1, Math.round(facts.length / 2)])
        })
        let _result = result.filter((r) => {
            return r.length <=5
        })
        // console.log(_result)
        if(_result.length!==0) { // 可以塞下5行
            result = _result
        }
        // 取最大score
        let max_score = Math.max.apply(Math, facts.map(f => {
            return f.score;
        }));
        // 处理result的布局排列, 其中result[i]是一种排列方式
        let compare_list = [], num_list = [];
        let area_list = []
        // let results_line = []
        // let results_multi = [];
        result.forEach((_result, index) => {
            let sim_avg_line = [], sim_cross_line = []
            _result.forEach((r, index)=>{
                // r是一行
                for(let _i=1; _i<r.length; _i++) {
                    sim_avg_line.push(this.factDis(facts[r[_i-1]], facts[r[_i]]))
                    // sim_avg_line.push(factDistance(facts[r[_i-1]], facts[r[_i]]))
                }
                if(index !== _result.length-1)   sim_cross_line.push(factDistance(facts[r[r.length-1]], facts[r[r.length-1]+1])) 
            })
            let m_DBI = _result.length === 1 ? 0 : _.mean(sim_cross_line)? _.mean(sim_cross_line):0 - _.mean(sim_avg_line);
            // 处理具体布局
            // let area_temps = [[]];
            let area_temp = [];
            _result.forEach((r) => {

                // r是单行
                if (r.length === 3) {
                    area_temp.push(..._.times(3, _.constant(2)))
                } else if (r.length === 1) {
                    area_temp.push(6)
                } else {
                    let _relation = relations[r[1]]
                    if (_relation === 'generalization') { //1:2
                        area_temp.push(2)
                        area_temp.push(4)
                    } else if (_relation === 'elaboration') {
                        area_temp.push(4)
                        area_temp.push(2)
                    } else {
                        area_temp.push(..._.times(2, _.constant(3)))
                    }
                }
                // if (r.length === 3) {
                //     // area_temp.push(..._.times(3, _.constant(2)))
                //     area_temps.forEach(function(part, index, area_temps) {
                //         area_temps[index].push(..._.times(3, _.constant(2)))
                //       });
                // } else if (r.length === 1) {
                //     // area_temp.push(6)
                //     area_temps.forEach(function(part, index, area_temps) {
                //         area_temps[index].push(6)
                //     });
                // } else {
                //     let temp0 = _.cloneDeep(area_temps)
                //     let temp1 = _.cloneDeep(area_temps)
                //     let temp2 = _.cloneDeep(area_temps)
                //     temp0.forEach(function(part, index, temp0) {
                //         temp0[index].push(2.1)
                //         temp0[index].push(4)
                //     });
                //     temp1.forEach(function(part, index, temp1) {
                //         temp1[index].push(4)
                //         temp1[index].push(2.1)
                //     });
                //     temp2.forEach(function(part, index, temp2) {
                //         temp2[index].push(3)
                //         temp2[index].push(3)
                //     });
                //     area_temps = temp0.concat(temp1, temp2)
                // }
            })
            area_list.push(area_temp)
            // area_temps.forEach((area_temp)=>{
                let s = 0;
                for (let i = 0; i < facts.length; i++) {
                    let _score = normalized(facts[i].score, max_score, 0) ? normalized(facts[i].score, max_score, 0) : 0
                    s += _score * (area_temp[i]===2.1?2:area_temp[i])
                }
                s = s / (_result.length * 6)
                m_DBI = normalized(m_DBI, 1, -1)
                
                compare_list.push(s + m_DBI)
                num_list.push([s, m_DBI])
            // })
            // results_line.push(...area_temps)
            // for (let i = 0; i < area_temps.length; i++) results_multi.push(_result);
        })
        // let final_layout = results_line[_.indexOf(compare_list, _.max(compare_list))]
        // let factStyle = {};
        // final_layout.forEach((perFact, index) => {
        //     if (perFact === 2) { // 3个并列
        //         factStyle[index] = '2p3'
        //     } else if (perFact === 6) { // 单个
        //         factStyle[index] = '6p'
        //     } else if (perFact === 2.1) { // 单个
        //         factStyle[index] = '2p'
        //     } else if (perFact === 4) { // 单个
        //         factStyle[index] = '4p'
        //     } else if (perFact === 3) { // 单个
        //         factStyle[index] = '3p'
        //     } 
        // })
        let final_layout = result[_.indexOf(compare_list, _.max(compare_list))]
        let factStyle = {};
        final_layout.forEach((perLine, index) => {
            if (perLine.length === 3) { // 3个并列
                perLine.forEach((factId) => {
                    factStyle[factId] = '2p3'
                })
            } else if (perLine.length === 1) { // 单个
                factStyle[perLine[0]] = '6p'
            } else { //2个并列
                let _relation = relations[perLine[1]]
                if (_relation === 'generalization') { //1:2
                    factStyle[perLine[0]] = '2p'
                    factStyle[perLine[1]] = '4p'
                } else if (_relation === 'elaboration') {
                    factStyle[perLine[0]] = '4p'
                    factStyle[perLine[1]] = '2p'
                } else {
                    factStyle[perLine[0]] = '3p'
                    factStyle[perLine[1]] = '3p'
                }
            }
        })
        let last_in_line5 = -1;
        if(final_layout.length > 5) {
            last_in_line5 = final_layout[4].slice(-1)[0]
        }
        return [factStyle, final_layout.length, last_in_line5]
        // let last_in_line5 = -1;
        // if(results_multi[_.indexOf(compare_list, _.max(compare_list))].length > 5) {
        //     last_in_line5 = results_multi[_.indexOf(compare_list, _.max(compare_list))][4].slice(-1)[0]
        // }
        // return [factStyle, results_multi[_.indexOf(compare_list, _.max(compare_list))].length, last_in_line5]
    }
    // handle container div width change
    onResize = (handleWidth) => {
        this.setState({containerWidth: handleWidth},
            ()=>{if(!this.props.forPublish && this.zoomRef.state.value === 'ZoomIn') {
                    this.zoomChange('ZoomIn', this.state.containerWidth, 0, this.zoomRef.props.transform, 'zoom')
                }
            }
        )
    }

    setScroll = (status) => {
        var setGrabbingVar = setGrabbing(this.container);
        var setGrabVar = setGrab(this.container);
        function setGrabbing(container) {
            container.style.cursor = 'grabbing'
        }
        function setGrab(container) {
            container.style.cursor = 'grab'
        }
        this.container.scrollTop = 0;
        this.container.style.overflowY = status ? 'scroll' : 'hidden';
        this.container.style.cursor = status ? 'grab' : 'default';
        if(status) {
            this.container.addEventListener('mousedown', setGrabbingVar);
            this.container.addEventListener('mouseup', setGrabVar)
        } else {
            this.container.removeEventListener('mousedown', setGrabbingVar);
            this.container.removeEventListener('mouseup', setGrabVar)
        }
    }


    zoomChange(value, width, duration, setTransform, why) {
        
        let wid_origin = 825
        if(value === 'ZoomIn') {
            if(why === 'radio' ) this.setScroll(true); 
            let originX = (width/wid_origin)>=1 ? -(Math.abs(width-wid_origin))/2*(width/wid_origin) : 0
            setTransform(originX, 0, `${(width/wid_origin)}`, duration, 'easeOut');
            this.setState({
                zoomState: 'ZoomIn'
            })
        } else {
            this.setScroll(false);
            this.zoomRef.props.transform((width)/4, 0, 589/1166, duration, 'easeOut');
            this.setState({
                zoomState: 'ZoomOut'
            })
        }
        this.dragFS.props.children.props.children.props.componentRef.current.offsetParent.style.transform="translate(0px, 0px)"
    }

    

    render() {
        let { facts, relations } = this.props;
        let _count =0;
        facts.forEach(fact=>{
            if((fact.measure.length===0 && fact.subspace.length===0 && fact.groupby.length===0&& fact.focus.length===0&&fact.parameter.length===0)) {
                _count+=1;
            }
        })
        if(_count === facts.length) {
            facts = []
        }
        let events = facts.map(function (x, i) { 
            return {
                id: uuidv4(),
                index: i,
                fact: x,
                relation: relations[i]
            }
        });
        events = events.filter(e => {
            if (!e.fact.aggregated) {
                return true
            } else {
                return e.fact.aggregated && e.fact.aggregatedFact
            }
        })
        facts = events.map(function(x, i) {
            return x.fact
        })
        relations = events.map(function(x, i) {
            return x.relation
        })
        
        let [factStyle, factLine, last_in_line5] = this.calculate_(relations, facts) || [{}, 0, -1]

        events = last_in_line5 !== -1 ? events.slice(0, last_in_line5+1) : events
        factLine = last_in_line5 !== -1 ? 5 : factLine

        let slotMarginTop = _.min([(1000 - factLine*200) / (factLine), 20])
        slotMarginTop = slotMarginTop === 0 ? 6 : slotMarginTop
        let slotHeight = factLine === 5 ? 200 : (1000 - slotMarginTop*factLine) / factLine
        const title = this.props.fileName.split('.')[0].toUpperCase();
        
        return (
            <div>
            <ReactResizeDetector handleWidth onResize={this.onResize} />
                <div className="factsheetContainer" ref={el=>(this.container=el)} style={{ height: `${this.props.forPublish ? '' : '589px'}`, width: `${this.state.containerWidth}px`, backgroundColor: '#fff', margin: '0 auto' }}>
                    { !this.props.forPublish ? (<TransformWrapper
                        defaultScale={589/1166}
                        positionX={this.state.zoomState === 'ZoomOut' ? (this.state.containerWidth)/4 : (this.state.containerWidth/825)>=1 ? -(Math.abs(this.state.containerWidth-825))/2*(this.state.containerWidth/825) : 0} 
                        defaultPositionY={0}
                        options={{
                            limitToBounds: false, minScale: 589/1166, centerContent:false
                        }}
                        pan={{
                            disabled: true, 
                            lockAxisX: true,
                            lockAxisY: false,
                            velocityEqualToMove: true,
                            enableVelocity: true
                        }}
                        wheel={{
                            wheelEnabled: false,
                            touchPadEnabled: false
                        }}
                        doubleClick={{disabled: true}}
                    >
                        {({ setTransform, resetTransform, setDefaultState }) => (
                            <React.Fragment>
                                <div className="tools">
                                    <Radio.Group ref={el=> this.zoomRef = el} defaultValue="ZoomOut" onChange={(e)=>this.zoomChange(e.target.value, this.state.containerWidth, 0, setTransform, 'radio')} transform={setTransform} reset={resetTransform} re={setDefaultState}>
                                        <Radio.Button value="ZoomOut" ><Icon type="column-height" /></Radio.Button>
                                        <Radio.Button value='ZoomIn' ><Icon type="column-width" /></Radio.Button>
                                    </Radio.Group>
                                    <ReactToPrint
                                        trigger={() => <Button><Icon type="printer" /></Button>}
                                        content={() => this.componentRef.current}
                                    />
                                </div>
                                {/* <div style={{width: `${this.state.containerWidth}px`, height: '1166px'}}> */}
                                <TransformComponent style={{margin: '0 auto'}}>
                                    <Draggable defaultPosition={{x: 0, y: 0}} axis="y" cancel=".fs_edit" enableUserSelectHack={true} ref={el=>this.dragFS=el}>
                                    <div style={{width: `${this.state.containerWidth}px`, height: `${this.state.containerWidth/825 * 1166}px`, minHeight: `${this.props.forPublish ? '' : '589px'}`}}>
                                    {/* <div style={{width: `2480px`, height: `3508px`, minHeight: `${this.props.forPublish ? '' : '589px'}`}}> */}
                                        <FactSheet componentRef={this.componentRef} slotMarginTop={slotMarginTop} events={events} slotHeight={slotHeight} factLine={factLine} title={title} factStyle={factStyle} {...this.props}/>
                                    </div>
                                    </Draggable>
                                </TransformComponent>
                            </React.Fragment>
                        )}
                    </TransformWrapper>) : (
                        <FactSheet componentRef={this.componentRef} slotMarginTop={slotMarginTop} events={events} slotHeight={slotHeight} factLine={factLine} title={title} factStyle={factStyle} {...this.props}/>
                    )}
                </div>
            </div>
        )
    }
}
