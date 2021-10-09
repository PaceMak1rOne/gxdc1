import React, { Component } from 'react'

import { Card , Button , Table ,Modal, message } from 'antd'

import Axios from '../../axios/index'

import './../ui/ui.less'
import utiles from '../../utiles/utiles'

export default class BasicTable extends Component {
    state={
        dataSource2:[]
    }
    params={
        page:1
    }
    //动态获取mock数据
    request=()=>{
        let _this=this;
        Axios.ajax({
            url:`/admin/table/basic`,
                method:"get",
                data:{
                    params:{
                        page:this.params.page
                    },
                    isShowLoading:true
                }
        }).then(res=>{
            console.log(res,1)
            if(res.code=='0'){
                this.setState({dataSource2:res.result.list,selectedRowKeys:[],selectedRows:null,pagination:utiles.pagenation(res,(current)=>{
                    _this.params.page=current;
                    this.request();
                })})
            }
        })
    }
    onRowClick=(recode,index)=>{
        let selectKey = [index];
        Modal.info({
            title:"信息",
            content:`用户名：${recode.userName}，用户爱好：${recode.interest}`
        })
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:recode
        })
    }
    add = () =>{
        let item = this.state.selectedItem;
        
    }
    handleDelete=()=>{//多选执行删除动作
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map(item=>{
           ids.push(item.id) 
        })
        Modal.confirm({
            title:"删除提示",
            content:`您确定要删除这些数据么？${ids.join(',')}`,
            onOk:()=>{
                message.success("删除成功")
                this.request();
            }
        })
    }
    componentDidMount(){
        this.request()
        const dataSource = [
            {
                id:"0",
                userName:'Jack',
                sex:"1",
                state:"1",
                interest:"1",
                birthsday:"2000-01-01",
                address:"北京市海淀区奥林匹克公园",
                time:"09:00",
                key:"0"
            },
            {
                id:"1",
                userName:'tom',
                sex:"1",
                state:"1",
                interest:"1",
                birthsday:"2000-01-01",
                address:"北京市海淀区奥林匹克公园",
                time:"09:00",
                key:"1"
            },
            {
                id:"2",
                userName:'lisa',
                sex:"0",
                state:"1",
                interest:"1",
                birthsday:"2000-01-01",
                address:"北京市海淀区奥林匹克公园",
                time:"09:00",
                key:"2"
            }
        ]
        this.setState({dataSource})
    }
    render() {
        const columns=[
            {
                title:"id",
                dataIndex:'id'
            },
            {
                title:"用户名",
                dataIndex:'userName'
            },
            {
                title:"性别",
                dataIndex:'sex',
                render(sex){
                    return sex==1?"男":'女'
                }
            },
            {
                title:"状态",
                dataIndex:'state',
                render(state){
                    let config = {
                        "1":"咸鱼一条",
                        "2":"风华浪子",
                        "3":"北大才子",
                        "4":"百度FE",
                        "5":"创业者"

                    }
                    return config[state]
                }
            },
            {
                title:"爱好",
                dataIndex:'interest',
                render(play){
                    let config = {
                        "1":"游泳",
                        "2":"打篮球",
                        "3":"踢足球",
                        "4":"跑步",
                        "5":"爬山",
                        "6":"七星",
                        "7":"桌球",
                        "8":"麦霸"

                    }
                    return config[play]
                }
            },
            {
                title:"生日",
                dataIndex:'birthsday'
            },
            {
                title:"地址",
                dataIndex:'address'
            },
            {
                title:"早起时间",
                dataIndex:'time'
            }
        ]
        const rowSelection={
            type:"radio",
            selectedRowKeys:this.state.selectedRowKeys
        }
        const rowCheckSelection={
            type:"checkbox",
            selectedRowKeys:this.state.selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                // let ids=[]
                // selectedRows.map(item=>{
                //     ids.push(item.id)
                // })
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        return (
            <div>
                <Card className='card-wrap' title='基础表格'>
                    <Table columns={columns} dataSource={this.state.dataSource} bordered pagination={false}  />
                </Card>
                <Card className='card-wrap' title='动态数据渲染表格-Mock'>
                    <Table columns={columns} dataSource={this.state.dataSource2} bordered pagination={false}  />
                </Card>
                <Card className='card-wrap' title='Mock-单选'>
                    <Table 
                    columns={columns} 
                    dataSource={this.state.dataSource2} 
                    bordered pagination={false} 
                    rowSelection={rowSelection}  
                    onRow={(record,index) => {
                        return {
                          onClick: event => {
                              this.onRowClick(record,index)
                          }, // 点击行
                          onMouseEnter: event => {}, // 鼠标移入行
                        };
                      }}
                    />
                </Card>
                <Card className='card-wrap' title='Mock-复选'>
                    <div style={{marginBottom:10}}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table 
                    columns={columns} 
                    dataSource={this.state.dataSource2} 
                    bordered pagination={false} 
                    rowSelection={rowCheckSelection}  
                    onRow={(record,index) => {
                        return {
                          onClick: event => {
                              this.onRowClick(record,index)
                          }, // 点击行
                          onMouseEnter: event => {}, // 鼠标移入行
                        };
                      }}
                    />
                </Card>
                <Card className='card-wrap' title='Mock-表格分页'>
                    <Table 
                    columns={columns} 
                    dataSource={this.state.dataSource2} 
                    bordered 
                    pagination={this.state.pagination} 
                    />
                </Card>
            </div>
        )
    }
}
