import * as React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearDetailData as clearExtensionDetailData } from "../../extension_shop/actions/ExtensionShopAction";
import { clearDetailData as clearContributeDetailData } from "../../contribute_shop/actions/ContributeShopAction";

let Nav = () => {
    let dispatch = useDispatch()

    return <section>
        <nav
            style={{
                borderBottom: "solid 1px",
                paddingBottom: "1rem",
            }}
        >
            <Link to="/">首页</Link> |{" "}
            <Link to="/UserCenter">个人中心</Link>|{" "}
            <Link to="/ExtensionShop" onClick={
                () => {
                    dispatch(clearExtensionDetailData())
                }
            }>扩展商城</Link>|{" "}
            <Link to="/ContributeShop" onClick={
                () => {
                    dispatch(clearContributeDetailData())
                }
            }>贡献商城</Link>|{" "}
            <Link to="/EditorManager">编辑器管理</Link>|{" "}
        </nav>
    </section>
}

export default Nav