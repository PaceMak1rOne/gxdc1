import React, { Component } from 'react'

import { Row , Col } from 'antd'

import Header from './commponents/Header'

import Footer from './commponents/Footer'

import NavLeft from './commponents/NavLeft'

import Home from './pages/home'

import './style/common.less'

export default class Admin extends Component {
    render() {
        return (
            <Row className='container'>
                <Col span={4} className="nav-left" style={{backgroundColor:"#001529"}}>
                    <NavLeft />
                </Col>
                <Col span={20} className="main">
                    <Header />
                    <Row className="content">
                        {this.props.children}
                    </Row>
                    <Footer />
                </Col>
            </Row>
        )
    }
}
