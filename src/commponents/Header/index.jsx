 import React, { Component } from 'react'

import { Row , Col } from 'antd'

import axios from 'axios'

import './index.less'

import Util from './../../utiles/utiles'

import { connect } from 'react-redux'
 class Header extends Component {
    state={
        dataPicture:''
    }
    componentWillMount(){
        this.setState({
            userName:"河畔一脚"
        })
        setInterval(()=>{
            let sysTime=Util.formateDate(new Date().getTime())
            this.setState({sysTime})
        },1000)
        axios.get("https://devapi.qweather.com/v7/weather/now?location=101091101&key=74599e45e4ba43829c8d857edabdcf44")
        .then(res=>{
            if(res.data.code==='200'){
                this.setState({
                    dataPicture:`/assets/TianQibw-64/${res.data.now.icon}.png`,
                    weather:res.data.now.text
                })
            }

        })
        .catch(error=>{
            alert(error.message)
        })
    }
    render() {
        // console.log(this.props)
        let icon=this.state.dataPicture
        const menuType = this.props.menuType;
        return (
            <div className='header'>
                <Row className='header-top'>
                    {
                        menuType?<Col span={6} className='logo'>
                        <img src="/assets/logo-ant.svg" alt="" />
                        <span>IMooc 通用管理系统</span>
                    </Col>:""
                    }
                    <Col span={menuType?18:24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    menuType?"":
                    <Row className='breadcrumb'>
                    <Col span={4} className='breadcrumb-title'>
                        {this.props.menuName}
                    </Col>
                    <Col span={20} className='weather'>
                        <span className='date'>{this.state.sysTime}</span>
                        <span className='weather-img'>
                            <img src={icon} alt="" />
                            
                        </span>
                        <span className='weather-detail'>
                        {this.state.weather}
                        </span>
                    </Col>
                </Row>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log("1",state)
    return {
        menuName:state.menuName
    }
}
export default connect (mapStateToProps) (Header)
