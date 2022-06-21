import * as React from "react";
import { contributeDetailData } from "../../store_type/ContributeShopStoreType";
import { Button } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { notSelectContribute, selectContribute } from "../../../actions/AppAction";
import { Store } from "../../../../store_type/StoreType";
import { AppStore, selectedContributes } from "../../../store_type/AppStoreType";

let ContributeDetail = ({ data }: { data: contributeDetailData }) => {
    let dispatch = useDispatch()

    let _selector = ({ app }: Store) => app

    let { selectedContributes }: AppStore = useSelector(_selector);

    let _isSelect = (id: number, selectedContributes: selectedContributes) => {
        return selectedContributes.filter((selectedContribute) => {
            return id === selectedContribute.id
        }).length > 0
    }

    return <section>
        <h1>{data.data.contributePackageData.name}</h1>
        {
            _isSelect(data.id, selectedContributes) ?
                <Button type="primary" htmlType="submit" onClick={
                    () => {
                        dispatch(notSelectContribute(data.id))
                    }
                }>
                    取消选择
                </Button> :
                <Button type="primary" htmlType="submit" onClick={
                    () => {
                        dispatch(selectContribute(data))
                    }
                }>
                    选择
                </Button>
        }
    </section>
}

export default ContributeDetail