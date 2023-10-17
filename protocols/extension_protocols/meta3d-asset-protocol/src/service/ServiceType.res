open StateType

type service = {
  addGLBAsset: (Meta3dType.Index.state, gltf, outsideImmutableDataId) => Meta3dType.Index.state,
  removeGLBAsset: (Meta3dType.Index.state, outsideImmutableDataId) => Meta3dType.Index.state,
  getAllGLBAssets: Meta3dType.Index.state => array<(outsideImmutableDataId, gltf)>,
  exportAsset: Meta3dType.Index.state => assetFile,
  importAsset: (Meta3dType.Index.state, assetFile) => Meta3dType.Index.state,
}
