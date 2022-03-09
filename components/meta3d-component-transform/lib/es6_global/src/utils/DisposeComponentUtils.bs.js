


function batchRemoveFromArray(arr, targets) {
  return arr.filter(function (value) {
              return !targets.includes(value);
            });
}

export {
  batchRemoveFromArray ,
  
}
/* No side effect */
