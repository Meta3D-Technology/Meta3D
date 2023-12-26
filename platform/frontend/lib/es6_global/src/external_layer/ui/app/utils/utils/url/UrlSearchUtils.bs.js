


var get = (function(search, key) {
        const urlParams = new URLSearchParams(search)

return urlParams.get(key)
});

export {
  get ,
}
/* No side effect */
