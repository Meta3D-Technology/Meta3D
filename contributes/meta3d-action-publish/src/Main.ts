import { getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { service as exportSceneService } from "meta3d-export-scene-protocol/src/service/ServiceType"
import { actionData } from "meta3d-action-button-click-protocol"
import * as JSZip from "jszip"
import { saveAs } from "file-saver";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

let _loadAndWriteIndexHtmlData = (zip: JSZip) => {
    return fetch("./publish/index.html").then(res => res.text()).then(text => zip.file("index.html", text))
}

let _loadAndWriteIndexJsData = (zip: JSZip) => {
    return fetch("./publish/meta3d.js").then(res => res.text()).then(text => zip.file("meta3d.js", text))
}

export let getContribute: getContributeMeta3D<actionContribute<actionData>> = (api) => {
    return {
        actionName: "Publish",
        handler: (meta3dState, actionData) => {
            console.log("publish")

            let enginePackageBinary = getExn(api.getPackage(meta3dState, "meta3d-engine-whole-protocol"))

            let exportSceneService = api.getExtensionService<exportSceneService>(meta3dState, "meta3d-export-scene-protocol")


            let zip = new JSZip.default() as JSZip

            return _loadAndWriteIndexHtmlData(zip).then(_ => {
                return _loadAndWriteIndexJsData(zip)
            }).then(_ => {
                return new Promise((resolve, reject) => {
                    return exportSceneService.export([(glb) => {
                        resolve(glb)
                    }, (err) => {
                        throw err
                    }], meta3dState)
                }) as Promise<ArrayBuffer>
            }).then(sceneGLB => {
                zip.file("Engine.arraybuffer", enginePackageBinary, { binary: true })
                zip.file("Scene.glb", sceneGLB, { binary: true })

                return zip.generateAsync({ type: "blob" })
            }).then(content => {
                // TODO get zipname from user
                saveAs(content, "publish.zip")

                return meta3dState
            })
        }
    }
}
