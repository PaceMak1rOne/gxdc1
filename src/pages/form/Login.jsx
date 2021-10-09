import React, { Component } from 'react'

import { Card , Form  , Input , Button ,message , Icon , Checkbox } from 'antd'

import './../ui/ui.less'

const FormItem = Form.Item;

 class Login extends Component {
    handleSubmit=()=>{
        let userInfo=this.props.form.getFieldsValue();
        // console.log(this.props.form.getFieldsValue())
        this.props.form.validateFields((e,values)=>{
            if(!e){
                message.success(`${userInfo.userName}恭喜你通过了学习，密码为${userInfo.userPwd}`)
            }
        });
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title='登录行内表单' className='card-wrap'>
                    <Form layout='inline'>
                        <FormItem>
                            <Input placeholder='请输入用户名' />
                        </FormItem> 
                        <FormItem>
                            <Input placeholder='请输入密码' type='password' />
                        </FormItem> 
                        <FormItem>
                            <Button>登录</Button>
                        </FormItem> 
                    </Form>
                    
                </Card>
                <Card title='登录水平表单' className='card-wrap'>
                <Form layout='vertical' style={{width:300}}>
                   
                        <FormItem>
                            {
                                getFieldDecorator('userName',{
                                    rules:[
                                        {required:true,message:"用户名不能为空"},
                                        {max:10,min:5,message:"5~10位"},
                                        {pattern:/^\w+$/g,message:"用户名英文字母"}

                                    ]
                                })(<Input prefix={<Icon type='user' />} placeholder='请输入用户名' />)
                            }
                        </FormItem>  
                        <FormItem>
                        {
                                getFieldDecorator('userPwd',{
                                    rules:[
                                        {required:true,message:"密码不能为空"},
                                        {max:10,min:5, message:"5~10位"},
                                        {pattern:new RegExp('^\\w+$','g'),message:"密码英文字母"}

                                    ]
                                })(<Input prefix={<Icon type='lock'/>} placeholder='请输入密码' type='password' />)
                            }
                            
                        </FormItem>  
                        <FormItem>
                            {
                               getFieldDecorator('remeber',{
                                   valuePropName:'checked',
                                   initialValue:true
                               })(<Checkbox >记住密码</Checkbox>)
                            }
                            <a href="#" style={{float:'right'}}>忘记密码</a>
                        </FormItem>

                        <FormItem>
                            <Button type='primary' onClick={this.handleSubmit}>登录</Button>
                        </FormItem> 
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(Login)