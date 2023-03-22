import React from "react";
import * as d3 from "d3";
import { Button } from 'antd';



class Relationship extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dataset:[{cx:60,cy:40},{cx:200,cy:80},{cx:300,cy:180}]
        }
    }

    drawModel = () => {
        let { dataset } = this.state;
        let oWrapper = this.refs.wrapper;
        let width = 500;
        let height = 500;
        d3.selectAll('svg').remove()
        let svg = d3.select(oWrapper)
        .append('svg')
        .attr('width',width)
        .attr('height',height);

        function draw(){
            let updataCircle = svg.selectAll('circle')
            .data(dataset)
            let enterCircle = updataCircle.enter();
            let exitCircle = updataCircle.exit();
            updataCircle.attr('fill','red')
            .attr('r','30')
            .attr('cx',function(d){ return d.cx;})
            .attr('cy',function(d){ return d.cy;})
            .attr('fill','red')

            enterCircle.append('circle')
            .attr('cx',function(d){ return d.cx;})
            .attr('cy',function(d){ return d.cy;})
            .attr('r','30')
            .attr('fill','red')

            exitCircle.remove()

        }

        draw();

    }

    componentDidMount() {
        this.drawModel();
    }

    handleAdd = () => {
        let { dataset } = this.state;
        dataset.push({ cx:Math.random() * 100 + 20,cy:Math.random() * 100 + 20})

        this.setState({
        dataset:dataset
        })

        this.drawModel();

    }

    handleDel = () => {
        let { dataset } = this.state;
        dataset.pop();
        this.setState({
        dataset:dataset
        })

        this.drawModel();

    }

    render(){
        return (
            <div ref='wrapper'>
                <Button onClick={this.handleAdd}>添加数据</Button>
                <Button onClick={this.handleDel}>删除数据</Button>
            </div>
        )
    }
}

export default Relationship;