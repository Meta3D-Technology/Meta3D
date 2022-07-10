type protocolIconBase64 = string

type action = SelectExtension(protocolIconBase64, AssembleSpaceCommonType.extension)

type extension = {
  id: string,
  protocolIconBase64: protocolIconBase64,
  newName: option<string>,
  isStart: bool,
  data: Meta3d.ExtensionFileType.extensionFileData,
}

type state = {selectedExtensions: list<extension>}
