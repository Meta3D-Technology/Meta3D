let getMonaco = %raw(`
function (){
return globalThis["meta3d_monaco"]
}
`)

let _setMonaco = %raw(`
function (monaco){
globalThis["meta3d_monaco"] = monaco
}
`)

let deferLoad = %raw(`
function (){
return import(
    /* webpackPrefetch: true */"monaco-editor/esm/vs/editor/editor.api.js"
  ).then(value =>{
_setMonaco(value)

return value
  })
}
`)
