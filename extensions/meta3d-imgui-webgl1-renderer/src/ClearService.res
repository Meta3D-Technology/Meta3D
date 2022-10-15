let clear = (
  state: StateType.state,
  webgl1Service: Meta3dWebgl1Protocol.ServiceType.service,
  (r, g, b, a),
) => {
  open Pervasives

  let gl = state.gl->Meta3dCommonlib.OptionSt.getExn

  webgl1Service.clearColor(. r, g, b, a, gl)

  webgl1Service.clear(.
    lor(
      lor(webgl1Service.getColorBufferBit(. gl), webgl1Service.getDepthBufferBit(. gl)),
      webgl1Service.getStencilBufferBit(. gl),
    ),
    gl,
  )

  ()
}
