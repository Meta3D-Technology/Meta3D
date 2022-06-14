let isFunction = %raw(`
    function(func) {
return func instanceof Function
       }
      `)


let isUint8Array = %raw(`
    function(typedArray) {
return typedArray instanceof Uint8Array
       }
      `)
