import React, { Component } from 'react'

import { Card , Button , Spin , Icon , Alert } from 'antd'

import './ui.less'

export default class Loading extends Component {
    render() {
        const icon = <Icon type='loading' style={{fontSize:"44px"}} />
        return (
            <div>
                <Card title='Spin用法' className='card-wrap'>
                    <Spin size='small'  style={{marginRight:20}}/>
                    <Spin size='default'  style={{marginRight:20}}/>
                    <Spin size='large'  style={{marginRight:20}}/>
                    <Spin indicator={icon} style={{marginRight:20}} />
                    <Spin indicator={<Icon type='plus' style={{fontSize:"44px"}} spin={true} />} />
                </Card>
                <Card title='内容遮罩' className='card-wrap' >
                    <Alert message='React' description='欢迎来到React高级实战课程' type='info' style={{marginBottom:10}} />
                    <Alert message='React' description='欢迎来到React高级实战课程' type='warning' style={{marginBottom:10}} />
                    <Spin>
                    <Alert message='React' description='欢迎来到React高级实战课程' type='warning' style={{marginBottom:10}} />
                    </Spin>
                    <Spin tip='加载中...'>
                    <Alert message='React' description='欢迎来到React高级实战课程' type='warning' style={{marginBottom:10}} />
                    </Spin>
                    <Spin tip='加载中...' indicator={<Icon type='loading' />}>
                    <Alert message='React' description='欢迎来到React高级实战课程' type='warning' style={{marginBottom:10}} />
                    </Spin>
                </Card>
            </div>
        )
    }
}
