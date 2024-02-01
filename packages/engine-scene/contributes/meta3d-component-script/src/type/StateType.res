type script = Meta3dCommonlibType.ComponentType.index

type state = {
  config: Meta3dComponentScriptProtocol.Index.config,
  maxIndex: Meta3dCommonlibType.ComponentType.index,
  attributeMap: Meta3dCommonlibType.ImmutableSparseMapType.t<script, Meta3dComponentScriptProtocol.Index.attributeValue>,
  eventFileStrMap: Meta3dCommonlibType.ImmutableSparseMapType.t<script, string>,
  gameObjectMap: Meta3dCommonlibType.ComponentType.immutableGameObjectMap,
  gameObjectScriptMap: Meta3dCommonlibType.ImmutableSparseMapType.t<
    Meta3dGameobjectProtocol.Index.gameObject,
    script,
  >,
  needDisposedScripts: array<script>,
  disposedScripts: array<script>,
  names: Meta3dCommonlibType.ImmutableSparseMapType.t<
    script,
    Meta3dCommonlibType.ComponentType.name,
  >,
}
