import { createGameObject, init, update, render } from "./user_engine_design";

function _createScene() {
    let cube = createGameObject()
    ...
}

_createScene()

function _frame() {
    update().then(() => {
        render().then(() => {
            requestAnimationFrame(() => {
                _frame()
            });
        })
    })
}

init().then(() => {
    //console.log("finish init")

    _frame();
})