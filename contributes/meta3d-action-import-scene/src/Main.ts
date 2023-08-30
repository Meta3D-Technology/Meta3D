import { getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { service as importSceneService } from "meta3d-import-scene-protocol/src/service/ServiceType"
import { uiData } from "meta3d-action-button-click-protocol"

export let getContribute: getContributeMeta3D<actionContribute<uiData>> = (api) => {
    return {
        actionName: "ImportScene",
        handler: (meta3dState, uiData) => {
            console.log("import scene")

            return new Promise((resolve, reject) => {
                let input = document.createElement('input')
                input.setAttribute('type', "file")
                input.style.visibility = 'hidden'

                input.onchange = (event) => {
                    let file = (event.target as any).files[0]

                    let reader = new FileReader()

                    reader.onload = () => {
                        if (!file.name.includes(".glb")) {
                            reject(new Error("场景文件后缀名应该是.glb"))
                        }


                        let importSceneService = api.getExtensionService<importSceneService>(meta3dState, "meta3d-import-scene-protocol")

                        importSceneService.import(meta3dState, reader.result as ArrayBuffer).then(meta3dState => resolve(meta3dState))
                    }

                    reader.onprogress = (event) => {
                        // TODO show progress message
                        console.log(`loading ${event.loaded / event.total} %`)
                    }

                    reader.onerror = (event) => {
                        reject(new Error(`读取${file.name}错误`))
                    }

                    reader.readAsArrayBuffer(file)
                }

                document.body.appendChild(input)
                input.click()
                document.body.removeChild(input)
            })
        }
    }
}
