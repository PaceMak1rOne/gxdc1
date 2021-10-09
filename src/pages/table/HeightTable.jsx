import React, { Component } from 'react'

import { Card , Table , Modal , Button , message , Badge } from 'antd'

import Axios from '../../axios'

import Utils from './../../utiles/utiles'

export default class HeightTable extends Component {
    state={
        dataSource:[]
    }
    params={
        page:1
    }
    //动态获取mock数据
    request=()=>{
        let _this=this;
        Axios.ajax({
            url:`/admin/table/high`,
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
                this.setState({dataSource:res.result.list})
    }})
}

    componentDidMount(){
        this.request()
    }
    handleChange=(pagination,filers,sorter)=>{
        this.setState({
            sortOrder:sorter.order
        })
    }
    handleDelete=(item)=>{//删除操作
        let id = item.id
        Modal.confirm({
            title:"确认",
            content:"您确认要删除此条数据么？",
            onOk:()=>{
                message.success("删除成功")
                this.request();
            }
        })
    }
    render() {
        const columns=[
            {
                title:"id",
                dataIndex:'id',
                width:80
            },
            {
                title:"用户名",
                dataIndex:'userName',
                width:80
            },
            {
                title:"性别",
                dataIndex:'sex',
                render(sex){
                    return sex==1?"男":'女'
                },
                width:80
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
                },
                width:80
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
                },
                width:80
            },
            {
                title:"生日",
                dataIndex:'birthsday',
                width:120
            },
            {
                title:"地址",
                dataIndex:'address',
                width:120
            },
            {
                title:"早起时间",
                dataIndex:'time',
                width:80
            }
        ]
        const columns2=[
            {
                title:"id",
                dataIndex:'id',
                width:80,
                fixed:"left"
            },
            {
                title:"用户名",
                dataIndex:'userName',
                width:80,
                fixed:"left"
            },
            {
                title:"性别",
                dataIndex:'sex',
                render(sex){
                    return sex==1?"男":'女'
                },
                width:80
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
                },
                width:80
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
                },
                width:80
            },
            {
                title:"生日",
                dataIndex:'birthsday',
                width:120
            },
            {
                title:"生日",
                dataIndex:'birthsday',
                width:120
            },
            {
                title:"生日",
                dataIndex:'birthsday',
                width:120
            },
            {
                title:"生日",
                dataIndex:'birthsday',
                width:120
            },
            {
                title:"生日",
                dataIndex:'birthsday',
                width:120
            },
            {
                title:"生日",
                dataIndex:'birthsday',
                width:120
            },
            {
                title:"生日",
                dataIndex:'birthsday',
                width:120
            },
            {
                title:"生日",
                dataIndex:'birthsday',
                width:120
            },
            {
                title:"生日",
                dataIndex:'birthsday',
                width:120
            },
            {
                title:"生日",
                dataIndex:'birthsday',
                width:120
            },
            {
                title:"地址",
                dataIndex:'address',
                width:120
            },
            {
                title:"早起时间",
                dataIndex:'time',
                width:80,
                fixed:"right"
            }
        ]
        const columns3=[
            {
                title:"id",
                dataIndex:'id',
            },
            {
                title:"用户名",
                dataIndex:'userName',
            },
            {
                title:"性别",
                dataIndex:'sex',
                render(sex){
                    return sex==1?"男":'女'
                },
            },
            {
                title:"年龄",
                dataIndex:'age',
                sorter:(a,b)=>{
                    return a.age-b.age
                },
                sortOrder:this.state.sortOrder
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
                },
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
                },
            },
            {
                title:"生日",
                dataIndex:'birthsday',
            },
            {
                title:"地址",
                dataIndex:'address',
            },
            {
                title:"早起时间",
                dataIndex:'time',
            }
        ]
        const columns4=[
            {
                title:"id",
                dataIndex:'id',
            },
            {
                title:"用户名",
                dataIndex:'userName',
            },
            {
                title:"性别",
                dataIndex:'sex'
            },
            {
                title:"年龄",
                dataIndex:'age',
                sorter:(a,b)=>{
                    return a.age-b.age
                },
                sortOrder:this.state.sortOrder
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
                },
            },
            {
                title:"爱好",
                dataIndex:'interest',
                render(play){
                    let config = {
                        "1":<Badge status='success' text='成功' />,
                        "2":<Badge status='error' text="报错" />,
                        "3":<Badge status='default' text="正常" />,
                        "5":<Badge status='processing' text="进行中" />,
                        "4":<Badge status='warning' text="警告" />,
                        "6":<Badge status='default' text="正常" />,
                        "7":<Badge status='default' text="正常" />,
                        "8":<Badge status='default' text="正常" />

                    }
                    return config[play]
                },
            },
            {
                title:"生日",
                dataIndex:'birthsday',
            },
            {
                title:"地址",
                dataIndex:'address',
            },
            {
                title:"操作",
                render:(text,item)=>{
                    return <Button size="small" onClick={(item)=>{this.handleDelete(item)}}>删除</Button>
                }
            }
        ]
        return (
            <div>
                <Card className='card-wrap' title='头部固定'>
                    <Table 
                    columns={columns} 
                    dataSource={this.state.dataSource} 
                    bordered 
                    pagination={false}
                    scroll={{y:240}}
                      />
                </Card>
                <Card className='card-wrap' title='左侧固定'>
                    <Table 
                    columns={columns2} 
                    dataSource={this.state.dataSource} 
                    bordered 
                    pagination={false}
                    scroll={{x:1801}}
                      />
                </Card>
                <Card className='card-wrap' title='表格排序'>
                    <Table 
                    columns={columns3} 
                    dataSource={this.state.dataSource} 
                    bordered 
                    pagination={false}
                    onChange={this.handleChange}
                      />
                </Card>
                <Card className='card-wrap' title='操作按钮'>
                    <Table 
                    columns={columns4} 
                    dataSource={this.state.dataSource} 
                    bordered 
                    pagination={false}
                      />
                </Card>
            </div>
        )
    }
}
