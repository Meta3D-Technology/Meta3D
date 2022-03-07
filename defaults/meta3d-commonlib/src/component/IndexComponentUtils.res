let _getDisposedIndex = disposedComponentArray => (
  disposedComponentArray,
  disposedComponentArray->Js.Array.pop,
)

let generateIndex = (disposedComponentArray, index) =>
  switch _getDisposedIndex(disposedComponentArray) {
  | (disposedComponentArray, None) => (disposedComponentArray, index, succ(index))
  | (disposedComponentArray, Some(disposedIndex)) => (disposedComponentArray, disposedIndex, index)
  }
