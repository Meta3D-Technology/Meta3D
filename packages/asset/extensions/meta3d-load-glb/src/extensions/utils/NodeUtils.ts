/*! handle as GLTFLoader.js
* 
*/
export let handleNodeNameToAsGLTFLoader = (nodeName: string) => {
    return nodeName.replace(/\s/g, "_")
}