


function create(eventName, userData) {
  return {
          name: eventName,
          isStopPropagation: false,
          phase: undefined,
          userData: userData
        };
}

export {
  create ,
  
}
/* No side effect */
