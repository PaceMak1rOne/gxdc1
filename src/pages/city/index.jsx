import React, { Component } from 'react'

import { Card , Button , Table , Form , Select , Modal , message } from 'antd'

import Utils from '../../utiles/utiles'

import Axios from '../../axios/index'

import './../../style/common.less'

const FormItem=Form.Item;
const Option=Select.Option;
class FilterForm extends Component{
    render(){
        const { getFieldDecorator }=this.props.form;
        return (
            <Form layout='inline'>
                <FormItem label='城市'>
                    {
                        getFieldDecorator("city_id",{

                        })(
                        <Select
                        placeholder='全部'
                        style={{width:100}}
                        >
                            <Option value=''>全部</Option>
                            <Option value='1'>北京市</Option>
                            <Option value='2'>天津市</Option>
                            <Option value='3'>深圳市</Option>
                        </Select>
                        )
                    }
                </FormItem>
                <FormItem label='用车模式'>
                    {
                        getFieldDecorator("mode",{

                        })(
                        <Select
                        placeholder='全部'
                        style={{width:140}}
                        >
                            <Option value=''>全部</Option>
                            <Option value='1'>指定停车点模式</Option>
                            <Option value='2'>禁停区模式</Option>
                        </Select>
                        )
                    }
                </FormItem>
                <FormItem label='营运模式'>
                    {
                        getFieldDecorator("op_mode",{

                        })(
                        <Select
                        placeholder='全部'
                        style={{width:100}}
                        >
                            <Option value=''>全部</Option>
                            <Option value='1'>自营</Option>
                            <Option value='2'>加盟</Option>
                        </Select>
                        )
                    }
                </FormItem>
                <FormItem label='加盟商授权状态'>
                    {
                        getFieldDecorator("auth_status",{

                        })(
                        <Select
                        placeholder='全部'
                        style={{width:100}}
                        >
                            <Option value=''>全部</Option>
                            <Option value='1'>已授权</Option>
                            <Option value='2'>未授权</Option>
                        </Select>
                        )
                    }
                </FormItem>
                <FormItem >
                    <Button type='primary' style={{margin:"0 20px"}}>查询</Button>
                    <Button >重置</Button>
                </FormItem>
            </Form>
        )
    }
}
FilterForm=Form.create({})(FilterForm)
export default class City extends Component {
    state={
        list:[],
        isShowOpenCity:false
    }
    params={
        page:1
    }

    handleOpenCity=()=>{//开通城市
        this.setState({isShowOpenCity:true})
    }
    handleSubmit=()=>{
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        Axios.ajax(
            {
                url:"/city/open",
                data:{
                    params:cityInfo
                }
            }
        ).then((res)=>{
            if(res.code=='0'){
                message.success(res.result)
                this.setState({isShowOpenCity:false})
                this.requestList()
            }
        })
    }
    requestList=()=>{
        let _this=this
        Axios.ajax({
            url:"/admin/open_city",
            data:{
                params:{
                    page:this.params.page
                }
            }
        })
        .then(res=>{
            this.setState({
                list:res.result.item_list,
                pagination:Utils.pagenation(res,(current)=>{
                    _this.params.page=current,
                    _this.requestList()
                })
            })
        })
    }
    componentDidMount(){//默认请求接口数据
        this.requestList()

    }
    render() {
        const columns=[
            {
                title:"城市ID",
                dataIndex:"id"
            },{
                title:"城市名称",
                dataIndex:'name'
            },{
                title:"用车模式",
                dataIndex:"mode",
                render(mode){
                    return mode==1?'停车点':'禁停区'
                }
            },{
                title:"营运模式",
                dataIndex:"op_mode",
                render(op_mode){
                    return op_mode==1?'自营':'加盟'
                }
            },{
                title:"授权加盟商",
                dataIndex:"frachisee_name"
            },{
                title:"城市管理员",
                dataIndex:"city_admins",
                render(arr){
                    console.log(arr)
                    return arr.map(item=>{
                        return item.user_name
                    }).join(',')
                }
            },{
                title:"城市开通时间",
                dataIndex:"open_time"
            },{
                title:"操作时间",
                dataIndex:"updata_time",
                render:Utils.formateDate
            },{
                title:"操作人",
                dataIndex:"sys_user_name"
            }
        ]
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type='primary' onClick={this.handleOpenCity} >开通城市</Button>
                </Card>
                <div className="content-wrap">
                <Table columns={columns} dataSource={this.state.list} pagination={this.state.pagination} pagination={false} />
                </div>
                <Modal
                title='标题'
                visible={this.state.isShowOpenCity}
                onCancel={()=>{this.setState({isShowOpenCity:false})}}
                onOk={()=>this.handleSubmit()}
                >
                <OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm=inst;}} />
                </Modal>
            </div>
        )
    }
}

class OpenCityForm extends Component{
    render(){
        const formItemLayout={
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:10
            }
        }
        const { getFieldDecorator }=this.props.form
        return(
        <Form layout='horizontal'>
            <FormItem label='选择城市' {...formItemLayout}>
                {
                    getFieldDecorator('city_id',{
                        initialValue:'1'
                    })(<Select>
                        <Option value=''>全部</Option> 
                        <Option value='1'>天津市</Option> 
                        <Option value='2'>北京市</Option>  
                    </Select>)
                }
                
            </FormItem>
            <FormItem label='营运模式' {...formItemLayout}>
            {
                    getFieldDecorator('op_mode',{
                        initialValue:'1'
                    })(<Select>
                        <Option value=''>全部</Option> 
                        <Option value='1'>自营</Option> 
                        <Option value='2'>加盟</Option>  
                    </Select>)
                }
                
            </FormItem>
            <FormItem label='用车模式' {...formItemLayout}>
            {
                    getFieldDecorator('use_mode',{
                        initialValue:'1'
                    })(<Select>
                        <Option value='1'>指定禁停点</Option> 
                        <Option value='2'>禁停区</Option>  
                    </Select>)
                }
                
            </FormItem>
        </Form>
        )
    }
}
OpenCityForm=Form.create({})(OpenCityForm)