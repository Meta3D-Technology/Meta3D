let stringToInt: string => int = %raw(`
    function(str) {
        return parseInt(str, 10)
}
    `)

let intToString: int => string = %raw(`
    function(value) {
        return value.toString()
}
    `)

let isInteger: int => bool = %raw(`
    function(value) {
        return Number.isInteger(value)
}
    `)
