open StateType

let get = ({needDisposedBasicCameraViews}) => {
  needDisposedBasicCameraViews->Meta3dCommonlib.ArraySt.removeDuplicateItems
}
