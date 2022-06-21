import * as React from "react";
import { Button, message, Form, Input } from 'antd';
import 'antd/dist/antd.css';
import { useDispatch } from "react-redux";
import { isLoginSuccess } from "../../../../../../application_layer/user/LoginService";
import { useNavigate } from "react-router-dom";
import { setUserName } from "../../actions/AppAction";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";

let Login = () => {
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let _onFinish = (values) => {
        let { username, password } = values

        isLoginSuccess(username, password).tap(([isSuccess, failMsg]) => {
            if (!isSuccess) {
                message.error(getExn(failMsg))

                return
            }

            dispatch(setUserName(username))

            navigate("/")
        }).drain()
    };

    let _onFinishFailed = (errorInfo) => {
        message.error("Failed: " + JSON.stringify(errorInfo))
    };

    return <section>
        <Button type="primary" onClick={() => {
            navigate("/Register")
        }}>
            注册
        </Button>

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
                    登录
                </Button>
            </Form.Item>
        </Form>
    </section>
}

export default Login