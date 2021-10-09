import React, { Component } from 'react'
import axios from './../../axios'
import BaseForm from './../../commponents/BaseForm'
import { Card ,Form} from 'antd'
export default class bikeMap extends Component {
    state={}
    formList = [
        {
        type:"CITY",
        label:"城市",
        width: 100,
        placeholder:"全部",
        initialValue:"0",
        list:[{id:"0",name:"全部"},{id:"1",name:"北京"},{id:"2",name:"天津"},{id:"3",name:"上海"}]
    },{
        type:"时间查询",
        placeholder:"选择时间",
    },{
        type:"SELECT",
        label:"订单状态",
        field:"order_status",
        placeholder:"全部",
        initialValue:"0",
        width:100,
        list:[{id:"0",name:"全部"},{id:"1",name:"进行中"},{id:"2",name:"行程结束"}]
    }
]
   requestList = () =>{
       axios.ajax({
           url:"/map/bike_list",
           data:{
               params:this.params
           }
       })
       .then((res)=>{
           if(res.code == 0){
            //    debugger
               this.setState({ 
                total_count : res.result.total_count 
                  });
           }
           this.renderMap(res);
       })
   }

    handleFilterSubmit = (filterParams) =>{
        this.params = filterParams;
        this.requestList();
    }
    // 渲染地图数据
    renderMap = (res) =>{
    // debugger
      let list = res.result.route_list;
      this.map=new window.BMapGL.Map("container");
      let gps1 = list[0].split(",");
      let startPoint = new window.BMapGL.Point(gps1[0],gps1[1])
      let gps2 = list[list.length-1].split(",");
      let endPoint = new window.BMapGL.Point(gps2[0],gps2[1]);
      this.map.centerAndZoom(endPoint,11);
      let startPointIcon = new window.BMapGL.Icon("/assets/start_point.png",new window.BMapGL.Size(36,42),{
          imageSize:new window.BMapGL.Size(36,42),
          anchor:new window.BMapGL.Size(18,42)
      })
      let bikeMarkerStart = new window.BMapGL.Marker(startPoint,{icon:startPointIcon});
      this.map.addOverlay(bikeMarkerStart)
      let endPointIcon = new window.BMapGL.Icon("/assets/end_point.png",new window.BMapGL.Size(36,42),{
        imageSize:new window.BMapGL.Size(36,42),
        anchor:new window.BMapGL.Size(18,42)
      })
      let bikeMarkerEnd = new window.BMapGL.Marker(endPoint,{icon:endPointIcon});
      this.map.addOverlay(bikeMarkerEnd)
      //绘制车辆行驶路线
      let routeList = [];
      list.forEach((item)=>{
              let p = item.split(",");
              routeList.push(new window.BMapGL.Point(p[0],p[1]))
      })
      let polyline = new window.BMapGL.Polyline(routeList, {//绘制折线图
        strokeColor: "#1869AD",
        strokeWeight: 3,
        strokeOpacity: 1
    })
    this.map.addOverlay(polyline)
    // 绘制服务器
    let servicePointList = [];
    let serviceList = res.result .service_list;
    serviceList.forEach((item)=>{
        servicePointList.push(new window.BMapGL.Point(item.lon,item.lat))
     })
     let polyServiceLine = new window.BMapGL.Polyline(servicePointList, {//绘制折线图
        strokeColor: "#ff0000",
        strokeWeight: 4,
        strokeOpacity: 1
    })
    this.map.addOverlay(polyServiceLine);

    // 添加地图中的自行车的坐标
    let bikeList = res.result.bike_list;
    let bikeIcon = new window.BMapGL.Icon("assets/bike.jpg",new window.BMapGL.Size(36,42),{
        imageSize:new window.BMapGL.Size(36,42),
        anchor:new window.BMapGL.Size(18,42)
    })
    bikeList.forEach(item=>{
        let p = item.split(",");
        let point = new window.BMapGL.Point(p[0],p[1]);
        let bikeMarKer = new window.BMapGL.Marker(point,{icon:bikeIcon})
        this.map.addOverlay(bikeMarKer);
    })
    }
    componentWillMount(){
        this.requestList();
        
    }
    render() {
        let {total_count} = this.state
        return (
            <div>
                <Card>
                       <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <div>共{total_count}辆车</div>
                    <div id="container" style={{height:500}}></div>
                </Card>
            </div>
        )
    }
}
