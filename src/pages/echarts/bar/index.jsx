import React, { Component } from 'react'
// 按需加载
import echarts from "echarts/lib/echarts"
import {Card} from 'antd'
// 导入柱形图
import "echarts/lib/chart/bar"
import "echarts/lib/component/tooltip"
import "echarts/lib/component/title"
import "echarts/lib/component/markPoint"
import "echarts/lib/component/legend"
import ReactEcharts from "echarts-for-react"
// import echartTheme from './../echartTheme'
export default class Bar extends Component {
    componentWillMount (){
        // echarts.registerTheme("Imooc",echartTheme)
    }
    getOption1 = () =>{
        let option ={
           title:{
               text:"用户骑行订单"
           },
           tooltip:{
            trigger:"axis"
           },
           xAxis:{
               data:['周一',"周二","周三","周四","周五","周六","周日"]
           },
           yAxis:{
               type:"value"
           },
           series:[
               {
               name:"订单量",
               type:"bar",
               data:[1000,2000,3000,2000,1000,5000,900]
           }
        ]
        }
        return option
    }
    getOption2 = () =>{
        let option ={
           title:{
               text:"用户骑行订单"
           },
           legend:{
               date:["OFO","摩拜","小蓝"]
           },
           tooltip:{
            trigger:"axis"
           },
           xAxis:{
               data:['周一',"周二","周三","周四","周五","周六","周日"]
           },
           yAxis:{
               type:"value"
           },
           series:[
               {
               name:"摩拜",
               type:"bar",
               data:[1000,2000,3000,2500,4000,5000,9000]
           },
           {
            name:"OFO",
            type:"bar",
            data:[1000,2000,3200,2900,3000,5000,5900]
        },
        {
            name:"小蓝",
            type:"bar",
            data:[1200,2300,3400,2050,1500,5500,2900]
        }
        ]
        }
        return option
    }
    render() {
        return (
            <div>
                <Card title="柱形图表之一">
                   <ReactEcharts option={this.getOption1()}  style={{height:500}}/>
                </Card>
                <Card title="柱形图表之二" style={{marginTop:10}} >
                <ReactEcharts option={this.getOption2()}  style={{height:500}}/>
                </Card>
            </div>
        )
    }
}
