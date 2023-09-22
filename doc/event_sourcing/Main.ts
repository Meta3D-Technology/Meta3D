import { service } from "./Entry"

service.init().then(meta3dState => {
    service.update(meta3dState)
})