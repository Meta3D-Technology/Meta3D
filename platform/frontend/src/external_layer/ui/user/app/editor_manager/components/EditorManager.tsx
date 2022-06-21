import * as React from "react";
import Nav from "../../nav/components/Nav";
import { Button } from 'antd';
import PublishEditor from "../publish_editor/components/PublishEditor";
import ShowPublishEditors from "../show_publish_editors/components/ShowPublishEditors";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../../store_type/StoreType";
import { EditorManagerStore, tab } from "../store_type/EditorManagerStoreType";
import { switchTab } from "../actions/EditorManagerAction";

let EditorManager = () => {
    let dispatch = useDispatch()

    let _selector = ({ editorManager }: Store) => editorManager

    let { tab }: EditorManagerStore = useSelector(_selector);

    let _render = (tab: tab) => {
        switch (tab) {
            case "publish":
                return <PublishEditor />
            case "show":
                return <ShowPublishEditors />
        }
    }

    return <section>
        <Nav />
        <Button type="primary" onClick={() => {
            dispatch(switchTab("publish"))
        }}>
            发布编辑器
        </Button>
        <Button type="primary" onClick={() => {
            dispatch(switchTab("show"))
        }}>
            查看我发布的编辑器
        </Button>

        {
            _render(tab)
        }
    </section>
}

export default EditorManager