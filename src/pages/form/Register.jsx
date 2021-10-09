import React, { Component } from 'react'

import { Card, Form, Button, Input, Checkbox, Radio, Select, DatePicker, TimePicker, Upload, Icon, message, Switch, InputNumber } from 'antd'

import moment from 'moment'

import './../ui/ui.less'

const { Option } = Select

const FormItem = Form.Item

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class Register extends Component {
    state = {
        loading: false,
        imageUrl:""
    };
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    handleSubmit=()=>{
        let userInfo=this.props.form.getFieldsValue();
        console.log(userInfo)
        message.success(`${userInfo.userName}恭喜你，通过本次学习`)
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div >Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        const { getFieldDecorator } = this.props.form;
        const TextArea = Input.TextArea;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 8
            },
            wrapperCol: {
                xs: 24,
                sm: 9
            }
        }
        const offsetLayout={
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:7
                }
            }
        }
        
        return (
            <div>
                <Card title='注册表单' className='card-wrap' >
                    <Form  {...formItemLayout} >
                        <FormItem label='用户名'>
                            {
                                getFieldDecorator("userName", {
                                    initialValue: "",
                                    rules: [
                                        { required: true, message: "用户名不能为空" }
                                    ]
                                })(<Input placeholder='请输入用户名' autoComplete='off' />)
                            }
                        </FormItem>
                        <FormItem label='密码'>
                            {
                                getFieldDecorator('userPwd', {

                                })(<Input placeholder='请输入密码' type='password' />)
                            }

                        </FormItem>
                        <FormItem label='性别'>
                            {
                                getFieldDecorator('sex', {

                                })(
                                    <Radio.Group>
                                        <Radio value='1'>男</Radio>
                                        <Radio value='2'>女</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                        <FormItem label='年龄'>
                            {
                                getFieldDecorator('age', {
                                    initialValue: 18
                                })(
                                    <InputNumber />
                                )
                            }
                        </FormItem>
                        <FormItem label='当前状态'>
                            {
                                getFieldDecorator("state", {
                                    initialValue: '2'
                                })(
                                    <Select>
                                        <Option key='1' value='1'>咸鱼一条</Option>
                                        <Option key='2' value='2'>风华浪子</Option>
                                        <Option key='3' value='3'>北大才子</Option>
                                        <Option key='4' value='4'>百度FE</Option>
                                        <Option key='5' value='5'>创业者</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label='爱好'>
                            {
                                getFieldDecorator("paly", {
                                    initialValue: ["1", "2", "3"]
                                })(
                                    <Select mode='multiple'>
                                        <Option key='1' value='1'>游泳</Option>
                                        <Option key='2' value='2'>打篮球</Option>
                                        <Option key='3' value='3'>踢足球</Option>
                                        <Option key='4' value='4'>跑步</Option>
                                        <Option key='5' value='5'>爬山</Option>
                                        <Option key='6' value='6'>骑行</Option>
                                        <Option key='7' value='7'>桌球</Option>
                                        <Option key='8' value='8'>麦霸</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label='是否已婚'>
                            {
                                getFieldDecorator('isMarried', {
                                    valuePropName: "checked",
                                    initialValue: true
                                })(
                                    <Switch />
                                )
                            }
                        </FormItem>
                        <FormItem label='生日'>
                            {
                                getFieldDecorator('1', {
                                    initialValue: moment("2018-08-08 12:00:59")
                                })(
                                    <DatePicker
                                        showTime
                                        format='YYYY-MM-DD HH:mm:ss'
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label='联系地址' >
                            {
                                getFieldDecorator('address', {
                                    initialValue: "北京市海淀区奥林匹克公园"
                                })(<TextArea autoSize={{ minRows: 2, maxRows: 6 }} />)
                            }
                        </FormItem>
                        <FormItem label='早期时间'>
                            {
                                getFieldDecorator('time')(
                                    <TimePicker />
                                )
                            }
                        </FormItem>
                        <FormItem label='头像'>
                            {
                                getFieldDecorator("userImg")(
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}

                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    <Checkbox>我已经阅读过<a href="#">木刻协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type='primary' onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(Register)