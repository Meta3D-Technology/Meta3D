import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { uiData, actionName, state } from "meta3d-action-publish-protocol"
import { actionName as runActionName, state as runState } from "meta3d-action-run-protocol"
import { eventName, inputData } from "meta3d-action-publish-protocol/src/EventType"
import indexHtml from "../publish/index.html"
import meta3dJs from "../publish/meta3d.js"
import basis_transcoderJs from "../publish/three/basis/basis_transcoder.js"
import draco_decoderJs from "../publish/three/draco/gltf/draco_decoder.js"
import draco_encoderJs from "../publish/three/draco/gltf/draco_encoder.js"

let _loadAndWriteIndexHtmlData = (jszipService: any, zip: any) => {
    jszipService.file(zip, "index.html", indexHtml)
}

let _loadAndWriteIndexJsData = (jszipService: any, zip: any) => {
    jszipService.file(zip, "meta3d.js", meta3dJs)
}

let _loadAndWriteThreeJsData = (jszipService: any, zip: any, folderPath: string, name: string, jsFile: any) => {
    jszipService.file(zip, `static/three/${folderPath}${name}.js`, jsFile)
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))

                    if (api.nullable.getWithDefault(api.nullable.map(runState => runState.isRun, api.action.getActionState<runState>(meta3dState, runActionName)), false)) {
                        console.warn("can't publish when run")

                        return (new Promise((resolve) => {
                            resolve(meta3dState)
                        }))
                    }

                    let enginePackageBinary = api.nullable.getExn(api.getPackage(meta3dState, "meta3d-engine-whole-protocol"))

                    let { jszip } = editorWholeService.lib(meta3dState)

                    let jszipService = jszip(meta3dState)

                    let zip = jszipService.createZip()

                    _loadAndWriteIndexHtmlData(jszipService, zip)
                    _loadAndWriteIndexJsData(jszipService, zip)

                    _loadAndWriteThreeJsData(jszipService, zip, "basis/", "basis_transcoder", basis_transcoderJs)
                    _loadAndWriteThreeJsData(jszipService, zip, "draco/gltf/", "draco_decoder", draco_decoderJs)
                    _loadAndWriteThreeJsData(jszipService, zip, "draco/gltf/", "draco_encoder", draco_encoderJs)

                    return (new Promise((resolve, reject) => {
                        return api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).exportScene([(glb: ArrayBuffer) => {
                            resolve(glb)
                        }, (err) => {
                            throw err
                        }], meta3dState)
                    }) as Promise<ArrayBuffer>)
                        .then(sceneGLB => {
                            jszipService.file(zip, "Engine.arraybuffer", enginePackageBinary, { binary: true })
                            jszipService.file(zip, "Scene.glb", sceneGLB, { binary: true })

                            return jszipService.generateAsync(zip, { type: "blob" })
                        })
                }, (meta3dState) => {
                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            //console.log("publish")

            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

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
