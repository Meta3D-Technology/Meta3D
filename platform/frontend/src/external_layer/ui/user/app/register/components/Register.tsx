import * as React from "react";
import { Button, message, Form, Input } from 'antd';
import 'antd/dist/antd.css';
import { useDispatch } from "react-redux";
import { setUserName } from "../../actions/AppAction";
import { useNavigate } from "react-router-dom";
import { checkUserName, register } from "../../../../../../application_layer/user/RegisterService";
import { empty } from "most";

let Register = () => {
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let _onFinish = (values) => {
        let { username, password } = values

        checkUserName(username).flatMap(isPass => {
            if (!isPass) {
                message.error("username已经存在，请重新输入新的username")

                return empty()
            }

            return register(username, password).tap(_ => {
                dispatch(setUserName(username))

                navigate("/")
            })
        }).drain()
            .catch(e => {
                message.error(e.mesage)
            })
    };

    let _onFinishFailed = (errorInfo) => {
        message.error("Failed: " + JSON.stringify(errorInfo))
    };

    return <section>
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 6,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={_onFinish}
            onFinishFailed={_onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="用户名"
                name="username"
                rules={[
                    {
                        required: true,
                        message: "输入用户名",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "输入密码",
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    注册
                </Button>
            </Form.Item>
        </Form>
    </section>
}

export default Register