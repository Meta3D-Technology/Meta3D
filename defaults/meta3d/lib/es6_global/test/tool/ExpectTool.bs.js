


var isFunction = (function(func) {
return func instanceof Function
       });

var isUint8Array = (function(typedArray) {
return typedArray instanceof Uint8Array
       });

export {
  isFunction ,
  isUint8Array ,
}
/* No side effect */
