


var stringToNumber = (function(str) {
        return Number(str)
});

var numberToString = (function(value) {
        let str = value.toString();

        return str.indexOf(".") < 0 ? str + ".0" : str;
});

export {
  stringToNumber ,
  numberToString ,
}
/* No side effect */
