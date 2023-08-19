open FrontendUtils.AntdCharts
// %%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  // let useSelector = ({canvasData}: FrontendUtils.ApAssembleStoreType.state) => {
  //   canvasData
  // }
}

@react.component
let make = (~service: service) => {
  <DecompositionTreeGraph
    data={
      // {Meta3dCommonlib.ImmutableHashMap.createEmpty()
      // ->Meta3dCommonlib.ImmutableHashMap.set("id", "A0")
      // ->Meta3dCommonlib.ImmutableHashMap.set("value",

      // )
      // }

      {
        "id": "A0",
        "value": {
          "title": "订单金额",
          "items": [
            {
              "text": "3031万",
            },
          ],
        },
        "children": [],
      }->Obj.magic
    }
    markerCfg={cfg => {
      let {children} = cfg

      {
        show: children->Meta3dCommonlib.ArraySt.length,
      }
    }}
    behaviors=["drag-canvas", "zoom-canvas", "drag-node"]
  />
}
