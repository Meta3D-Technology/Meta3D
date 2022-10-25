


function buildReducers(roleOpt, handlersOpt, param) {
  var role = roleOpt !== undefined ? roleOpt : "";
  var handlers = handlersOpt !== undefined ? handlersOpt : [];
  return {
          role: role,
          handlers: handlers
        };
}

export {
  buildReducers ,
  
}
/* No side effect */
