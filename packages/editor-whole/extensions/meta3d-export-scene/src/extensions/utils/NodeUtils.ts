import { map, getWithDefault, getEmpty, return_, bind } from "meta3d-commonlib-ts/src/NullableUtils"

export let findNodeIndex = (json, gameObjectName) => {
    return map(nodes => {
        return bind(
            nodeIndex => {
                if (nodeIndex == -1) {
                    return getEmpty()
                }

                return return_(nodeIndex)
            },
            nodes.findIndex((node) => {
                return getWithDefault(
                    map(
                        name => {
                            return name == gameObjectName
                        }, node.name
                    ),
                    false
                )
            })
        )
    }, json.nodes)
}