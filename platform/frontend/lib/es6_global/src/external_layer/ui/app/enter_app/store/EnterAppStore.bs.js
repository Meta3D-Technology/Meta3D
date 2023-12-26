


function reducer(state, action) {
  return {
          account: action._0,
          appName: action._1
        };
}

var initialState = {
  account: undefined,
  appName: undefined
};

export {
  reducer ,
  initialState ,
}
/* No side effect */
