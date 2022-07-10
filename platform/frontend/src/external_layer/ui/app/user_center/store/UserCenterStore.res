type id = string

// type extension = {
//   id: id,
//   data: Meta3d.ExtensionFileType.extensionFileData,
// }
type extension = FrontendUtils.AssembleSpaceCommonType.extension
type selectedExtensions = list<extension>

type contribute = {
  id: id,
  data: Meta3d.ExtensionFileType.contributeFileData,
}
type selectedContributes = list<contribute>

type action =
  | SetUserName(string)
  | SelectExtension(extension)
  | NotSelectExtension(id)
  | SelectContribute(contribute)
  | NotSelectContribute(id)

type state = {
  username: option<string>,
  selectedExtensions: selectedExtensions,
  selectedContributes: selectedContributes,
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
  | SelectContribute(data) => {
      ...state,
      selectedContributes: state.selectedContributes->Meta3dCommonlib.ListSt.push(data),
    }
  | NotSelectContribute(id) => {
      ...state,
      selectedContributes: state.selectedContributes->Meta3dCommonlib.ListSt.filter(
        selectedContribute => selectedContribute.id !== id,
      ),
    }
  }
}

let initialState = {
  username: None,
  selectedExtensions: list{},
  selectedContributes: list{},
}
