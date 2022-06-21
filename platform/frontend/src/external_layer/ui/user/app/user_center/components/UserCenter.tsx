import * as React from "react";
import { useSelector } from "react-redux";
import { Store } from "../../../store_type/StoreType";
import { AppStore } from "../../store_type/AppStoreType";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import Nav from "../../nav/components/Nav";


let UserCenter = () => {
    let _selector = ({ app }: Store) => app

    let { username }: AppStore = useSelector(_selector);

    return <section>
        <Nav />
        <span>user name: {getExn(username)}</span>
    </section>
}

export default UserCenter