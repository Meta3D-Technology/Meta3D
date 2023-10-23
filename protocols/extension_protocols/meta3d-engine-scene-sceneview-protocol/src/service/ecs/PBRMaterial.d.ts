import { state as meta3dState } from "meta3d-type"
import { componentName, pbrMaterial, diffuseColor, dataName, specular, specularColor } from "meta3d-component-pbrmaterial-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"
import { texture } from "meta3d-texture-basicsource-protocol/src/state/StateType"

export type createPBRMaterial = (meta3dState: meta3dState) => [meta3dState, pbrMaterial]

export type getName = (meta3dState: meta3dState, pbrMaterial: pbrMaterial) => nullable<string>

export type setName = (meta3dState: meta3dState, pbrMaterial: pbrMaterial, name: string) => meta3dState

export type getDiffuseColor = (meta3dState: meta3dState, pbrMaterial: pbrMaterial) => nullable<diffuseColor>

export type setDiffuseColor = (meta3dState: meta3dState, pbrMaterial: pbrMaterial, diffuseColor: diffuseColor) => meta3dState

export type getSpecular = (meta3dState: meta3dState, pbrMaterial: pbrMaterial) => nullable<specular>

export type setSpecular = (meta3dState: meta3dState, pbrMaterial: pbrMaterial, specular: specular) => meta3dState

export type getSpecularColor = (meta3dState: meta3dState, pbrMaterial: pbrMaterial) => nullable<specularColor>

export type setSpecularColor = (meta3dState: meta3dState, pbrMaterial: pbrMaterial, specularColor: specularColor) => meta3dState

export type getRoughness = (meta3dState: meta3dState, pbrMaterial: pbrMaterial) => nullable<number>

export type setRoughness = (meta3dState: meta3dState, pbrMaterial: pbrMaterial, roughness: number) => meta3dState

export type getMetalness = (meta3dState: meta3dState, pbrMaterial: pbrMaterial) => nullable<number>

export type setMetalness = (meta3dState: meta3dState, pbrMaterial: pbrMaterial, metalness: number) => meta3dState

export type getTransmission = (meta3dState: meta3dState, pbrMaterial: pbrMaterial) => nullable<number>

export type setTransmission = (meta3dState: meta3dState, pbrMaterial: pbrMaterial, transmission: number) => meta3dState

export type getIOR = (meta3dState: meta3dState, pbrMaterial: pbrMaterial) => nullable<number>

export type setIOR = (meta3dState: meta3dState, pbrMaterial: pbrMaterial, ior: number) => meta3dState

export type getDiffuseMap = (meta3dState: meta3dState, pbrMaterial: pbrMaterial) => nullable<texture>

export type setDiffuseMap = (meta3dState: meta3dState, pbrMaterial: pbrMaterial, texture: texture) => meta3dState

export type getRoughnessMap = (meta3dState: meta3dState, pbrMaterial: pbrMaterial) => nullable<texture>

export type setRoughnessMap = (meta3dState: meta3dState, pbrMaterial: pbrMaterial, texture: texture) => meta3dState

export type getMetalnessMap = (meta3dState: meta3dState, pbrMaterial: pbrMaterial) => nullable<texture>

export type setMetalnessMap = (meta3dState: meta3dState, pbrMaterial: pbrMaterial, texture: texture) => meta3dState

export type getNormalMap = (meta3dState: meta3dState, pbrMaterial: pbrMaterial) => nullable<texture>

export type setNormalMap = (meta3dState: meta3dState, pbrMaterial: pbrMaterial, texture: texture) => meta3dState

export type getAllPBRMaterials = (meta3dState: meta3dState) => pbrMaterial[]

export type getGameObjects = (meta3dState: meta3dState, pbrMaterial: pbrMaterial) => Array<gameObject>