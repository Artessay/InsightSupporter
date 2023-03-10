import React  from "react";
import 'antd/dist/antd.min.css';//显示样式，不加显示不出来
import "./style.css";
import { Layout } from 'antd';
import { Link } from "react-router-dom";
const { Header } = Layout;      //使用前定义，不加大括号会没有样式

export default class Head extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.current);
    }
    render() {
        return(
            <Layout>
                <Header className="header">
                    <div className="navbar">
                        <Link to="/home" className="title">网络安全虚拟实验平台管理系统</Link>
                    </div>
                </Header>
            </Layout>
        )
    }
}
