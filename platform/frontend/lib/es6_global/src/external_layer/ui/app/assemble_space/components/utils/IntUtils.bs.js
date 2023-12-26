


var stringToInt = (function(str) {
        return parseInt(str, 10)
});

var intToString = (function(value) {
        return value.toString()
});

var isInteger = (function(value) {
        return Number.isInteger(value)
});

export {
  stringToInt ,
  intToString ,
  isInteger ,
}
/* No side effect */
