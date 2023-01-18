


function getBrowser(state) {
  return state.browser;
}

function setBrowser(state, browser) {
  return {
          eventData: state.eventData,
          canvas: state.canvas,
          body: state.body,
          browser: browser
        };
}

export {
  getBrowser ,
  setBrowser ,
}
/* No side effect */
