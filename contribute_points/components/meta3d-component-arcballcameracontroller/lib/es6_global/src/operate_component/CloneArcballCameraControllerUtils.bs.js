

import * as OptionSt$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as CloneUtils$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/scene_graph/component/CloneUtils.bs.js";
import * as CreateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller from "./CreateArcballCameraControllerUtils.bs.js";
import * as OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller from "../utils/OperateArcballCameraControllerUtils.bs.js";

function _setData(state, clonedArcballCameraController, param) {
  var moveSpeedY = param[7];
  return OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setWheelSpeed(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setRotateSpeed(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setMoveSpeedY(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setMoveSpeedX(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setTarget(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setThetaMargin(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setTheta(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setPhi(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setMinDistance(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.setDistance(state, clonedArcballCameraController, param[0]), clonedArcballCameraController, param[1]), clonedArcballCameraController, param[2]), clonedArcballCameraController, param[3]), clonedArcballCameraController, param[4]), clonedArcballCameraController, param[5]), clonedArcballCameraController, moveSpeedY), clonedArcballCameraController, moveSpeedY), clonedArcballCameraController, param[8]), clonedArcballCameraController, param[9]);
}

function _getData(state, sourceArcballCameraController) {
  return [
          OptionSt$Meta3dCommonlib.getExn(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getDistance(state, sourceArcballCameraController)),
          OptionSt$Meta3dCommonlib.getExn(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getMinDistance(state, sourceArcballCameraController)),
          OptionSt$Meta3dCommonlib.getExn(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getPhi(state, sourceArcballCameraController)),
          OptionSt$Meta3dCommonlib.getExn(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getTheta(state, sourceArcballCameraController)),
          OptionSt$Meta3dCommonlib.getExn(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getThetaMargin(state, sourceArcballCameraController)),
          OptionSt$Meta3dCommonlib.getExn(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getTarget(state, sourceArcballCameraController)),
          OptionSt$Meta3dCommonlib.getExn(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getMoveSpeedX(state, sourceArcballCameraController)),
          OptionSt$Meta3dCommonlib.getExn(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getMoveSpeedY(state, sourceArcballCameraController)),
          OptionSt$Meta3dCommonlib.getExn(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getRotateSpeed(state, sourceArcballCameraController)),
          OptionSt$Meta3dCommonlib.getExn(OperateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.getWheelSpeed(state, sourceArcballCameraController))
        ];
}

function clone(state, countRange, sourceArcballCameraController) {
  return CloneUtils$Meta3dCommonlib.clone(state, [
              CreateArcballCameraControllerUtils$Meta3dComponentArcballcameracontroller.create,
              _getData,
              _setData
            ], countRange, sourceArcballCameraController);
}

export {
  _setData ,
  _getData ,
  clone ,
  
}
/* No side effect */
