import { prepare as prepareMeta3D, registerExtension, registerContribute, getExtensionService, getExtensionState, setExtensionState } from "meta3d"
import { getExtensionService as getAppExtensionService, createExtensionState as createAppExtensionState } from "meta3d-app"
import { getExtensionService as getTest1ExtensionService, createExtensionState as createTest1ExtensionState } from "meta3d-extension-test1"
import { getContribute as getTest1Contribute } from "meta3d-contribute-test1"
import { service as appService } from "meta3d-app-protocol/src/service/ServiceType"

let meta3dState = prepareMeta3D()

meta3dState = registerExtension(meta3dState, "meta3d-app", getAppExtensionService, [
    {
        meta3dTest1ExtensionName: "meta3d-test1-extension"
    },
    null
], createAppExtensionState())

meta3dState = registerExtension(meta3dState, "meta3d-test1-extension", getTest1ExtensionService, [
    null,
    {
        meta3dTest1ContributeName: "meta3d-test1-contribute"
    }
], createTest1ExtensionState())




meta3dState = registerContribute(meta3dState, "meta3d-test1-contribute", getTest1Contribute, [
    null,
    null
])



// TODO invoke life cycle->start

let { run } = getExtensionService<appService>(meta3dState, "meta3d-app")

meta3dState = run(meta3dState)