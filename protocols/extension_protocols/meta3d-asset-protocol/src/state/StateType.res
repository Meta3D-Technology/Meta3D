type glb = Js.Typed_array.ArrayBuffer.t

type glbName = string

type outsideImmutableDataId = string

type assetFile = Js.Typed_array.ArrayBuffer.t

type state = {allGLBAssets: list<(outsideImmutableDataId, glbName, glb)>}
