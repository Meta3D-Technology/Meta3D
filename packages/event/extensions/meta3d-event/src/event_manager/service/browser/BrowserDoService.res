open EventManagerStateType

let getBrowser = state => {
  state.browser
}

let setBrowser = (state, browser) => {
  {
    ...state,
    browser: browser,
  }
}
