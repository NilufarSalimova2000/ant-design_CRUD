import React from "react";
import { useLoginCreate } from "../../service/mutation/useLoginCreate";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from "antd";
import { saveState } from "../../config/storage";

export const Login = () => {
    const { mutate } = useLoginCreate();
    const navigate = useNavigate();
    const [form] = Form.useForm()

    const onFinish = (data) => {
        mutate(data, {
            onSuccess: (res) => {
                message.success("Muvaffaqiyatli")
                saveState("userData", res);
                navigate("/app")
            },
            onError: (error) => {
                console.log(error);
                message.error("Ro'yxatdan o'tmagansiz")
            }
        })
        form.resetFields();
    }
    return (
        <div className="container">
            <div className="login_block">
                <Form form={form} layout="vertical" name="login" onFinish={onFinish}>
                    <Button style={{marginBottom: "15px"}} onClick={() => navigate("/register")} type="primary" htmlType="submit">
                        Registration
                    </Button>
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
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>

                </Form>
            </div>
        </div>
    )
}