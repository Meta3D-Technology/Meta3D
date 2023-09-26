import { service } from "./Entry"
import { service as multiEditService } from "./multi_edit/client/MultiEdit"

(document.querySelector("#load-glb") as HTMLButtonElement).onclick = (e) => {
    globalThis["load-glb"] = true
}


// (document.querySelector("#add-glb") as HTMLButtonElement).onclick = (e) => {
//     globalThis["add-glb"] = true
// }


(document.querySelector("#export") as HTMLButtonElement).onclick = (e) => {
    globalThis["export"] = true
}


(document.querySelector("#import") as HTMLButtonElement).onclick = (e) => {
    globalThis["import"] = true
}


// (document.querySelector("#undo") as HTMLButtonElement).onclick = (e) => {
//     globalThis["undo"] = true
// }


// (document.querySelector("#redo") as HTMLButtonElement).onclick = (e) => {
//     globalThis["redo"] = true
// }


let _loop = (meta3dState) => {
    return service.update(meta3dState).then(meta3dState => {
        requestAnimationFrame(() => {
            _loop(meta3dState)
        })
    })


}

service.init().then(meta3dState => {
    return _loop(meta3dState)
})
// multiEditService.init()
// multiEditService.emit()