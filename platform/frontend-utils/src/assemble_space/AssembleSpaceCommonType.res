type id = string

type extension = {
  id: id,
  data: Meta3d.ExtensionFileType.extensionFileData,
  version: string,
  username: string
}

type contribute = {
  id: id,
  data: Meta3d.ExtensionFileType.contributeFileData,
  version: string,
  username: string
}
