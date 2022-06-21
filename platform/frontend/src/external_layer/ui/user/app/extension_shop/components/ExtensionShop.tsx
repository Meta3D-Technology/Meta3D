import * as React from "react";
import Nav from "../../nav/components/Nav";
import { getAllPublishExtensions } from "../../../../../../application_layer/common/BackendService";
import { loadExtension } from "meta3d";
import { List, message } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { setDetailData } from "../actions/ExtensionShopAction";
import { Store } from "../../../store_type/StoreType";
import { extensionDetailData, ExtensionShopStore } from "../store_type/ExtensionShopStoreType";
import { isNullable } from "meta3d-commonlib-ts/src/NullableUtils";
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import ExtensionDetail from "../extension_detail/components/ExtensionDetail";
import { useState } from "react";
import { useEffectExecOnlyOnce } from "../../../utils/CustomHookUtils";

let ExtensionShop = () => {
    let dispatch = useDispatch()

    let _selector = ({ extensionShop }: Store) => extensionShop

    let { extensionDetailData }: ExtensionShopStore = useSelector(_selector);

    const [isLoaded, setIsLoaded] = useState(false);
    const [allPublishExtensions, setAllPublishExtensions] = useState([]);

    let _getAllPublishExtensions = (): Promise<Array<extensionDetailData>> => {
        let result = null

        return getAllPublishExtensions().observe(data => {
            result = data.map(({ id, file }) => {
                return { id, data: loadExtension(file) }
            })
        }).then(_ => result)
    }

    let _isJumpToDetailPage = (extensionDetailData: nullable<extensionDetailData>) => {
        return !isNullable(extensionDetailData)
    }

    let _jumpToDetailPage = (data: extensionDetailData) => {
        dispatch(setDetailData(data))
    }

    let _render = () => {
        if (!isLoaded) {
            return <p>loading...</p>
        }

        return <List
            itemLayout="horizontal"
            dataSource={allPublishExtensions}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        title={<span onClick={
                            () => {
                                _jumpToDetailPage(item)
                            }
                        }>{item.data.extensionPackageData.name}</span>}
                        description="TODO description"
                    />
                </List.Item>
            )}
        />
    }

    useEffectExecOnlyOnce(() => {
        _getAllPublishExtensions().then(allPublishExtensions => {
            setAllPublishExtensions(allPublishExtensions)
            setIsLoaded(true)
        })
            .catch((e) => {
                setIsLoaded(false);
                message.error(e.mesage)
            });
    })

    return <section>
        <Nav />
        {
            _isJumpToDetailPage(extensionDetailData) ? <ExtensionDetail data={extensionDetailData}></ExtensionDetail> : _render()
        }
    </section>
}

export default ExtensionShop