import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../../../store_type/StoreType";
import { AppStore } from "../../../store_type/AppStoreType";
import { Form, message, List, Button, Input } from 'antd';
import { extensionDetailData } from "../../../extension_shop/store_type/ExtensionShopStoreType";
import { setDetailData as setExtensionDetailData } from "../../../extension_shop/actions/ExtensionShopAction";
import { setDetailData as setContributeDetailData } from "../../../contribute_shop/actions/ContributeShopAction";
import { clearSelect, setContributeNewName, setExtensionNewName, startExtension, unStartExtension } from "../../../actions/AppAction";
import { contributeDetailData } from "../../../contribute_shop/store_type/ContributeShopStoreType";
import { convertAllFileDataForApp, generateApp } from "meta3d";
import { enterEditor, publishEditor } from "../../../../../../../application_layer/editor/EditorManagerService";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import { switchTab } from "../../actions/EditorManagerAction";
import { showCatchedErrorMessage } from "../../../../../../../application_layer/common/ErrorService";

let PublishEditor = () => {
    let dispatch = useDispatch()

    let _selector = ({ app }: Store) => app

    let { username, selectedExtensions, selectedContributes }: AppStore = useSelector(_selector);

    username = getExn(username)

    let _jumpToExtensionDetailPage = (data: extensionDetailData) => {
        dispatch(setExtensionDetailData(data))
    }

    let _jumpToContributeDetailPage = (data: contributeDetailData) => {
        dispatch(setContributeDetailData(data))
    }

    let _onFinish = (values) => {
        let { editorName } = values

        showCatchedErrorMessage(message, () => {
            let editorBinaryFile = generateApp(convertAllFileDataForApp(
                selectedExtensions.map(({ data }) => data),
                selectedContributes.map(({ data }) => data),
                [
                    selectedExtensions.map(({ newName }) => newName),
                    selectedExtensions.filter(({ isStart }) => isStart).map(({ newName }) => newName),
                    selectedContributes.map(({ newName }) => newName),
                ]
            ))

            publishEditor(editorBinaryFile, editorName, username).drain().then(_ => {
                // enterEditor(editorBinaryFile)
                dispatch(clearSelect())
                dispatch(switchTab("show"))
            })
        }, 20)
    };

    // TODO refactor: duplicate with Logic.tsx
    let _onFinishFailed = (errorInfo) => {
        message.error("Failed: " + JSON.stringify(errorInfo))
    };

    return <section>
        <h1>选择的所有扩展如下：</h1>
        <List
            itemLayout="horizontal"
            dataSource={selectedExtensions}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        title={<span onClick={
                            () => {
                                _jumpToExtensionDetailPage({
                                    id: item.id,
                                    data: item.data
                                })
                            }
                        }>{item.data.extensionPackageData.name}</span>}
                        description="TODO description"
                    />
                    {
                        item.isStart ?
                            <Button type="primary" onClick={() => {
                                dispatch(unStartExtension(item.id))
                            }}>取消启动</Button> :
                            <Button type="primary" onClick={() => {
                                dispatch(startExtension(item.id))
                            }}>启动</Button>
                    }
                    <Input defaultValue={getExn(item.newName)} onBlur={(e) => {
                        dispatch(setExtensionNewName(item.id, e.target.value))
                    }}></Input>
                </List.Item>
            )}
        />

        <h1>选择的所有贡献如下：</h1>
        <List
            itemLayout="horizontal"
            dataSource={selectedContributes}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        title={<span onClick={
                            () => {
                                _jumpToContributeDetailPage({
                                    id: item.id,
                                    data: item.data
                                })
                            }
                        }>{item.data.contributePackageData.name}</span>}
                        description="TODO description"
                    />
                    <Input defaultValue={getExn(item.newName)} onBlur={(e) => {
                        dispatch(setContributeNewName(item.id, e.target.value))
                    }}></Input>
                </List.Item>
            )}
        />

        <h1>发布：</h1>
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
                label="编辑器名称"
                name="editorName"
                rules={[
                    {
                        required: true,
                        message: "输入编辑器名称",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    发布
                </Button>
            </Form.Item>
        </Form>
    </section>
}

export default PublishEditor