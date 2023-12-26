

import * as ElementVisualUtils$Frontend from "../assemble_space/components/element_assemble/utils/ElementVisualUtils.bs.js";

function getEngineWholePackageProtocolName(param) {
  return "meta3d-engine-whole-protocol";
}

function getEditorWholeAndEngineWholePackageData(param) {
  return {
          hd: [
            "editor-whole",
            "meta3d-editor-webgl1-three-whole",
            ElementVisualUtils$Frontend.getEditorWholePackageProtocolName(undefined)
          ],
          tl: {
            hd: [
              "engine-whole",
              "meta3d-engine-whole",
              "meta3d-engine-whole-protocol"
            ],
            tl: /* [] */0
          }
        };
}

var getEditorWholePackageProtocolName = ElementVisualUtils$Frontend.getEditorWholePackageProtocolName;

export {
  getEditorWholePackageProtocolName ,
  getEngineWholePackageProtocolName ,
  getEditorWholeAndEngineWholePackageData ,
}
/* No side effect */
