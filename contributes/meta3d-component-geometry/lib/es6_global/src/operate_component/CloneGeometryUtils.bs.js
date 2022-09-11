


function clone(state, countRange, sourceGeometry) {
  return [
          state,
          countRange.map(function (param) {
                return sourceGeometry;
              })
        ];
}

export {
  clone ,
  
}
/* No side effect */
