open BackendCloudbaseType

type backendService = {getAllPublishExtensionProtocols: getAllPublishExtensionProtocols}

type id = string

type extension = {
  id: id,
  data: Meta3d.ExtensionFileType.extensionFileData,
}

type selectedExtensions = list<extension>
