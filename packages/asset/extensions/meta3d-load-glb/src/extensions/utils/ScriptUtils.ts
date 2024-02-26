export let setScriptUserData = (func, gltf, gameObjectName) => {
    for (let scene of gltf.scenes) {
        scene.traverse(object => {
            // if (!object.isMesh || object.name != gameObjectName) {
            if (object.name != gameObjectName) {
                return
            }

            func(object)
        })
    }
}