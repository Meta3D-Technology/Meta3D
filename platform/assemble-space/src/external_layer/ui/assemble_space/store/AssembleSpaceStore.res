// TODO remove isLoaded

open FrontendUtils.AssembleSpaceStoreType

let reducer = (state, action) => {
  switch action {
  | SetIsLoaded(isLoaded) => {isLoaded: isLoaded}
  }
}

let initialState = {
  isLoaded: false,
}
