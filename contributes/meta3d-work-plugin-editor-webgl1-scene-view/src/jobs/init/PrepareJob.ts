import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { getState, getTextureID, setState } from "../Utils";
import { states } from "meta3d-work-plugin-editor-webgl1-scene-view-protocol/src/StateType";
import { service as webgl1Service, webgl1Context, fbo, texture } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as engineWholeService } from "meta3d-engine-whole-protocol/src/service/ServiceType"
// import { pipe } from "meta3d-fp/src/Pipe";
import { getExnFromStrictNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { state as meta3dState } from "meta3d-type"

type canvasSize = [number, number]

let _getLevel = () => 0

let _getBorder = () => 0

let _createTexture = (webgl1Service: webgl1Service, gl: webgl1Context) => {
    let texture = webgl1Service.createTexture(gl);
    webgl1Service.bindTexture(webgl1Service.getTexture2DType(gl), texture, gl);
    webgl1Service.texImage2D(webgl1Service.getTexture2DType(gl), _getLevel(), webgl1Service.getRGBAType(gl), webgl1Service.getDrawingBufferWidth(gl), webgl1Service.getDrawingBufferHeight(gl), _getBorder(), webgl1Service.getRGBAType(gl), webgl1Service.getUnsignedByte(gl), null, gl);

    webgl1Service.texParameteri(webgl1Service.getTexture2DType(gl), webgl1Service.getTextureMinFilterType(gl), webgl1Service.getLinearType(gl), gl);
    webgl1Service.texParameteri(webgl1Service.getTexture2DType(gl), webgl1Service.getTextureWrapSType(gl), webgl1Service.getClampToEdgeType(gl), gl);
    webgl1Service.texParameteri(webgl1Service.getTexture2DType(gl), webgl1Service.getTextureWrapTType(gl), webgl1Service.getClampToEdgeType(gl), gl);

    webgl1Service.bindTexture(webgl1Service.getTexture2DType(gl), null, gl);

    return getExnFromStrictNullable(texture);
}

let _createAndInitFBOData = (webgl1Service: webgl1Service, gl: webgl1Context): [fbo, texture] => {
    let fbo = getExnFromStrictNullable(webgl1Service.createFramebuffer(gl));

    let texture = _createTexture(webgl1Service, gl);


    webgl1Service.bindFramebuffer(webgl1Service.getFrameBufferType(gl), fbo, gl);

    webgl1Service.framebufferTexture2D(webgl1Service.getFrameBufferType(gl), webgl1Service.getColorAttachment0(gl), webgl1Service.getTexture2DType(gl), texture, _getLevel(), gl);

    webgl1Service.bindFramebuffer(webgl1Service.getFrameBufferType(gl), null, gl);
    webgl1Service.bindTexture(webgl1Service.getTexture2DType(gl), null, gl);

    return [fbo, texture]
}

let _createCameraGameObject = (meta3dState: meta3dState, { scene }: engineWholeService, canvasSize: canvasSize) => {
    let data = scene.gameObject.createGameObject(meta3dState)
    meta3dState = data[0]
    let gameObject = data[1]


    data = scene.transform.createTransform(meta3dState)
    meta3dState = data[0]
    let transform = data[1]

    meta3dState = scene.gameObject.addTransform(meta3dState, gameObject, transform)

    data = scene.basicCameraView.createBasicCameraView(meta3dState)
    meta3dState = data[0]
    let cameraView = data[1]

    meta3dState = scene.basicCameraView.active(meta3dState, cameraView)
    meta3dState = scene.gameObject.addBasicCameraView(meta3dState, gameObject, cameraView)

    data = scene.perspectiveCameraProjection.createPerspectiveCameraProjection(meta3dState)
    meta3dState = data[0]
    let cameraProjection = data[1]

    meta3dState = scene.perspectiveCameraProjection.setFovy(meta3dState, cameraProjection, 30)
    meta3dState = scene.perspectiveCameraProjection.setAspect(meta3dState, cameraProjection, canvasSize[0] / canvasSize[1])
    meta3dState = scene.perspectiveCameraProjection.setNear(meta3dState, cameraProjection, 1)
    meta3dState = scene.perspectiveCameraProjection.setFar(meta3dState, cameraProjection, 100)
    meta3dState = scene.gameObject.addPerspectiveCameraProjection(meta3dState, gameObject, cameraProjection)


    meta3dState = scene.transform.setLocalPosition(meta3dState, transform, [10, 10, 10])
    meta3dState = scene.transform.lookAt(meta3dState, transform, [0, 1, 0])

    console.log(scene.transform.getLocalPosition(meta3dState, transform))

    return meta3dState
}

let _createCubeGameObject = (meta3dState: meta3dState, { scene }: engineWholeService) => {
    let data = scene.gameObject.createGameObject(meta3dState)
    meta3dState = data[0]
    let gameObject = data[1]


    data = scene.transform.createTransform(meta3dState)
    meta3dState = data[0]
    let transform = data[1]

    meta3dState = scene.gameObject.addTransform(meta3dState, gameObject, transform)

    data = scene.geometry.createGeometry(meta3dState)
    meta3dState = data[0]
    let geometry = data[1]


    let vertices = new Float32Array([
        1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
        -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
        -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0
    ])

    let indices = new Uint32Array([
        0, 1, 2, 0, 2, 3,
        4, 5, 6, 4, 6, 7,
        8, 9, 10, 8, 10, 11,
        12, 13, 14, 12, 14, 15,
        16, 17, 18, 16, 18, 19,
        20, 21, 22, 20, 22, 23
    ])
    meta3dState = scene.geometry.setVertices(meta3dState, geometry, vertices)
    meta3dState = scene.geometry.setIndices(meta3dState, geometry, indices)
    meta3dState = scene.gameObject.addGeometry(meta3dState, gameObject, geometry)


    meta3dState = scene.gameObject.addGeometry(meta3dState, gameObject, geometry)



    data = scene.pbrMaterial.createPBRMaterial(meta3dState)
    meta3dState = data[0]
    let material = data[1]
    meta3dState = scene.pbrMaterial.setDiffuseColor(meta3dState, material, [1.0, 0.0, 0.0])
    meta3dState = scene.gameObject.addPBRMaterial(meta3dState, gameObject, material)


    return meta3dState
}

let _addDefaultGameObjects = (meta3dState: meta3dState, engineWholeService: engineWholeService, canvasSize: canvasSize) => {
    meta3dState = _createCameraGameObject(meta3dState, engineWholeService, canvasSize)

    meta3dState = _createCubeGameObject(meta3dState, engineWholeService)

    return meta3dState
}

export let execFunc: execFuncType = (meta3dState, { getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, webgl1Service,
        uiService,
        engineWholeService,
        meta3dUIExtensionProtocolName,
        viewRect
    } = getState(states)

    return mostService.callFunc(() => {
        console.log("prepare job");

        let { getContext, setFBOTexture } = uiService

        let [fbo, texture] = _createAndInitFBOData(webgl1Service, getContext(meta3dState))

        meta3dState = setFBOTexture(meta3dState, meta3dUIExtensionProtocolName, getTextureID(), texture)




        // let engineWholeService = api.getExtensionService<engineWholeService>(meta3dState, meta3dEngineWholeExtensionProtocolName)

        let canvasSize: canvasSize = [viewRect.width, viewRect.height]

        meta3dState = _addDefaultGameObjects(meta3dState, engineWholeService, canvasSize)


        return setStatesFunc<states>(
            meta3dState,
            setState(states,
                {
                    ...getState(states),
                    fbo: fbo
                }
            )
        )
    })
}