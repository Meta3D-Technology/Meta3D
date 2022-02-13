// npm install

import { registerExtension } from "meta3d"

import { getData } from "meta3d-engine-core"

let extensionState = Meta3D.init()

TODO event name should all be 驼峰命名(lower case begin)(e.g. "meta3d-editScene-engine-core")


Meta3D.registerExtension("Meta3D-EditScene-Engine-Core")
Meta3D.registerExtension("Meta3D-RunScene-Engine-Core")
let eec
let rec

// eec.onActive()
// rec.onActive()


let { dispatch }: UI.getData = Meta3D.unsafeGetData(middlewareState, "Meta3D-Engine-Core") -> Obj.magic
let uiState: UI.state = Meta3D.unsafeGetState(middlewareState, "Meta3D-Engine-Core") -> Obj.magic



Meta3D.registerExtension("Meta3D-Canvas")
let c

// c.onActive()



let ee

// ee.onActive()


Meta3D.registerExtension("Meta3D-Editor-EventManager")
Meta3D.registerExtension("Meta3D-EditScene-EventManager")
Meta3D.registerExtension("Meta3D-RunScene-EventManager")

let ee

// ee.onActive()

Meta3D.registerExtension("Meta3D-Editor-UI")


let eu

// eu.onActive()





Meta3D.registerExtension("Meta3D-Register-Extension-UI")


let re

// re.onActive()



Meta3D.registerExtension("Meta3D-Menu")
let me
// me.onActive()
// me.addFirstItem("Config")
// me.addSecondItem("Config", "Version", "Meta3D-ShowVersion")



Meta3D.registerExtension("Meta3D-Init")
Meta3D.registerExtension("Meta3D-Update")
Meta3D.registerExtension("Meta3D-Render")




edem.trigger("Meta3D-Active-Extension").then()
esem.trigger("Meta3D-Active-Extension").then()
rsem.trigger("Meta3D-Active-Extension").then()


me.addFirstItem("Config")
me.addSecondItem("Config", "Version", "Meta3D-ShowVersion")

let _init = () => {
    // edem.trigger("Meta3D-Editor-Init").then()
    // esem.trigger("Meta3D-EditScene-Init").then()
    // rsem.trigger("Meta3D-RunScene-Init").then()
    edem.trigger("Meta3D-Init").then()
    esem.trigger("Meta3D-Init").then()
    rsem.trigger("Meta3D-Init").then()
}

let _frame = () => {
    // Meta3D.update()

    // esem.trigger("Meta3D-Engine-Update").then()
    // rsem.trigger("Meta3D-Engine-Update").then()

    // esem.trigger("Meta3D-Engine-Render").then()
    // rsem.trigger("Meta3D-Engine-Render").then()

    esem.trigger("Meta3D-Update").then()
    rsem.trigger("Meta3D-Update").then()

    esem.trigger("Meta3D-Render").then()
    rsem.trigger("Meta3D-Render").then()


    requestAnimationFrame(_frame)
}

_init() -> Js.Promise.then_(() => {
    _frame()
}, _)


webpack: watch