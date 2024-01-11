let get = %raw(`
function (name){
return window.localStorage.getItem( name ) 
}
`)

let set = %raw(`
function (name, value){
window.localStorage.setItem(name, value)
}
`)

let remove = %raw(`
function (name){
window.localStorage.removeItem( name ) 
}
`)
