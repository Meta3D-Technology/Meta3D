'use strict';

var Caml_obj = require("rescript/lib/js/caml_obj.js");

var isEqual = Caml_obj.caml_equal;

exports.isEqual = isEqual;
/* No side effect */
