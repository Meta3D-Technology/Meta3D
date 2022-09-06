let get = %raw(`
    function(search, key) {
        const urlParams = new URLSearchParams(search)

return urlParams.get(key)
}
    `)
