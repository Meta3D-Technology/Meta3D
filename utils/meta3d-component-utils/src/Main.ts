import { componentType } from "meta3d-action-addcomponent-protocol/src/StateType"

export let getAddComponentSelectedValues = () => {
    return [
        "Camera Group",
        "Script"
    ]
}

export let getComponentType = (selectedIndex: number): componentType => {
    switch (selectedIndex) {
        case 0:
            return componentType.CameraGroup
        case 1:
        default:
            return componentType.Script
    }
}