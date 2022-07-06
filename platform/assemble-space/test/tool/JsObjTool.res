let invokeObjMethod = %raw(`
function(jsObj, methodName, paramsArr) {
    return jsObj[methodName].apply(null, paramsArr)
}
`)

let getObjValue = %raw(`
function(jsObj,key ) {
    return jsObj[key]
}
`)


let setObjValue = %raw(`
function(jsObj,key, value) {
    jsObj[key] = value

    return jsObj
}
`)
