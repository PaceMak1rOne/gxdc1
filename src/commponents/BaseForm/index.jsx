import React, { Component } from 'react'

import { Input , Select , Form , Button , Checkbox , Radio, DatePicker } from 'antd'

import Utils from './../../utiles/utiles'

const FormItem  = Form.Item;

const Option = Select.Option

class FilterForm extends Component {

    handleFilterSubmit = () =>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    reset = () =>{
        this.props.form.resetFields()
    }
    initFormList=()=>{
        const { getFieldDecorator }=this.props.form;

        const formList = this.props.formList;

        const formItemList = []

        if(formList && formList.length>0){
            formList.forEach(item=>{
                
            
            let label = item.label;
            let field = item.field;
            let initValue = item.initValue || '';
            let placeholder = item.placeholder;
            let width = item.width;
            if(item.type==='CITY'){
                const CITY = <FormItem label={label} key={`${field}`}>
                    {
                       getFieldDecorator(`${field}`,{
                        initValue,}
                    )(
                    <Select
                    width={width}
                    placeholder={placeholder}
                    style={{width:width}}
                    >
                        {
                            Utils.getOptionList(item.list)
                        }
                    </Select>
                    )
                    }
                </FormItem>
                formItemList.push(CITY)
            }else if(item.type==='INPUT'){
                const INPUT = <FormItem label={label} key={`${field}`}>
                    {
                        getFieldDecorator([field],{
                            initValue,
                        })(
                        <Input type='text' placeholder={placeholder} width={width} />
                        )
                    }
                </FormItem>
                formItemList.push(INPUT)
            }else if(item.type==='SELECT'){
                const SELECT = <FormItem label={label} key={`${field}`}>
                    {
                        getFieldDecorator(`${field}`,{
                            initValue,
                        })(
                        <Select
                        width={width}
                        placeholder={placeholder}
                        style={{width}}
                        >
                            {
                                Utils.getOptionList(item.list)
                            }
                        </Select>
                        )
                    }
                </FormItem>
                formItemList.push(SELECT)
            }else if(item.type==='CHECKBOX'){
                const CHECKBOX = <FormItem label={label} key={field} width={width}>
                    {
                        getFieldDecorator([field],{
                            initValue,//true|false
                            valuePropName:"checked"
                        })(
                        <Checkbox>
                            {label}
                        </Checkbox>
                        )
                    }
                </FormItem>
                formItemList.push(CHECKBOX)
            }else if(item.type==='时间查询'){
                const begin_time=<FormItem label='订单时间' key={`${field}2`} width={width}>
                {
                    getFieldDecorator('begin_time',{
                        initValue,
                        valuePropName:"checked"
                    })(
                    <DatePicker placeholder={placeholder} showTime={true} format='YYYY-MM-DD HH:mm:ss'  />
                    )
                }
            </FormItem>
            formItemList.push(begin_time)
            const end_time=<FormItem label='~' colon={false} key={`${field}1`} width={width}>
                {
                    getFieldDecorator('end_time',{
                        valuePropName:"checked"
                    })(
                    <DatePicker placeholder={placeholder} showTime={true} format='YYYY-MM-DD HH:mm:ss'  />
                    )
                }
            </FormItem>
            formItemList.push(end_time)
            }else if(item.type==='DATE'){
                const DatePickers = <FormItem label={label} key={`${field}`}>
                    {
                    getFieldDecorator([field],{
                        valuePropName:"checked"
                    })(
                    <DatePicker placeholder={placeholder} showTime={true} format='YYYY-MM-DD HH:mm:ss'  />
                    )
                }
                </FormItem>
                formItemList.push(DatePickers)
            }
        })
        }
        return formItemList
    }
    handleFilterSubmit=()=>{
        let fieldsValue=this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue)
    }
    reset=()=>{
        this.props.form.resetFields()
    }
    render() {
        // const { getFieldDecorator }=this.props.form;
        return (
            <Form layout='inline'>
                {
                    this.initFormList()
                }
                <FormItem >
                    <Button type='primary' style={{margin:"0 20px"}} onClick={()=>this.handleFilterSubmit()}>查询</Button>
                    <Button onClick={()=>this.reset()}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
export default FilterForm = Form.create({})(FilterForm)