


var get = (function (name){
return window.localStorage.getItem( name ) 
});

var set = (function (name, value){
window.localStorage.setItem(name, value)
});

var remove = (function (name){
window.localStorage.removeItem( name ) 
});

export {
  get ,
  set ,
  remove ,
}
/* No side effect */
