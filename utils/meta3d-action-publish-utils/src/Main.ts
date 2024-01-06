import { state as meta3dState, api } from "meta3d-type"
import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import indexHtml from "../publish/index.html"
import meta3dJs from "../publish/meta3d.js"
import basis_transcoderJs from "../publish/three/basis/basis_transcoder.js"
import draco_decoderJs from "../publish/three/draco/gltf/draco_decoder.js"
import draco_encoderJs from "../publish/three/draco/gltf/draco_encoder.js"
import { generateOptionType } from "meta3d-jszip-protocol/src/service/ServiceType"

let _loadAndWriteIndexHtmlData = (jszipService: any, zip: any) => {
    jszipService.file(zip, "index.html", indexHtml)
}

let _loadAndWriteIndexJsData = (jszipService: any, zip: any) => {
    jszipService.file(zip, "meta3d.js", meta3dJs)
}

let _loadAndWriteThreeJsData = (jszipService: any, zip: any, folderPath: string, name: string, jsFile: any) => {
    jszipService.file(zip, `static/three/${folderPath}${name}.js`, jsFile)
}

export let getContent = (api: api, meta3dState: meta3dState, type: generateOptionType) => {
    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))

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

            return jszipService.generateAsync(zip, { type: type })
        })
}
