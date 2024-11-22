import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useRegisterCreate } from "../../service/mutation/useRegisterCreate";

export const Register = () => {
    const { mutate } = useRegisterCreate();
    const navigate = useNavigate();
    const [form] = Form.useForm()

    const onFinish = (data) => {
        mutate(data, {
            onSuccess: (res) => {
                console.log(res);
                message.success("Muvaffaqiyatli")
                navigate("/")
            },
            onError: (error) => {
                console.log(error);
                message.error("error")
            }
        })
        form.resetFields();
    }
    return (
        <div className="container">
            <div className="login_block">
                <Form form={form} layout="vertical" name="login" onFinish={onFinish}>

                    <Form.Item
                        label="Username"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name={"email"} label={"Email"} rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <div>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button type="link" htmlType="submit">
                            Login
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}