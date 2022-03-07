'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");

function _getDisposedIndex(disposedComponentArray) {
  return [
          disposedComponentArray,
          Caml_option.undefined_to_opt(disposedComponentArray.pop())
        ];
}

function generateIndex(disposedComponentArray, index) {
  var match = _getDisposedIndex(disposedComponentArray);
  var disposedIndex = match[1];
  var disposedComponentArray$1 = match[0];
  if (disposedIndex !== undefined) {
    return [
            disposedComponentArray$1,
            disposedIndex,
            index
          ];
  } else {
    return [
            disposedComponentArray$1,
            index,
            index + 1 | 0
          ];
  }
}

exports._getDisposedIndex = _getDisposedIndex;
exports.generateIndex = generateIndex;
/* No side effect */
