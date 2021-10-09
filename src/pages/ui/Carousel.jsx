import React, { Component } from 'react'

import { Card, Carousel } from 'antd'

import './ui.less'

export default class Carousels extends Component {
    onChange = (a, b, c) => {
        console.log(a, b, c);
    }
    render() {
        return (
            <div>
                <Card title='文字背景轮播' className='card-wrap'>
                    <Carousel afterChange={this.onChange}>
                        <div>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>2</h3>
                        </div>
                        <div>
                            <h3>3</h3>
                        </div>
                        <div>
                            <h3>4</h3>
                        </div>
                    </Carousel>
                </Card>
                <Card title='图片背景轮播' className='card-wrap slider-wrap'>
                    <Carousel autoplay effect='fade'  >
                        <div><img src="/carousel-img/carousel-1.jpg" alt="" style={{width:'100%'}} /></div>
                        <div><img src="/carousel-img/carousel-2.jpg" alt="" style={{width:'100%'}} /></div>
                        <div><img src="/carousel-img/carousel-3.jpg" alt="" style={{width:'100%'}} /></div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}
