let floatToString: float => string = %raw(`
    function(value) {
        return value.toString()
}
    `)

let stringToFloat: string => float = %raw(`
    function(str) {
        return parseFloat(str)
}
    `)
