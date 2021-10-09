import React, { Component } from 'react'
// 按需加载
import echarts from "echarts/lib/echarts"
import {Card} from 'antd'
// 导入柱形图
import "echarts/lib/chart/line"
import "echarts/lib/component/tooltip"
import "echarts/lib/component/title"
import "echarts/lib/component/markPoint"
import "echarts/lib/component/legend"
import ReactEcharts from "echarts-for-react"
// import echartTheme from './../echartTheme'
export default class Line extends Component {
    getOption1 = ()=>{
        let option={
            title:{
                text:"用户骑行订单"
            },
            tooltip:{
                trigger:"axis",
               },
               yAxis:{
                   type:"value"
               },
               xAxis:{
                type: 'category',
                data:['周一',"周二","周三","周四","周五","周六","周日"]
               },
            series:[
                {
                    name:"订单量",
                    type:"line",
                    data:[
                        1000,2000,3000,3300,2000,2600,1200
                    ]
                }
            ]
        }
        return option
    }
    getOption2 = ()=>{
        let option={
            title:{
                text:"用户骑行订单"
            },
            legend:{
                orient:"vertical",
                right:10,
                top:10,
            },
            tooltip:{
                trigger:"axis",
               },
               yAxis:{
                   type:"value"
               },
               xAxis:{
                type: 'category',
                data:['周一',"周二","周三","周四","周五","周六","周日"]
               },
            series:[
                {
                    name:"OFO订单量",
                    type:"line",
                    data:[
                        1200,2500,3300,3100,2300,2900,2200
                    ]
                },
                {
                    name:"摩拜订单量",
                    type:"line",
                    data:[
                        1000,2000,3000,3300,2000,2600,1200
                    ]
                },
                 {
                    name:"小蓝订单量",
                    type:"line",
                    data:[
                        1030,2200,2000,3300,2010,2100,1550
                    ]
                }
            ]
        }
        return option
    }
    getOption3 = ()=>{
        let option={
            title:{
                text:"用户骑行订单"
            },
            legend:{
                orient:"vertical",
                right:10,
                top:10,
            },
            tooltip:{
                trigger:"axis",
               },
               yAxis:{
                   type:"value"
               },
               xAxis:{
                type: 'category',
                boundaryGap: false,
                data:['周一',"周二","周三","周四","周五","周六","周日"]
               },
            series:[
                {
                    name:"OFO订单量",
                    type:"line",
                    data:[
                        1200,2500,3300,3100,2300,2900,2200
                    ],
                    areaStyle: {},
                }
            ]
        }
        return option
    }
    render() {
        return (
            <div>
                <Card title="折线形图表之一">
                   <ReactEcharts option={this.getOption1()}  style={{height:500}}/>
                </Card>
                <Card title="折线图表之二" style={{marginTop:10}} >
                <ReactEcharts option={this.getOption2()}  style={{height:500}}/>
                </Card>
                <Card title="折线图表之三" style={{marginTop:10}} >
                <ReactEcharts option={this.getOption3()}  style={{height:500}}/>
                </Card>
            </div>
        )
    }
}
