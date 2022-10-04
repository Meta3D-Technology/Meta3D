let stringToInt: string => int = %raw(`
    function(str) {
        return parseInt(str, 10)
}
    `)
