type id = string

// type extension = {
//   id: id,
//   data: Meta3d.ExtensionFileType.extensionFileData,
// }
type extension = FrontendUtils.AssembleSpaceCommonType.extension

type selectedExtensions = list<extension>

type contribute = FrontendUtils.AssembleSpaceCommonType.contribute

type selectedContributes = list<FrontendUtils.AssembleSpaceCommonType.contributeData>

// type selectedContributeProtocolConfigs = list<
//   option<FrontendUtils.CommonType.protocolConfig>,
// >

type action =
  | SetUserName(string)
  | SelectExtension(extension)
  | NotSelectExtension(id)
  | SelectContribute(contribute, option<FrontendUtils.CommonType.protocolConfig>)
  | NotSelectContribute(id)

type state = {
  username: option<string>,
  selectedExtensions: selectedExtensions,
  selectedContributes: selectedContributes,
  // selectedContributeProtocolConfigs: selectedContributeProtocolConfigs,
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
  | SelectContribute(data, protocolConfigOpt) => {
      ...state,
      selectedContributes: state.selectedContributes->Meta3dCommonlib.ListSt.push((
        data,
        protocolConfigOpt,
      )),
      // selectedContributeProtocolConfigs: state.selectedContributeProtocolConfigs->Meta3dCommonlib.ListSt.push(
      //   protocolConfigOpt,
      // ),
    }
  | NotSelectContribute(id) => {
      ...state,
      selectedContributes: state.selectedContributes->Meta3dCommonlib.ListSt.filter(((
        selectedContribute,
        _,
      )) => selectedContribute.id !== id),
    }
  }
}

let initialState = {
  username: None,
  selectedExtensions: list{},
  selectedContributes: list{},
  // selectedContributeProtocolConfigs: list{},
}
