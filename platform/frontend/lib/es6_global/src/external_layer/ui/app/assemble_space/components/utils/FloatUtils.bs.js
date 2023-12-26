


var floatToString = (function(value) {
        return value.toString()
});

var stringToFloat = (function(str) {
        return parseFloat(str)
});

export {
  floatToString ,
  stringToFloat ,
}
/* No side effect */
