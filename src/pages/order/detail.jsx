import React, { Component } from 'react'

import { Card } from 'antd'

import Axios from './../../axios'

import './detail.less'

export default class Detail extends Component {
    state = {

    }
    componentDidMount() {
        let orderId = this.props.match.params.orderId;
        if (orderId) {
            this.getDetailInfo(orderId)
        }
    }
    getDetailInfo = (orderId) => {
        Axios.ajax({
            url: "/order/detail",
            data: {
                params: {
                    orderId: orderId
                }
            }
        })
            .then((res) => {
                if (res.code == 0) {
                    this.setState({
                        orderInfo: res.result
                    })
                    this.renderMap(res.result)
                }
            })
    }
    map = null;
    renderMap = (result) => {
        var map = new BMapGL.Map("orderDetaiMap", { enableMapClick: false });//("container",{enableMapClick:false})
        this.map = map;
        // 创建地图实例 
        var point = new BMapGL.Point(116.404, 39.915);
        // 创建点坐标 
        map.centerAndZoom(point, 15);
        // 初始化地图，设置中心点坐标和地图级别 
        this.addMapControl()//添加地图控件
        this.drawBikeRoute(result.position_list);//调用路线图绘制方法
        this.drawServiceArea(result.area);//调用服务区绘制区域方法
    }
    addMapControl = () => {//添加地图控件
        let map = this.map;
        map.addControl(new BMapGL.ScaleControl())//添加控件
        map.addControl(new BMapGL.CityListControl())//添加控件
        map.addControl(new BMapGL.ZoomControl())//添加控件
        map.addControl(new BMapGL.LocationControl())//添加控件

    }
    drawBikeRoute = (positionList) => {//绘制用户的行驶路线
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if (positionList.length > 0) {
            let first = positionList[0];
            let last = positionList[positionList.length - 1]
            startPoint = new BMapGL.Point(first.lon, first.lat);//起始坐标
            let startIcon = new BMapGL.Icon('/assets/start_point.png', new BMapGL.Size(36, 42), {
                imageSize: new BMapGL.Size(36, 42),
                anchor: new BMapGL.Size(36, 42)
            })//起始坐标图片
            let startMarker = new BMapGL.Marker(startPoint, { icon: startIcon })
            this.map.addOverlay(startMarker)


            endPoint = new BMapGL.Point(last.lon, last.lat);//终点坐标
            let endIcon = new BMapGL.Icon('/assets/end_point.png', new BMapGL.Size(36, 42), {
                imageSize: new BMapGL.Size(36, 42),
                anchor: new BMapGL.Size(36, 42)
            })//终点坐标图片
            let endMarker = new BMapGL.Marker(endPoint, { icon: endIcon })
            this.map.addOverlay(endMarker)


            //绘制路线图
            let trackPoint = [];//所有坐标点
            for (let i = 0; i < positionList.length; i++) {
                let point = positionList[i];
                trackPoint.push(new BMapGL.Point(point.lon, point.lat))
            }

            let polyline = new BMapGL.Polyline(trackPoint, {//绘制折线图
                strokeColor: "#1869AD",
                strokeWeight: 3,
                strokeOpacity: 1
            })
            this.map.addOverlay(polyline)



            this.map.centerAndZoom(endPoint, 15);
        }

    }
    drawServiceArea = (positionList) => {
        //绘制路线图
        let trackPoint = [];//所有坐标点
        for (let i = 0; i < positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new BMapGL.Point(point.lon, point.lat))
        }

        //绘制服务区
        let polygon = new BMapGL.Polygon(trackPoint, {
            strokeColor: "#CE0000",
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: "#ff8605",
            fillOpacity: 0.3
        })
        this.map.addOverlay(polygon)
    }

    render() {
        const info = this.state.orderInfo || {}

        return (
            <div>
                <Card>
                    <div id='orderDetaiMap' className='order-map'></div>
                    <div className='detail-items'>
                        <div className='item-title'>基础信息</div>
                        <ul className='detail-form'>
                            <li>
                                <div className='detail-form-left'>用车模式</div>
                                <div className='detail-form-content'>{info.mode == 1 ? "服务区" : "停车点"}</div>
                            </li>
                            <li>
                                <div className='detail-form-left'>订单编号</div>
                                <div className='detail-form-content'>{info.order_sn}</div>
                            </li>
                            <li>
                                <div className='detail-form-left'>车辆编号</div>
                                <div className='detail-form-content'>{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className='detail-form-left'>用户姓名</div>
                                <div className='detail-form-content'>{info.user_name}</div>
                            </li>
                            <li>
                                <div className='detail-form-left'>手机号码</div>
                                <div className='detail-form-content'>{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                </Card>

                <Card>

                    <div className='detail-items'>
                        <div className='item-title'>行驶轨迹</div>
                        <ul className='detail-form'>
                            <li>
                                <div className='detail-form-left'>行程起点</div>
                                <div className='detail-form-content'>{info.start_location}</div>
                            </li>
                            <li>
                                <div className='detail-form-left'>行程终点</div>
                                <div className='detail-form-content'>{info.end_location}</div>
                            </li>
                            <li>
                                <div className='detail-form-left'>行驶里程</div>
                                <div className='detail-form-content'>{`${info.distance / 1000}`}</div>
                            </li>
                        </ul>
                    </div>
                </Card>

            </div>
        )
    }
}
