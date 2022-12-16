

import * as ManagerUtils$Meta3d from "./ManagerUtils.bs.js";
import * as BinaryFileOperator$Meta3d from "../file/BinaryFileOperator.bs.js";

function convertAllFileData(allExtensionFileData, allContributeFileData, param) {
  return ManagerUtils$Meta3d.convertAllFileData(allExtensionFileData, allContributeFileData, [
              param[0],
              [
                [],
                param[1]
              ],
              param[2]
            ]);
}

function generate(param) {
  return BinaryFileOperator$Meta3d.generate(ManagerUtils$Meta3d.generate([
                  param[0],
                  param[1]
                ]));
}

function load(packageBinaryFile) {
  var match = ManagerUtils$Meta3d.load(BinaryFileOperator$Meta3d.load(packageBinaryFile));
  var allExtensionDataArr = match[1];
  return [
          match[0],
          allExtensionDataArr,
          ManagerUtils$Meta3d.getSpecificExtensionName(allExtensionDataArr, /* Entry */2)
        ];
}

export {
  convertAllFileData ,
  generate ,
  load ,
}
/* ManagerUtils-Meta3d Not a pure module */
