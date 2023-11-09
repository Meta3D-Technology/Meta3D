

import * as OptionSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as DrawDataArrayService$Meta3dImguiWebgl1Renderer from "./DrawDataArrayService.bs.js";

function draw(param, color, state) {
  var height = param.height;
  var width = param.width;
  var y = param.y;
  var x = param.x;
  var drawData = OptionSt$Meta3dCommonlib.getExn(state.drawData);
  var noTextureDrawData = drawData.noTextureDrawData;
  var verticeArr = noTextureDrawData.verticeArr;
  var baseIndex = DrawDataArrayService$Meta3dImguiWebgl1Renderer.getBaseIndex(verticeArr);
  return {
          isDebug: state.isDebug,
          drawData: {
            noTextureDrawData: {
              verticeArr: DrawDataArrayService$Meta3dImguiWebgl1Renderer.addPoints(verticeArr, [
                    x,
                    y,
                    x,
                    y + height,
                    x + width,
                    y,
                    x + width,
                    y + height
                  ]),
              colorArr: DrawDataArrayService$Meta3dImguiWebgl1Renderer.addPoints(noTextureDrawData.colorArr, DrawDataArrayService$Meta3dImguiWebgl1Renderer.concatArrays([
                        color,
                        color,
                        color,
                        color
                      ])),
              indexArr: DrawDataArrayService$Meta3dImguiWebgl1Renderer.addPoints(noTextureDrawData.indexArr, [
                    baseIndex,
                    baseIndex + 1 | 0,
                    baseIndex + 2 | 0,
                    baseIndex + 3 | 0,
                    baseIndex + 2 | 0,
                    baseIndex + 1 | 0
                  ])
            }
          },
          gl: state.gl,
          noTextureShaderData: state.noTextureShaderData,
          lastWebglData: state.lastWebglData
        };
}

export {
  draw ,
  
}
/* No side effect */
