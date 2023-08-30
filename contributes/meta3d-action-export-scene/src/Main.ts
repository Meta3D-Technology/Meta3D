import { getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { service as exportSceneService } from "meta3d-export-scene-protocol/src/service/ServiceType"
// import { state } from "meta3d-export-scene-protocol/src/state/StateType"
// import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
// import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionName, state } from "meta3d-action-export-scene-protocol"

let _download = (body: ArrayBuffer, filename: string, extension: string) => {
    const blob = new Blob([body], { type: "arraybuffer" });
    const fileName = filename + "." + extension;

    const link = document.createElement('a');

    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export let getContribute: getContributeMeta3D<actionContribute<clickUIData, state>> = (api) => {
    return {
        actionName: actionName,
        handler: (meta3dState, uiData) => {
            console.log("export scene")

            let exportSceneService = api.getExtensionService<exportSceneService>(meta3dState, "meta3d-export-scene-protocol")

            return new Promise((resolve) => {
                exportSceneService.export([(glb) => {
                    _download(glb, "scene", "glb")

                    resolve(meta3dState)
                }, (err) => {
                    throw err
                }], meta3dState)
            })
        },
        createState: () => null
    }
}
