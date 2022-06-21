import * as React from "react";
import { extensionDetailData } from "../../store_type/ExtensionShopStoreType";
import { Button } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { notSelectExtension, selectExtension } from "../../../actions/AppAction";
import { Store } from "../../../../store_type/StoreType";
import { AppStore, selectedExtensions } from "../../../store_type/AppStoreType";

let ExtensionDetail = ({ data }: { data: extensionDetailData }) => {
    let dispatch = useDispatch()

    let _selector = ({ app }: Store) => app

    let { selectedExtensions }: AppStore = useSelector(_selector);

    let _isSelect = (id: number, selectedExtensions: selectedExtensions) => {
        return selectedExtensions.filter((selectedExtension) => {
            return id === selectedExtension.id
        }).length > 0
    }

    return <section>
        <h1>{data.data.extensionPackageData.name}</h1>
        {
            _isSelect(data.id, selectedExtensions) ?
                <Button type="primary" htmlType="submit" onClick={
                    () => {
                        dispatch(notSelectExtension(data.id))
                    }
                }>
                    取消选择
                </Button> :
                <Button type="primary" htmlType="submit" onClick={
                    () => {
                        dispatch(selectExtension(data))
                    }
                }>
                    选择
                </Button>
        }
    </section>
}

export default ExtensionDetail