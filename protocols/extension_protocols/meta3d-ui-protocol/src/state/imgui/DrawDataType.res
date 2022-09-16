// type customTextureDrawData = {
//   customTexture: option<WonderWebgl.GlType.texture>,
//   verticeArr: array<float>,
//   colorArr: array<float>,
//   texCoordArr: array<float>,
//   indexArr: array<int>,
// }

// type fontTextureDrawData = {
//   verticeArr: array<float>,
//   colorArr: array<float>,
//   texCoordArr: array<float>,
//   indexArr: array<int>,
// }

type noTextureDrawData = {
  verticeArr: array<float>,
  colorArr: array<float>,
  indexArr: array<int>,
}

// type customTextureDrawElementsData = {
//   customTexture: option<WonderWebgl.GlType.texture>,
//   count: int,
//   countOffset: int,
// }

// type fontTextureDrawElementsData = {count: int}

type noTextureDrawElementsData = {count: int}

// type customTextureDrawElementsDataArr = array<customTextureDrawElementsData>
