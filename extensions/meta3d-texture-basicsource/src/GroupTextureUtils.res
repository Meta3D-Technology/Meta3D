let _getMaterials = (materials, texture) => {
  materials->Meta3dCommonlib.ImmutableSparseMap.getExn(texture)
}

let isGroupTexture = (materials, texture) => {
  materials->_getMaterials(texture)->Meta3dCommonlib.ArraySt.length > 1

  //   switch materials->Meta3dCommonlib.ImmutableSparseMap.get(texture) {
  //   | Some(materials) if materials->Meta3dCommonlib.ArraySt.length > 1 => true
  //   | _ => false
  //   }
}

let addMaterial = (materials, texture, material) => {
  materials->Meta3dCommonlib.ImmutableSparseMap.set(
    texture,
    materials->_getMaterials(texture)->Meta3dCommonlib.ArraySt.push(material),
  )
}

let removeMaterial = (materials, texture, material) => {
  materials->Meta3dCommonlib.ImmutableSparseMap.set(
    texture,
    materials
    ->_getMaterials(texture)
    ->Meta3dCommonlib.ArraySt.filter(material_ => material_ != material),
  )
}
