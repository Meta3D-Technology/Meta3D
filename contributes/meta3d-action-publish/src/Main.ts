import { getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { service as exportSceneService } from "meta3d-export-scene-protocol/src/service/ServiceType"
import * as JSZip from "jszip"
import { saveAs } from "file-saver";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import indexHtml from "../publish/index.html"
import meta3dJs from "../publish/meta3d.js"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionName, state } from "meta3d-action-publish-protocol"
import { getActionState } from "meta3d-ui-utils/src/ElementStateUtils"
import { actionName as runActionName, state as runState } from "meta3d-action-run-protocol"

let _loadAndWriteIndexHtmlData = (zip: JSZip) => {
    zip.file("index.html", indexHtml)
}

let _loadAndWriteIndexJsData = (zip: JSZip) => {
    zip.file("meta3d.js", meta3dJs)
}

export let getContribute: getContributeMeta3D<actionContribute<clickUIData, state>> = (api) => {
    return {
        actionName: actionName,
        handler: (meta3dState, uiData) => {
            console.log("publish")

            if (getActionState<runState>(meta3dState, api, runActionName).isRun) {
                return (new Promise((resolve) => {
                    resolve(meta3dState)
                }))
            }

            let enginePackageBinary = getExn(api.getPackage(meta3dState, "meta3d-engine-whole-protocol"))

            let exportSceneService = api.getExtensionService<exportSceneService>(meta3dState, "meta3d-export-scene-protocol")


            let zip = new JSZip.default() as JSZip

            _loadAndWriteIndexHtmlData(zip)
            _loadAndWriteIndexJsData(zip)

            return (new Promise((resolve, reject) => {
                return exportSceneService.export([(glb) => {
                    resolve(glb)
                }, (err) => {
                    throw err
                }], meta3dState)
            }) as Promise<ArrayBuffer>)
                .then(sceneGLB => {
                    zip.file("Engine.arraybuffer", enginePackageBinary, { binary: true })
                    zip.file("Scene.glb", sceneGLB, { binary: true })

                    return zip.generateAsync({ type: "blob" })
                }).then(content => {
                    // TODO get zipname from user
                    saveAs(content, "publish.zip")

                    return meta3dState
                })
        },
        createState: () => null
    }
}
