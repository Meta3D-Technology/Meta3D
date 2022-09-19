open EventManagerStateType

let setChrome = state => {
  ...state,
  browser: Chrome,
}

let setFirefox = state => {
  ...state,
  browser: Firefox,
}

let setAndroid = state => {
  ...state,
  browser: Android,
}

let setIOS = state => {
  ...state,
  browser: IOS,
}

let setUnknown = state => {
  ...state,
  browser: Unknown,
}
