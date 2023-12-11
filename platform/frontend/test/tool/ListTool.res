let getHeadExn = list => {
  list->Meta3dCommonlib.ListSt.head->Meta3dCommonlib.OptionSt.getExn
}

let getNthExn = (list, index) => {
  list->Meta3dCommonlib.ListSt.nth(index)->Meta3dCommonlib.OptionSt.getExn
}
