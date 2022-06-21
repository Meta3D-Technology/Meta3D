import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils";
import { message } from 'antd';
import 'antd/dist/antd.css';
import { useSearchParams } from "react-router-dom";
import { enterEditor, findPublishEditor } from "../../../../../../application_layer/editor/EditorManagerService";
import { useEffectExecOnlyOnce } from "../../../utils/CustomHookUtils";

let EnterEditor = () => {
    // let { enterData } = useParams()
    let [searchParams, setSearchParams] = useSearchParams();


    useEffectExecOnlyOnce(() => {
        // let { username, editorName } = JSON.parse(decodeURI(enterData))
        let username = searchParams.get("username")
        let editorName = searchParams.get("editorName")

        findPublishEditor(username, editorName).observe(editorBinaryFile => {
            if (isNullable(editorBinaryFile)) {
                message.error("username: " + username + " editorName: " + editorName + " has no published app")

                return
            }

            enterEditor(getExn(editorBinaryFile))
        })
    })

    return null
}

export default EnterEditor