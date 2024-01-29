import { componentType } from "meta3d-action-addcomponent-protocol/src/StateType"

export let getAddComponentSelectedValues = () => {
    return [
        "Camera Group"
    ]
}

export let getComponentType = (selectedIndex: number): componentType => {
    switch (selectedIndex) {
        case 0:
        default:
            return componentType.CameraGroup
    }
}