@module("immutable")
external createList: unit => Meta3dType.Index.list = "List"

@module("immutable")
external createListOfData: Meta3dType.Index.arrayData => Meta3dType.Index.list = "List"

@module("immutable")
external createMap: unit => Meta3dType.Index.map = "Map"

@module("immutable")
external createMapOfData: Meta3dType.Index.dictData => Meta3dType.Index.map = "Map"
