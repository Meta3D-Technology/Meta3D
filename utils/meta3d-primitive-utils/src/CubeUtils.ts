import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { gameObject } from "meta3d-gameobject-protocol"
import { state as meta3dState } from "meta3d-type"

export let createCubeGameObject = (meta3dState: meta3dState, engineSceneService: engineSceneService, [localPosition, diffuseColor]: [[number, number, number], [number, number, number]]): [meta3dState, gameObject] => {
    let data = engineSceneService.gameObject.createGameObject(meta3dState)
    meta3dState = data[0]
    let gameObject = data[1]

    meta3dState = engineSceneService.gameObject.setGameObjectName(meta3dState, gameObject, "Cube")

    data = engineSceneService.transform.createTransform(meta3dState)
    meta3dState = data[0]
    let transform = data[1]

    meta3dState = engineSceneService.gameObject.addTransform(meta3dState, gameObject, transform)

    data = engineSceneService.geometry.createGeometry(meta3dState)
    meta3dState = data[0]
    let geometry = data[1]


    // Create a cube
    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |     | |
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3
    let vertices = new Float32Array([   // Coordinates
        1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, // v0-v1-v2-v3 front
        1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, // v0-v3-v4-v5 right
        1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, // v0-v5-v6-v1 up
        -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, // v1-v6-v7-v2 left
        -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, // v7-v4-v3-v2 down
        1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0  // v4-v7-v6-v5 back
    ])
    let normals = new Float32Array([    // Normal
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
        1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
        0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
        -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
        0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,  // v7-v4-v3-v2 down
        0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0   // v4-v7-v6-v5 back
    ])
    let indices = new Uint32Array([
        0, 1, 2, 0, 2, 3,    // front
        4, 5, 6, 4, 6, 7,    // right
        8, 9, 10, 8, 10, 11,    // up
        12, 13, 14, 12, 14, 15,    // left
        16, 17, 18, 16, 18, 19,    // down
        20, 21, 22, 20, 22, 23     // back
    ])

    meta3dState = engineSceneService.geometry.setVertices(meta3dState, geometry, vertices)
    meta3dState = engineSceneService.geometry.setNormals(meta3dState, geometry, normals)
    meta3dState = engineSceneService.geometry.setIndices(meta3dState, geometry, indices)


    meta3dState = engineSceneService.gameObject.addGeometry(meta3dState, gameObject, geometry)



    data = engineSceneService.pbrMaterial.createPBRMaterial(meta3dState)
    meta3dState = data[0]
    let material = data[1]
    meta3dState = engineSceneService.pbrMaterial.setDiffuseColor(meta3dState, material, diffuseColor)
    meta3dState = engineSceneService.gameObject.addPBRMaterial(meta3dState, gameObject, material)



    meta3dState = engineSceneService.transform.setLocalPosition(meta3dState, transform, localPosition)


    return [meta3dState, gameObject]
}