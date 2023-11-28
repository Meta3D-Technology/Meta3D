let stringToNumber = %raw(`
    function(str) {
        return Number(str)
}
    `)

let numberToString = %raw(`
    function(value) {
        let str = value.toString();

        return str.indexOf(".") < 0 ? str + ".0" : str;
}
    `)
