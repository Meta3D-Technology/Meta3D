import { service } from "./Entry"

(document.querySelector("#load-glb") as HTMLButtonElement).onclick = (e) => {
    globalThis["load-glb"] = true
}


(document.querySelector("#add-glb") as HTMLButtonElement).onclick = (e) => {
    globalThis["add-glb"] = true
}


(document.querySelector("#export") as HTMLButtonElement).onclick = (e) => {
    globalThis["export"] = true
}


(document.querySelector("#import") as HTMLButtonElement).onclick = (e) => {
    globalThis["import"] = true
}


(document.querySelector("#undo") as HTMLButtonElement).onclick = (e) => {
    globalThis["undo"] = true
}


(document.querySelector("#redo") as HTMLButtonElement).onclick = (e) => {
    globalThis["redo"] = true
}



service.init().then(meta3dState => {
    service.update(meta3dState)
})