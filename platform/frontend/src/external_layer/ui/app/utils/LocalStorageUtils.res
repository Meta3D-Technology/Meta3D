let get = %raw(`
function (name){
return globalThis.localStorage.getItem( name ) 
}
`)

let set = %raw(`
function (name, value){
globalThis.localStorage.setItem(name, value)
}
`)

let remove = %raw(`
function (name){
globalThis.localStorage.removeItem( name ) 
}
`)
