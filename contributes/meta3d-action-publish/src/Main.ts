import { getContribute as getContributeMeta3D } from "meta3d-type"
import { state as meta3dState } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { service as exportSceneService } from "meta3d-export-scene-protocol/src/service/ServiceType"
import * as JSZip from "jszip"
import { saveAs } from "file-saver";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import indexHtml from "../publish/index.html"
import meta3dJs from "../publish/meta3d.js"
import basis_transcoderJs from "../publish/three/basis/basis_transcoder.js"
import draco_decoderJs from "../publish/three/draco/gltf/draco_decoder.js"
import draco_encoderJs from "../publish/three/draco/gltf/draco_encoder.js"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionName, state } from "meta3d-action-publish-protocol"
import { getActionState } from "meta3d-ui-utils/src/ElementStateUtils"
import { actionName as runActionName, state as runState } from "meta3d-action-run-protocol"
import { eventName, inputData } from "meta3d-action-publish-protocol/src/EventType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"

let _loadAndWriteIndexHtmlData = (zip: JSZip) => {
    zip.file("index.html", indexHtml)
}

let _loadAndWriteIndexJsData = (zip: JSZip) => {
    zip.file("meta3d.js", meta3dJs)
}

let _loadAndWriteThreeJsData = (zip: JSZip, folderPath: string, name: string, jsFile: any) => {
    zip.file(`static/three/${folderPath}${name}.js`, jsFile)
}


export let getContribute: getContributeMeta3D<actionContribute<clickUIData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    if (getActionState<runState>(meta3dState, api, runActionName).isRun) {
                        console.warn("can't publish when run")

                        return (new Promise((resolve) => {
                            resolve(meta3dState)
                        }))
                    }

                    let enginePackageBinary = getExn(api.getPackage(meta3dState, "meta3d-engine-whole-gameview-protocol"))

                    let exportSceneService = api.getExtensionService<exportSceneService>(meta3dState, "meta3d-export-scene-protocol")


                    let zip = new JSZip.default() as JSZip

                    _loadAndWriteIndexHtmlData(zip)
                    _loadAndWriteIndexJsData(zip)

                    _loadAndWriteThreeJsData(zip, "basis/", "basis_transcoder", basis_transcoderJs)
                    _loadAndWriteThreeJsData(zip, "draco/gltf/", "draco_decoder", draco_decoderJs)
                    _loadAndWriteThreeJsData(zip, "draco/gltf/", "draco_encoder", draco_encoderJs)

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
                }, (meta3dState) => {
                    return Promise.resolve(meta3dState)
                }))
            })

        },
        handler: (meta3dState, uiData) => {
            //console.log("publish")

            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    isOnlyRead: true,
                    inputData: []
                }))
            })
        },
        createState: () => null
    }
}
