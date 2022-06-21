import * as React from "react";
import Nav from "../../nav/components/Nav";
import { getAllPublishContributes } from "../../../../../../application_layer/common/BackendService";
import { loadContribute } from "meta3d";
import { List, message } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { setDetailData } from "../actions/ContributeShopAction";
import { Store } from "../../../store_type/StoreType";
import { contributeDetailData, ContributeShopStore } from "../store_type/ContributeShopStoreType";
import { isNullable } from "meta3d-commonlib-ts/src/NullableUtils";
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import ContributeDetail from "../contribute_detail/components/ContributeDetail";
import { useState } from "react";
import { useEffectExecOnlyOnce } from "../../../utils/CustomHookUtils";

let ContributeShop = () => {
    let dispatch = useDispatch()

    let _selector = ({ contributeShop }: Store) => contributeShop

    let { contributeDetailData }: ContributeShopStore = useSelector(_selector);

    const [isLoaded, setIsLoaded] = useState(false);
    const [allPublishContributes, setAllPublishContributes] = useState([]);

    let _getAllPublishContributes = (): Promise<Array<contributeDetailData>> => {
        let result = null

        return getAllPublishContributes().observe(data => {
            result = data.map(({ id, file }) => {
                return { id, data: loadContribute(file) }
            })
        }).then(_ => result)
    }

    let _isJumpToDetailPage = (contributeDetailData: nullable<contributeDetailData>) => {
        return !isNullable(contributeDetailData)
    }

    let _jumpToDetailPage = (data: contributeDetailData) => {
        dispatch(setDetailData(data))
    }

    let _render = () => {
        if (!isLoaded) {
            return <p>loading...</p>
        }

        return <List
            itemLayout="horizontal"
            dataSource={allPublishContributes}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        title={<span onClick={
                            () => {
                                _jumpToDetailPage(item)
                            }
                        }>{item.data.contributePackageData.name}</span>}
                        description="TODO description"
                    />
                </List.Item>
            )}
        />
    }

    useEffectExecOnlyOnce(() => {
        _getAllPublishContributes().then(allPublishContributes => {
            setAllPublishContributes(allPublishContributes)
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
            _isJumpToDetailPage(contributeDetailData) ? <ContributeDetail data={contributeDetailData}></ContributeDetail> : _render()
        }
    </section>
}

export default ContributeShop