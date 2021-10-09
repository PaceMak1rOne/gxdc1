import React, { Component } from 'react'

import { Card , Row , Col , Modal } from 'antd'

export default class Gallery extends Component {
    state={
        visible:false
    }
    openGallery=(item)=>{
        console.log(item)
        this.setState({currentImg:'/gallery/'+item,visible:true})

    }
    render() {
        const imgs = [
            ['1.png','2.png','3.png','4.png','5.png'],
            ['6.png','7.png','8.png','9.png','10.png'],
            ['11.png','12.png','13.png','14.png','15.png'],
            ['16.png','17.png','18.png','19.png','20.png'],
            ['21.png','22.png','23.png','24.png','25.png']
        ]
        const imgList = imgs.map(list=>list.map(item=>
            <Card
            cover={<img src={'/gallery/'+item} style={{marginBottom:10}} onClick={()=>this.openGallery(item)} />}
            >
                <Card.Meta title='React Admin' description='I Love Imooc' />
            </Card>
        ))
        return (
            <div>
                <Row gutter={10} type="flex" justify="center">
                    <Col md={4}>{imgList[0]}</Col>
                    <Col md={4}>{imgList[1]}</Col>
                    <Col md={4}>{imgList[2]}</Col>
                    <Col md={4}>{imgList[3]}</Col>
                    <Col md={4}>{imgList[4]}</Col>
                </Row>
                <Modal
                visible={this.state.visible}
                onCancel={()=>this.setState({visible:false})}
                footer={null}
                width={300}
                title="图片画廊"
                >
                    <img src={this.state.currentImg} style={{width:'100%'}} />
                </Modal>
            </div>
        )
    }
}
