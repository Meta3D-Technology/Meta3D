import * as React from "react";
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from "./external_layer/ui/user/reducers/all_reducer";
import App from "./external_layer/ui/user/app/components/App";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import UserCenter from "./external_layer/ui/user/app/user_center/components/UserCenter";
import { init } from "./application_layer/common/BackendService";
import ExtensionShop from "./external_layer/ui/user/app/extension_shop/components/ExtensionShop";
import ContributeShop from "./external_layer/ui/user/app/contribute_shop/components/ContributeShop";
import EditorManager from "./external_layer/ui/user/app/editor_manager/components/EditorManager";
import Login from "./external_layer/ui/user/app/login/components/Login";
import Register from "./external_layer/ui/user/app/register/components/Register";
import EnterEditor from "./external_layer/ui/user/app/enter_editor/components/EnterEditor";

let _hiddenLoadding = () => {
    (document.querySelector("#loading") as any).style.display = "none"
}

_hiddenLoadding()

const store = createStore(rootReducer)

init()

render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="Login" element={<Login />} />
                <Route path="Register" element={<Register />} />
                <Route path="UserCenter" element={<UserCenter />} />
                <Route path="ExtensionShop" element={<ExtensionShop />} />
                <Route path="ContributeShop" element={<ContributeShop />} />
                <Route path="EditorManager" element={<EditorManager />} />
                <Route path="EnterEditor" element={<EnterEditor />}>
                    {/* <Route path=":enterData" element={<EnterEditor />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)