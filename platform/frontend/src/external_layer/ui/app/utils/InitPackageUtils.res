let getEditorWholePackageProtocolName = ElementVisualUtils.getEditorWholePackageProtocolName

let getEngineWholePackageProtocolName = () => "meta3d-engine-whole-protocol"

let getEditorWholeAndEngineWholePackageData = () => {
  list{
    ("editor-whole", "meta3d-editor-webgl1-three-whole", getEditorWholePackageProtocolName()),
    ("engine-whole", "meta3d-engine-whole", getEngineWholePackageProtocolName()),
  }
}
