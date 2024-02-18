import { forEach, isNullable, map, getWithDefault, getExn, getEmpty, return_, bind } from "meta3d-commonlib-ts/src/NullableUtils"

export let findCameraIndex = (json, cameraGameObjectName) => {
    return map(nodes => {
        return bind(
            node => {
                return node.camera
            },
            nodes.find(node => {
                return getWithDefault(
                    map(
                        name => {
                            return name == cameraGameObjectName
                        }, node.name
                    ),
                    false
                )
            })
        )
    }, json.nodes)
}