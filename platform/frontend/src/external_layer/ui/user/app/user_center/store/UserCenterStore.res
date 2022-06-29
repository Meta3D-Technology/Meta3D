type id = string

type extension = {
  id: id,
  data: Meta3d.ExtensionFileType.extensionFileData,
}
type selectedExtensions = list<extension>

type action = SetUserName(string) | SelectExtension(extension) | NotSelectExtension(id)

type state = {
  username: option<string>,
  selectedExtensions: selectedExtensions,
}

let reducer = (state, action) => {
  switch action {
  | SetUserName(username) => {...state, username: Some(username)}
  | SelectExtension(data) => {
      ...state,
      selectedExtensions: state.selectedExtensions->Meta3dCommonlib.ListSt.push(data),
    }
  | NotSelectExtension(id) => {
      ...state,
      selectedExtensions: state.selectedExtensions->Meta3dCommonlib.ListSt.filter(
        selectedExtension => selectedExtension.id !== id,
      ),
    }
  }
}

let initialState = {
  username: None,
  selectedExtensions: list{},
}
