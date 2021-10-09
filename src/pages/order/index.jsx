import React, { Component } from 'react'

import { Card , Button , Table , Form , Select , Modal , message , DatePicker } from 'antd'

import Utils from '../../utiles/utiles'

import Axios from '../../axios/index'

import BaseForm from '../../commponents/BaseForm'

import ETable from '../../commponents/ETable'

const FormItem=Form.Item;

const Option=Select.Option

export default class Order extends Component {
    state={
        orderInfo:{},
        orderConfirnVisble:false
    }
    params={
        page:1
    }
    formList = [
        {
            type:"SELECT",
            label:"城市",
            field:"city",
            placeholder:"全部",
            initialValue:"1",
            width:80,
            list:[
                {id:"0",name:"全部"},
                {id:"1",name:"北京"},
                {id:"2",name:"天津"},
                {id:"3",name:"上海"}
            ]

        },{
                type:"时间查询",

        },
        {
            type:"SELECT",
            label:"订单状态",
            field:"order_status",
            placeholder:"全部",
            initialValue:"1",
            width:80,
            list:[
                {id:"0",name:"全部"},
                {id:"1",name:"进行中"},
                {id:"2",name:"结束行程"}
            ]

        }
    ]
    requestList=()=>{
        let _this=this
        Axios.requestList(this,'/order/list',this.params)
        // Axios.ajax({
        //     url:"/order/list",
        //     data:{
        //         params:this.params
        //     }
        // })
        // .then(res=>{
        //     let list =res.result.list.map((item,index)=>{
        //         item.key=index;
        //         return item
        //     })
        //     this.setState({
        //         list,
        //         pagination:Utils.pagenation(res,(current)=>{
        //             _this.params.page=current,
        //             _this.requestList()
        //         })
        //     })
        // })
    }
    handleConfirm=()=>{
        let item=this.state.selectedItem;
        if(!item){
            Modal.info({
                title:"信息",
                content:"请选择一条订单进行结束"
            })
            return 
        }
        Axios.ajax({
            url:"/order/ebike_info",
            data:{
                params:{
                    orderId:item.id
                }
            }
        })
        .then((res)=>{
            if(res.code==0){
                this.setState({
                    orderInfo:res.result,
                    orderConfirnVisble:true
                })
            }
        })
        this.requestList()
    }
    handleFinishOrder=()=>{//结束订单
        // let item=this.state.selectedItem;
        Axios.ajax({
            url:"/order/finish_order",
            data:{
                params:1
            }
        })
        .then((res)=>{
            if(res.code==0){
                message.success("订单结束成功")
                this.setState({
                    orderConfirnVisble:false
                })
                this.requestList()
            }
        })
    }
    // onRowClick=(record,index)=>{
    //     let selectKey=[index];
    //     this.setState({
    //         selectedRowKeys:selectKey,
    //         selectedItem:record
    //     })
    // }

    handleFilter=(params)=>{
        this.params=params;
        this.requestList()
    }

    openOrderDetail=()=>{
        let item=this.state.selectedItem;
        if(!item){
            Modal.info({
                title:"信息",
                content:"请选择一条订单"
            })
            return 
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank')
    }

    componentDidMount(){
        this.requestList()
    }

    
    render() {
        const columns=[
            {
                title:"订单编号",
                dataIndex:"order_sn"
            },
            {
                title:"车辆编号",
                dataIndex:"bike_sn"
            },
            {
                title:"用户名",
                dataIndex:"user_name"
            }
            ,
            {
                title:"手机号码",
                dataIndex:"mobile"
            },
            {
                title:"里程",
                dataIndex:"distance",
                render(distance){
                    return distance/1000+"Km"
                }
            },
            {
                title:"行驶时常",
                dataIndex:"total_time"
            },
            {
                title:"状态",
                dataIndex:"status"
            },
            {
                title:"开始时间",
                dataIndex:"start_time"
            },
            {
                title:"结束时间",
                dataIndex:"end_time"
            },
            {
                title:"订单金额",
                dataIndex:"total_fee"
            },
            {
                title:"实付金额",
                dataIndex:"user_pay"
            }
        ]
        const formItemLayout={
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }
        // const selectedRowKeys=this.state.selectedRowKeys
        // const rowSelection={
        //     type:"radio",
        //     selectedRowKeys
        // }
        return (
            <div>
                <Card>
                    {/* <FilterForm /> */}
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type='primary' onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type='primary' style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <ETable 
                    updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                    columns={columns} 
                    dataSource={this.state.list} 
                    // rowSelection={rowSelection}
                    selectedRowKeys={this.state.selectedRowKeys}
                    selectedItem={this.state.selectedItem}
                    selectedIds={this.state.selectedIds}
                    pagination={this.state.pagination} 
                    rowSelection='checkbox'
                    />

                {/* <Table 
                rowSelection={rowSelection}
                columns={columns} 
                dataSource={this.state.list} 
                pagination={this.state.pagination} 
                pagination={false}
                onRow={(record,index) => {
                    return {
                      onClick: event => {
                          this.onRowClick(record,index)
                      }, // 点击行
                      onMouseEnter: event => {}, // 鼠标移入行
                    };
                }}
                 /> */}
                </div>
                <Modal
                title='结束订单'
                visible={this.state.orderConfirnVisble}
                onCancel={()=>{
                    this.setState({
                        orderConfirnVisble:false
                    })
                }}
                onOk={this.handleFinishOrder}
                width={600}
                >
                    <Form layout='horizontal' {...formItemLayout}>
                        <FormItem label='车辆编号'>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>    
                        <FormItem label='剩余电量'>
                            {this.state.orderInfo.battery+"%"}
                        </FormItem>   
                        <FormItem label='行程开始时间'>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置">
                        {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

// class FilterForm extends Component{
//     render(){
//         const { getFieldDecorator }=this.props.form;
//         return (
//             <Form layout='inline'>
//                 <FormItem label='城市'>
//                     {
//                         getFieldDecorator("city_id",{

//                         })(
//                         <Select
//                         placeholder='全部'
//                         style={{width:100}}
//                         >
//                             <Option value=''>全部</Option>
//                             <Option value='1'>北京市</Option>
//                             <Option value='2'>天津市</Option>
//                             <Option value='3'>深圳市</Option>
//                         </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label='订单时间'>
//                     {
//                         getFieldDecorator("start_time",{

//                         })(
//                         <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' />
//                         )
//                     }
                    
//                 </FormItem>
//                 <FormItem>
//                 {
//                         getFieldDecorator("end_time",{

//                         })(
//                         <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' />
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label='订单状态'>
//                     {
//                         getFieldDecorator("order_status",{

//                         })(
//                         <Select
//                         placeholder='全部'
//                         style={{width:100}}
//                         >
//                             <Option value=''>全部</Option>
//                             <Option value='1'>进行中</Option>
//                             <Option value='2'>结束行程</Option>
//                         </Select>
//                         )
//                     }
//                 </FormItem>
                
//                 <FormItem >
//                     <Button type='primary' style={{margin:"0 20px"}}>查询</Button>
//                     <Button >重置</Button>
//                 </FormItem>
//             </Form>
//         )
//     }
// }
// FilterForm=Form.create({})(FilterForm)