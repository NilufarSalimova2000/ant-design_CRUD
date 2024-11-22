import React from "react";
import { useCreateUsers } from "../../service/mutation/useCreateUsers";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useEditUsers } from "../../service/mutation/useEditUsers";

export const CreatUser = () => {
    const { mutate } = useCreateUsers();
    const client = useQueryClient();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const {mutate: edit} = useEditUsers();

    const submit = (data) => {
        mutate(data, {
            onSuccess: () => {
                client.invalidateQueries(["users"])
                message.success("Muvaffaqiyatli qo'shildi")
                navigate("/app")
            },
            
        })
    }

    
    return (
        <div style={{width: "700px"}}>
            <Form form={form} layout="vertical" name="creat" onFinish={submit}>
                <Form.Item name={"name"} label={"Name"} rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Last name"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your last name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Age"
                    name="age"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your age!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form>
        </div>
    )
}