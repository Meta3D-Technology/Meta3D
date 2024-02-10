export const componentName = "Script"

export type state = any

export type config = { readonly isDebug: boolean };

export type attributeValue = any

export type assetData = {
  name:string,
  eventFileStr:string
}

export type allAssetData = Array<assetData>

export const dataName = {
  name: 0,
  attribute: 1,
  allAssetData: 2,
}

export type script = number

export type needDisposedComponents = script[]