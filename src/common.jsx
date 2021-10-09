import React, { Component } from 'react'

import { Row } from 'antd'

import Header from './commponents/Header'

import './style/common.less'

export default class Commone extends Component {
    render() {

        return (
            <div>
                <Row className='simple-page'>
                    <Header menuType='second' />
                </Row>
                
                <Row className="content">
                    {this.props.children}
                </Row>
            </div>
        )
    }
}
