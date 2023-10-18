type glb = Js.Typed_array.ArrayBuffer.t

type outsideImmutableDataId = string

type assetFile = Js.Typed_array.ArrayBuffer.t

type state = {allGLBAssets: list<(outsideImmutableDataId, glb)>}
