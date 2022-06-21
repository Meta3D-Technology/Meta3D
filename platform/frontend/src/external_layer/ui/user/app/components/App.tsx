import * as React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { isNullable } from "meta3d-commonlib-ts/src/NullableUtils";
import { Store } from "../../store_type/StoreType";
import Login from "../login/components/Login"
import { AppStore } from "../store_type/AppStoreType";
import Nav from "../nav/components/Nav";
import { useEffect } from "react";

// let _injectDependencies = () => {
//     setRenderEngine(renderEngine);
//     setComputeEngine(computeEngine);
//     setComputeServer(computeServer);
//     setCooperation(cooperation);
// }


let App = () => {
    let navigate = useNavigate()

    let _selector = ({ app }: Store) => app

    let _isNotLogin = username => isNullable(username)

    let { username }: AppStore = useSelector(_selector);

    useEffect(() => {
        if (_isNotLogin(username)) {
            navigate("/Login")
        }

        // TODO perf: judge isLogin: [isLogin]
    })

    return <section>
        <Nav />
        <h1>欢迎来到Meta3D！</h1>
    </section>
}

export default App;