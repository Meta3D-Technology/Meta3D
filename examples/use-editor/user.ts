import { init, loop } from "wonder-editor-ts/src/Main"

init().then((state) => {
    loop(state)
})
