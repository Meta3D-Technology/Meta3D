import { name } from "meta3d-gameobject-protocol"

// export let buildUnUsedName = () => "meta3d_gameobject_unused"

export let buildRemovedName = () => "meta3d_gameObject_removed"

export let isValidGameObjectName = (name: name): boolean => {
    // return name != buildUnUsedName() && name != buildRemovedName()
    return name != buildRemovedName()
}