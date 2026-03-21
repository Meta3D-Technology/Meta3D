open ElementAssembleStoreType

let _buildDefaultUIControlInspectorData = (id, specific) => {
  {
    id,
    rect: {
      x: 0->IntForRectField,
      y: 0->IntForRectField,
      width: 20->IntForRectField,
      height: 20->IntForRectField,
    },
    isDraw: true->BoolForIsDraw,
    event: [],
    input: None,
    specific,
    children: list{},
  }
}

let _createState = () => {
  canvasData: {
    width: 0,
    height: 0,
  },
  selectedUIControls: list{},
  parentUIControlId: None,
  inspectorCurrentUIControlId: None,
  selectedUIControlInspectorData: list{},
  // visualExtension: None,
  // runVisualExtension: None,
  elementContribute: None,
  // isShowElementInspector: false,
  // elementInspectorData: {
  //   elementStateFields: list{},
  //   // reducers: {
  //   //   role: None,
  //   //   handlers: list{},
  //   // },
  // },
  // isImportElement: false,
  // isImportElementCustom: false,
  customInputs: list{},
  customActions: list{},
  currentCustomInputName: None,
  currentCustomActionName: None,
  currentCode: EmptyCode,
  // currentChangeCode: EmptyChangeCode,
  isInCreateFromScratchTourPhase2: false,
  // isJumpToCreateFromScratchTourPhase2Guide: false,
}

let _setUIControlInspectorData = (state, setFunc, id) => {
  {
    ...state,
    selectedUIControlInspectorData: HierachyUtils.mapSelectedUIControlData(
      setFunc,
      (
        (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
        (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
        (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
          ...data,
          children,
        },
      ),
      state.selectedUIControlInspectorData,
      id,
    ),
  }
}

let _updateAllUIControlInspectorData = (state, setFunc) => {
  {
    ...state,
    selectedUIControlInspectorData: HierachyUtils.mapAllSelectedUIControlData(
      setFunc,
      (
        (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
        (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
          ...data,
          children,
        },
      ),
      state.selectedUIControlInspectorData,
    ),
  }
}

let _setActionData = (state, id, eventName, actionNameOpt, actionParams) => {
  _setUIControlInspectorData(
    state,
    data => {
      ...data,
      event: switch data.event {
      | event
        if event->Meta3dCommonlib.ArraySt.length == 0 &&
          actionNameOpt->Meta3dCommonlib.OptionSt.isSome => [
          {
            eventName,
            actionName: actionNameOpt->Meta3dCommonlib.OptionSt.getExn,
            actionParams,
          },
        ]
      | _ =>
        switch actionNameOpt {
        | None =>
          data.event->Meta3dCommonlib.ArraySt.filter(eventData => {
            eventData.eventName !== eventName
          })
        | Some(actionName) =>
          data.event->Meta3dCommonlib.ArraySt.includesByFunc(eventData => {
            eventData.eventName === eventName
          })
            ? data.event->Meta3dCommonlib.ArraySt.map(eventData => {
                eventData.eventName === eventName
                  ? {
                      (
                        {
                          eventName,
                          actionName,
                          actionParams,
                        }: eventData
                      )
                    }
                  : eventData
              })
            : data.event->Js.Array.concat(
                [
                  (
                    {
                      eventName,
                      actionName,
                      actionParams,
                    }: eventData
                  ),
                ],
                _,
              )
        }
      },
    },
    id,
  )
}

let _findParentUIControlId = (
  (hasChildren, serializeUIControlProtocolConfigLib),
  selectedUIControls,
  id,
) => {
  let {protocolConfigStr, parentId} =
    HierachyUtils.findSelectedUIControlData(
      None,
      (
        (data: ElementAssembleStoreType.uiControl) => data.id,
        (data: ElementAssembleStoreType.uiControl) => data.children,
      ),
      selectedUIControls,
      id,
    )->Meta3dCommonlib.OptionSt.getExn

  hasChildren(. serializeUIControlProtocolConfigLib(. protocolConfigStr)) ? id->Some : parentId
  // ->Meta3dCommonlib.OptionSt.bind(
  //     _findParentUIControlId(
  //       (hasChildren, serializeUIControlProtocolConfigLib),
  //       selectedUIControls,
  //       _,
  //     ),
  //   )
}

let _resetCurrent = state => {
  {
    ...state,
    currentCustomInputName: None,
    currentCustomActionName: None,
    inspectorCurrentUIControlId: None,
  }
}

let _resetInspector = state => {
  // ...state,
  // inspectorCurrentUIControlId: None,
  // currentCustomInputName: None,
  // currentCustomActionName: None,
  state->_resetCurrent
}

let _reset = state => {
  {
    ..._createState(),
    canvasData: state.canvasData,
    isInCreateFromScratchTourPhase2: state.isInCreateFromScratchTourPhase2,
    // isJumpToCreateFromScratchTourPhase2Guide: state.isJumpToCreateFromScratchTourPhase2Guide,
    // customInputs: state.customInputs,
    // customActions: state.customActions,
  }
}

let _isNameExist = (newName, oldName, customs) => {
  newName == oldName
    ? false
    : customs
      ->Meta3dCommonlib.ListSt.find((custom: CommonType.custom) => {
        custom.name == newName
      })
      ->Meta3dCommonlib.OptionSt.isSome
}

let _findSelectUIControlById = (state: state, id) => {
  // state.selectedUIControls->Meta3dCommonlib.ListSt.find(data => {
  //   data.id == id
  // })

  HierachyUtils.findSelectedUIControlData(
    None,
    (
      (data: ElementAssembleStoreType.uiControl) => data.id,
      (data: ElementAssembleStoreType.uiControl) => data.children,
    ),
    state.selectedUIControls,
    id,
  )
}

let _findSelectedUIControlInspectorDataById = (state: state, id) => {
  // state.selectedUIControlInspectorData->Meta3dCommonlib.ListSt.find(data => {
  //   data.id == id
  // })

  HierachyUtils.findSelectedUIControlData(
    None,
    (
      (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
      (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
    ),
    state.selectedUIControlInspectorData,
    id,
  )
}

// let rec _copyUIControl = ( control: ElementAssembleStoreType.uiControl ) => {
//   // let newId = generateId(control.id)
//   let newId = IdUtils.generateId(Js.Math.random)

//   {
//     ...control,
//     id: newId,
//     children: control.children->Belt.List.map(child => _copyUIControl(child)),
//   }
// }

// let rec _copyInspectorData = ( inspector: ElementAssembleStoreType.uiControlInspectorData ) => {
//   let newId = IdUtils.generateId(Js.Math.random)
//   {
//     ...inspector,
//     id: newId,
//     children: inspector.children->Belt.List.map(child => _copyInspectorData(child)),
//   }
// }

// let rec _copyNodeWithInspector = (control: uiControl, inspector: uiControlInspectorData) => {
//   let newId = IdUtils.generateId(Js.Math.random)

//   let (childrenControls, childrenInspectors) =
//     Belt.List.zip(control.children, inspector.children)
//     ->Belt.List.map(((childControl, childInspector)) =>
//         _copyNodeWithInspector(childControl, childInspector)
//       )
//     ->Belt.List.unzip
//   (
//     {
//       ...control,
//       id: newId,
//       children: childrenControls,
//     },
//     {
//       ...inspector,
//       id: newId,
//       children: childrenInspectors,
//     }
//   )
// }

let _updateSpecificLabelAndId = (specific: specific, newId) => {
  specific->Meta3dCommonlib.ArraySt.map(item => {
    if (item.name == "label" || item.name == "id") && item.type_ == #string {
      let oldStr: string = switch item.value {
      | SpecicFieldDataValue(str) => str->Obj.magic
      }
      // 替换 "##" 后的数字部分
      let newStr = oldStr->Js.String.replaceByRe(%re("/\#\#\d+$/g"), "##" ++ newId, _)
      //       let newStr = Js.Re.replace_(
      //   ~regexp=Js.Re.fromString("##\\d+$"),
      //   ~by="##" ++ newId,
      //   oldStr,
      // )
      {...item, value: {SpecicFieldDataValue(newStr->Obj.magic)}}
    } else {
      item
    }
  })
}

let rec _copyNodeWithInspector = (control: uiControl, inspector: uiControlInspectorData) => {
  let newId = IdUtils.generateId(Js.Math.random)

  let (childrenControls, childrenInspectors) =
    Belt.List.zip(control.children, inspector.children)
    ->Belt.List.map(((childControl, childInspector)) =>
      _copyNodeWithInspector(childControl, childInspector)
    )
    ->Belt.List.unzip

  let updatedInspector = {
    ...inspector,
    id: newId,
    children: childrenInspectors,
    specific: _updateSpecificLabelAndId(inspector.specific, newId),
  }

  (
    {
      ...control,
      id: newId,
      children: childrenControls,
    },
    updatedInspector,
  )
}

let reducer = (state, action) => {
  switch action {
  | ResetWhenEnter => state->_reset
  | ResetWhenSwitch => state->_resetInspector
  // | CopyUIControl(id) =>
  //   let nodeOpt = _findSelectUIControlById(state, id)
  //   let inspectorOpt = _findSelectedUIControlInspectorDataById(state, id)
  //   switch (nodeOpt, inspectorOpt) {
  //   | (Some(node), Some(inspector)) =>
  //     let copiedNode = _copyUIControl(node)
  //     let copiedInspector = _copyInspectorData(inspector)

  //     let parentId = node.parentId
  //     let (currentLevelList, currentLevelInspectorList) = switch parentId {
  //     | Some(pid) =>
  //       // 获取父节点
  //       let parentOpt = _findSelectUIControlById(state, pid)
  //       let parentInspectorOpt = _findSelectedUIControlInspectorDataById(state, pid)
  //       switch (parentOpt, parentInspectorOpt) {
  //       | (Some(parent), Some(parentInspector)) => (parent.children, parentInspector.children)
  //       | _ => (list{}, list{})
  //       }
  //     | None => (state.selectedUIControls, state.selectedUIControlInspectorData)
  //     }

  //     // 找到原节点在列表中的位置
  //   let indexOpt = currentLevelList->Meta3dCommonlib.ListSt.findIndex(child => child.id == id)

  //     switch indexOpt {
  //     | Some(index) =>
  //       let insertIndex = index + 1
  //       // 将新节点插入到原节点之后
  //       // let (leftList, rightList) = currentLevelList->Belt.List.splitAt(insertIndex)
  //       let (leftList, rightList) = currentLevelList->Belt.List.splitAt(insertIndex) -> Meta3dCommonlib.OptionSt.getExn
  //       let newLevelList = leftList->Belt.List.concat(list{ copiedNode })->Belt.List.concat(rightList)
  //       let (leftInspectorList, rightInspectorList) =
  //         currentLevelInspectorList->Belt.List.splitAt(insertIndex) -> Meta3dCommonlib.OptionSt.getExn
  //       let newLevelInspectorList =
  //         leftInspectorList
  //         ->Belt.List.concat(list{ copiedInspector })
  //         ->Belt.List.concat(rightInspectorList)

  //       // 根据 parentId 更新 state
  //       switch parentId {
  //       | Some(pid) =>
  //         // 更新父节点的 children
  //         let updatedUIControls = HierachyUtils.mapSelectedUIControlData(
  //           data => data.id == pid ? {...data, children: newLevelList} : data,
  //           (
  //             (data: ElementAssembleStoreType.uiControl) => data.id,
  //             (data: ElementAssembleStoreType.uiControl) => data.children,
  //             (data, children) => {...data, children},
  //           ),
  //           state.selectedUIControls,
  //           pid,
  //         )
  //         let updatedInspectorData = HierachyUtils.mapSelectedUIControlData(
  //           data => data.id == pid ? {...data, children: newLevelInspectorList} : data,
  //           (
  //             (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
  //             (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
  //             (data, children) => {...data, children},
  //           ),
  //           state.selectedUIControlInspectorData,
  //           pid,
  //         )
  //         {
  //           ...state,
  //           selectedUIControls: updatedUIControls,
  //           selectedUIControlInspectorData: updatedInspectorData,
  //         }
  //       | None => // 根节点列表直接替换
  //         {
  //           ...state,
  //           selectedUIControls: newLevelList,
  //           selectedUIControlInspectorData: newLevelInspectorList,
  //         }
  //       }
  //     | None => state
  //     }
  //   | _ => state
  //   }
  // | CopyUIControl(id) =>
  // let nodeOpt = _findSelectUIControlById(state, id)
  // let inspectorOpt = _findSelectedUIControlInspectorDataById(state, id)
  // switch (nodeOpt, inspectorOpt) {
  // | (Some(node), Some(inspector)) =>
  //   let copiedNode = _copyUIControl(node)
  //   let copiedInspector = _copyInspectorData(inspector)

  //   let parentId = node.parentId
  //   let (currentLevelList, currentLevelInspectorList) = switch parentId {
  //   | Some(pid) =>
  //     let parentOpt = _findSelectUIControlById(state, pid)
  //     let parentInspectorOpt = _findSelectedUIControlInspectorDataById(state, pid)
  //     switch (parentOpt, parentInspectorOpt) {
  //     | (Some(parent), Some(parentInspector)) => (parent.children, parentInspector.children)
  //     | _ => (list{}, list{})
  //     }
  //   | None => (state.selectedUIControls, state.selectedUIControlInspectorData)
  //   }

  //   let indexOpt = currentLevelList->Meta3dCommonlib.ListSt.findIndex(child => child.id == id)

  //   switch indexOpt {
  //   | Some(index) =>
  //     let insertIndex = index + 1
  //     let (leftList, rightList) =
  //       currentLevelList->Belt.List.splitAt(insertIndex)->Meta3dCommonlib.OptionSt.getExn
  //     let newLevelList = leftList->Belt.List.concat(list{copiedNode})->Belt.List.concat(rightList)

  //     let (leftInspectorList, rightInspectorList) =
  //       currentLevelInspectorList->Belt.List.splitAt(insertIndex)->Meta3dCommonlib.OptionSt.getExn
  //     let newLevelInspectorList =
  //       leftInspectorList->Belt.List.concat(list{copiedInspector})->Belt.List.concat(rightInspectorList)

  //     switch parentId {
  //     | Some(pid) =>
  //       // 更新父节点的 children
  //       let updatedUIControls = HierachyUtils.mapSelectedUIControlData(
  //         (data: ElementAssembleStoreType.uiControl) =>
  //           data.id == pid ? {...data, children: newLevelList} : data,
  //         (
  //           (data: ElementAssembleStoreType.uiControl) => data.id,
  //           (data: ElementAssembleStoreType.uiControl) => data.children,
  //           (data: ElementAssembleStoreType.uiControl, children: list<ElementAssembleStoreType.uiControl>) =>
  //             {...data, children},
  //         ),
  //         state.selectedUIControls,
  //         pid,
  //       )

  //       let updatedInspectorData = HierachyUtils.mapSelectedUIControlData(
  //         (data: ElementAssembleStoreType.uiControlInspectorData) =>
  //           data.id == pid ? {...data, children: newLevelInspectorList} : data,
  //         (
  //           (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
  //           (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
  //           (
  //             data: ElementAssembleStoreType.uiControlInspectorData,
  //             children: list<ElementAssembleStoreType.uiControlInspectorData>,
  //           ) => {...data, children},
  //         ),
  //         state.selectedUIControlInspectorData,
  //         pid,
  //       )

  //       {
  //         ...state,
  //         selectedUIControls: updatedUIControls,
  //         selectedUIControlInspectorData: updatedInspectorData,
  //       }

  //     | None =>
  //       {
  //         ...state,
  //         selectedUIControls: newLevelList,
  //         selectedUIControlInspectorData: newLevelInspectorList,
  //       }
  //     }

  //   | None => state
  //   }

  // | _ => state
  // }
  //   | CopyUIControl(id) =>
  //   let nodeOpt = _findSelectUIControlById(state, id)
  //   let inspectorOpt = _findSelectedUIControlInspectorDataById(state, id)
  //   switch (nodeOpt, inspectorOpt) {
  //   | (Some(node), Some(inspector)) =>
  //  let (copiedNode, copiedInspector) = _copyNodeWithInspector(node, inspector)

  //     let parentId = node.parentId
  //     let (currentLevelList, currentLevelInspectorList) = switch parentId {
  //     | Some(pid) =>
  //       let parentOpt = _findSelectUIControlById(state, pid)
  //       let parentInspectorOpt = _findSelectedUIControlInspectorDataById(state, pid)
  //       switch (parentOpt, parentInspectorOpt) {
  //       | (Some(parent), Some(parentInspector)) => (parent.children, parentInspector.children)
  //       | _ => (list{}, list{})
  //       }
  //     | None => (state.selectedUIControls, state.selectedUIControlInspectorData)
  //     }

  //     let indexOpt = currentLevelList->Meta3dCommonlib.ListSt.findIndex(child => child.id == id)
  //     switch indexOpt {
  //     | Some(index) =>
  //       let insertIndex = index + 1
  //       let (leftList, rightList) = currentLevelList->Belt.List.splitAt(insertIndex)->Meta3dCommonlib.OptionSt.getExn
  //       let newLevelList = leftList->Belt.List.concat(list{copiedNode})->Belt.List.concat(rightList)
  //       let (leftInspectorList, rightInspectorList) = currentLevelInspectorList->Belt.List.splitAt(insertIndex)->Meta3dCommonlib.OptionSt.getExn
  //       let newLevelInspectorList = leftInspectorList->Belt.List.concat(list{copiedInspector})->Belt.List.concat(rightInspectorList)

  //       switch parentId {
  //       | Some(pid) =>
  //         // 更新父节点的 children
  //         let updatedUIControls = HierachyUtils.mapSelectedUIControlData(
  //           (data: ElementAssembleStoreType.uiControl) => data.id == pid ? {...data, children: newLevelList} : data,
  //           (
  //             (data: ElementAssembleStoreType.uiControl) => data.id,
  //             (data: ElementAssembleStoreType.uiControl) => data.children,
  //             (data: ElementAssembleStoreType.uiControl, children: list<ElementAssembleStoreType.uiControl>) => {...data, children},
  //           ),
  //           state.selectedUIControls,
  //           pid,
  //         )
  //         let updatedInspectorData = HierachyUtils.mapSelectedUIControlData(
  //           (data: ElementAssembleStoreType.uiControlInspectorData) => data.id == pid ? {...data, children: newLevelInspectorList} : data,
  //           (
  //             (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
  //             (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
  //             (data: ElementAssembleStoreType.uiControlInspectorData, children: list<ElementAssembleStoreType.uiControlInspectorData>) => {...data, children},
  //           ),
  //           state.selectedUIControlInspectorData,
  //           pid,
  //         )
  //         {
  //           ...state,
  //           selectedUIControls: updatedUIControls,
  //           selectedUIControlInspectorData: updatedInspectorData,
  //         }

  //       | None =>
  //         {
  //           ...state,
  //           selectedUIControls: newLevelList,
  //           selectedUIControlInspectorData: newLevelInspectorList,
  //         }
  //       }

  //     | None => state
  //     }

  //   | _ => state
  //   }

  | CopyUIControl(id) =>
    let nodeOpt = _findSelectUIControlById(state, id)
    let inspectorOpt = _findSelectedUIControlInspectorDataById(state, id)
    switch (nodeOpt, inspectorOpt) {
    | (Some(node), Some(inspector)) =>
      let (copiedNode, copiedInspector) = _copyNodeWithInspector(node, inspector)

      // 获取原节点所在层级列表
      let parentId = node.parentId
      let (currentLevelList, currentLevelInspectorList) = switch parentId {
      | Some(pid) =>
        let parentOpt = _findSelectUIControlById(state, pid)
        let parentInspectorOpt = _findSelectedUIControlInspectorDataById(state, pid)
        switch (parentOpt, parentInspectorOpt) {
        | (Some(parent), Some(parentInspector)) => (parent.children, parentInspector.children)
        | _ => (list{}, list{})
        }
      | None => (state.selectedUIControls, state.selectedUIControlInspectorData)
      }

      let indexOpt = currentLevelList->Meta3dCommonlib.ListSt.findIndex(child => child.id == id)
      switch indexOpt {
      | Some(index) =>
        let insertIndex = index + 1
        // 分割列表，插入新节点
        let (leftList, rightList) =
          currentLevelList->Belt.List.splitAt(insertIndex)->Meta3dCommonlib.OptionSt.getExn
        let newLevelList = leftList->Belt.List.concat(list{copiedNode})->Belt.List.concat(rightList)
        let (leftInspectorList, rightInspectorList) =
          currentLevelInspectorList->Belt.List.splitAt(insertIndex)->Meta3dCommonlib.OptionSt.getExn
        let newLevelInspectorList =
          leftInspectorList
          ->Belt.List.concat(list{copiedInspector})
          ->Belt.List.concat(rightInspectorList)

        // 更新状态
        switch parentId {
        | Some(pid) =>
          let updatedUIControls = HierachyUtils.mapSelectedUIControlData(
            (data: ElementAssembleStoreType.uiControl) =>
              data.id == pid ? {...data, children: newLevelList} : data,
            (
              (data: ElementAssembleStoreType.uiControl) => data.id,
              (data: ElementAssembleStoreType.uiControl) => data.children,
              (data, children: list<uiControl>) => {...data, children},
            ),
            state.selectedUIControls,
            pid,
          )
          let updatedInspectorData = HierachyUtils.mapSelectedUIControlData(
            (data: ElementAssembleStoreType.uiControlInspectorData) =>
              data.id == pid ? {...data, children: newLevelInspectorList} : data,
            (
              (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
              (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
              (data, children: list<uiControlInspectorData>) => {...data, children},
            ),
            state.selectedUIControlInspectorData,
            pid,
          )
          {
            ...state,
            selectedUIControls: updatedUIControls,
            selectedUIControlInspectorData: updatedInspectorData,
          }
        | None => {
            ...state,
            selectedUIControls: newLevelList,
            selectedUIControlInspectorData: newLevelInspectorList,
          }
        }
      | None => state
      }
    | _ => state
    }

  | SelectUIControl(
      id,
      protocolIconBase64,
      protocolConfigStr,
      displayName,
      data,
      parentId,
      specific,
    ) => {
      let childUIControl = {
        id,
        parentId,
        children: list{},
        protocolIconBase64,
        protocolConfigStr,
        displayName,
        data,
      }

      let childUIControlInspector = _buildDefaultUIControlInspectorData(id, specific)

      {
        ...state->_resetCurrent,
        selectedUIControls: HierachyUtils.addChildUIControlData(
          (
            (data: ElementAssembleStoreType.uiControl) => data.id,
            (data: ElementAssembleStoreType.uiControl) => data.children,
            (data: ElementAssembleStoreType.uiControl, children) => {
              ...data,
              children,
            },
          ),
          state.selectedUIControls,
          childUIControl,
          parentId,
        ),
        selectedUIControlInspectorData: HierachyUtils.addChildUIControlData(
          (
            (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
            (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
            (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
              ...data,
              children,
            },
          ),
          state.selectedUIControlInspectorData,
          childUIControlInspector,
          parentId,
        ),
      }
    }
  | UnSelectUIControlAndChildren(id) => {
      ...state,
      selectedUIControls: HierachyUtils.removeUIControlData(
        (
          (data: ElementAssembleStoreType.uiControl) => data.id,
          (data: ElementAssembleStoreType.uiControl) => data.children,
          (data: ElementAssembleStoreType.uiControl, children) => {
            ...data,
            children,
          },
        ),
        state.selectedUIControls,
        id,
      ),
      selectedUIControlInspectorData: HierachyUtils.removeUIControlData(
        (
          (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
          (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
          (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
            ...data,
            children,
          },
        ),
        state.selectedUIControlInspectorData,
        id,
      ),
    }
  | DropSelectUIControl(
      (hasChildren, serializeUIControlProtocolConfigLib),
      dropToGap,
      dragId,
      dropId,
      dropPosition,
    ) =>
    !dropToGap &&
    !hasChildren(.
      serializeUIControlProtocolConfigLib(.
        (
          _findSelectUIControlById(state, dropId)->Meta3dCommonlib.OptionSt.getExn
        ).protocolConfigStr,
      ),
    )
      ? {
          state
        }
      : {
          let dragUIControl =
            _findSelectUIControlById(state, dragId)->Meta3dCommonlib.OptionSt.getExn
          let dragUIControlInspector =
            _findSelectedUIControlInspectorDataById(state, dragId)->Meta3dCommonlib.OptionSt.getExn

          let state = {
            ...state,
            selectedUIControls: HierachyUtils.removeUIControlData(
              (
                (data: ElementAssembleStoreType.uiControl) => data.id,
                (data: ElementAssembleStoreType.uiControl) => data.children,
                (data: ElementAssembleStoreType.uiControl, children) => {
                  ...data,
                  children,
                },
              ),
              state.selectedUIControls,
              dragId,
            ),
            selectedUIControlInspectorData: HierachyUtils.removeUIControlData(
              (
                (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
                (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
                (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
                  ...data,
                  children,
                },
              ),
              state.selectedUIControlInspectorData,
              dragId,
            ),
          }

          !dropToGap
            ? {
                let parentId = dropId->Some

                {
                  ...state,
                  selectedUIControls: HierachyUtils.addChildUIControlData(
                    (
                      (data: ElementAssembleStoreType.uiControl) => data.id,
                      (data: ElementAssembleStoreType.uiControl) => data.children,
                      (data: ElementAssembleStoreType.uiControl, children) => {
                        ...data,
                        children,
                      },
                    ),
                    state.selectedUIControls,
                    {
                      ...dragUIControl,
                      parentId,
                    },
                    parentId,
                  ),
                  selectedUIControlInspectorData: HierachyUtils.addChildUIControlData(
                    (
                      (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
                      (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
                      (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
                        ...data,
                        children,
                      },
                    ),
                    state.selectedUIControlInspectorData,
                    dragUIControlInspector,
                    parentId,
                  ),
                }
              }
            : {
                let {parentId} =
                  _findSelectUIControlById(state, dropId)->Meta3dCommonlib.OptionSt.getExn
                let isTop = dropPosition == -1

                {
                  ...state,
                  selectedUIControls: HierachyUtils.insertUIControlData(
                    (
                      (data: ElementAssembleStoreType.uiControl) => data.id,
                      (data: ElementAssembleStoreType.uiControl) => data.children,
                      (data: ElementAssembleStoreType.uiControl, children) => {
                        ...data,
                        children,
                      },
                    ),
                    state.selectedUIControls,
                    {
                      ...dragUIControl,
                      parentId,
                    },
                    dropId,
                    parentId,
                    isTop,
                  ),
                  selectedUIControlInspectorData: HierachyUtils.insertUIControlData(
                    (
                      (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
                      (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
                      (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
                        ...data,
                        children,
                      },
                    ),
                    state.selectedUIControlInspectorData,
                    dragUIControlInspector,
                    dropId,
                    parentId,
                    isTop,
                  ),
                }
              }
        }

  | MoveUpUIControl(id) =>
    let nodeOpt = _findSelectUIControlById(state, id)
    let nodeInspectorOpt = _findSelectedUIControlInspectorDataById(state, id)
    switch (nodeOpt, nodeInspectorOpt) {
    | (Some(node), Some(nodeInspector)) =>
      let parentId = node.parentId

      // 获取当前节点所在层级的列表
      let (currentLevelList, currentLevelListInspector) = switch parentId {
      | Some(pid) =>
        // 有父节点，从父节点的children中获取列表
        let parentOpt = _findSelectUIControlById(state, pid)
        let parentInspectorOpt = _findSelectedUIControlInspectorDataById(state, pid)
        switch (parentOpt, parentInspectorOpt) {
        | (Some(parent), Some(parentInspector)) => (parent.children, parentInspector.children)
        | _ => (list{}, list{})
        }
      | None => // 顶层节点，直接从根节点获取列表
        (state.selectedUIControls, state.selectedUIControlInspectorData)
      }

      // 在当前层级列表中查找当前节点的索引
      let index = currentLevelList->Meta3dCommonlib.ListSt.findIndex(child => child.id == id)

      switch index {
      | Some(index) =>
        // 获取前一个兄弟节点的id
        let prevId = (
          currentLevelList->Meta3dCommonlib.ListSt.nth(index - 1)->Meta3dCommonlib.OptionSt.getExn
        ).id

        // 1. 先移除当前节点
        let newUIControls = HierachyUtils.removeUIControlData(
          (
            (data: ElementAssembleStoreType.uiControl) => data.id,
            (data: ElementAssembleStoreType.uiControl) => data.children,
            (data: ElementAssembleStoreType.uiControl, children) => {...data, children},
          ),
          state.selectedUIControls,
          id,
        )
        let newInspectorData = HierachyUtils.removeUIControlData(
          (
            (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
            (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
            (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
              ...data,
              children,
            },
          ),
          state.selectedUIControlInspectorData,
          id,
        )

        // 2. 将节点插入到前一个兄弟之前
        let finalUIControls = HierachyUtils.insertUIControlData(
          (
            (data: ElementAssembleStoreType.uiControl) => data.id,
            (data: ElementAssembleStoreType.uiControl) => data.children,
            (data: ElementAssembleStoreType.uiControl, children) => {...data, children},
          ),
          newUIControls,
          {...node, parentId}, // 保持 parentId 不变
          prevId,
          parentId,
          true, // isTop = true 表示插入到 prevId 之前
        )
        let finalInspectorData = HierachyUtils.insertUIControlData(
          (
            (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
            (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
            (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
              ...data,
              children,
            },
          ),
          newInspectorData,
          nodeInspector,
          prevId,
          parentId,
          true,
        )

        {
          ...state,
          selectedUIControls: finalUIControls,
          selectedUIControlInspectorData: finalInspectorData,
        }
      | None => state // 已经是第一个，不移动
      }
    | _ => state // 节点不存在
    }

  // 下移功能
  | MoveDownUIControl(id) =>
    let nodeOpt = _findSelectUIControlById(state, id)
    let nodeInspectorOpt = _findSelectedUIControlInspectorDataById(state, id)
    switch (nodeOpt, nodeInspectorOpt) {
    | (Some(node), Some(nodeInspector)) =>
      let parentId = node.parentId

      // 获取当前节点所在层级的列表
      let (currentLevelList, currentLevelListInspector) = switch parentId {
      | Some(pid) =>
        let parentOpt = _findSelectUIControlById(state, pid)
        let parentInspectorOpt = _findSelectedUIControlInspectorDataById(state, pid)
        switch (parentOpt, parentInspectorOpt) {
        | (Some(parent), Some(parentInspector)) => (parent.children, parentInspector.children)
        | _ => (list{}, list{})
        }
      | None => (state.selectedUIControls, state.selectedUIControlInspectorData)
      }

      // 在当前层级列表中查找当前节点的索引
      let index = currentLevelList->Meta3dCommonlib.ListSt.findIndex(child => child.id == id)

      switch index {
      | Some(index) =>
        // 获取当前层级的长度，判断是否是最后一个
        let listLength = currentLevelList->Meta3dCommonlib.ListSt.length
        if index < listLength - 1 {
          // 获取后一个兄弟节点的id
          let nextId = (
            currentLevelList->Meta3dCommonlib.ListSt.nth(index + 1)->Meta3dCommonlib.OptionSt.getExn
          ).id

          // 1. 先移除当前节点
          let newUIControls = HierachyUtils.removeUIControlData(
            (
              (data: ElementAssembleStoreType.uiControl) => data.id,
              (data: ElementAssembleStoreType.uiControl) => data.children,
              (data: ElementAssembleStoreType.uiControl, children) => {...data, children},
            ),
            state.selectedUIControls,
            id,
          )
          let newInspectorData = HierachyUtils.removeUIControlData(
            (
              (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
              (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
              (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
                ...data,
                children,
              },
            ),
            state.selectedUIControlInspectorData,
            id,
          )

          // 2. 将节点插入到后一个兄弟之后
          // 注意：插入到 nextId 之后，需要先插入到 nextId 之前，然后实际效果是放在 nextId 后面
          // 但 insertUIControlData 的 isTop=true 是插入到目标之前
          // 要实现插入到目标之后，需要插入到目标的下一个位置
          // 这里我们使用 isTop=false 插入到 nextId 之后
          let finalUIControls = HierachyUtils.insertUIControlData(
            (
              (data: ElementAssembleStoreType.uiControl) => data.id,
              (data: ElementAssembleStoreType.uiControl) => data.children,
              (data: ElementAssembleStoreType.uiControl, children) => {...data, children},
            ),
            newUIControls,
            {...node, parentId},
            nextId,
            parentId,
            false, // isTop = false 表示插入到 nextId 之后
          )
          let finalInspectorData = HierachyUtils.insertUIControlData(
            (
              (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
              (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
              (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
                ...data,
                children,
              },
            ),
            newInspectorData,
            nodeInspector,
            nextId,
            parentId,
            false,
          )

          {
            ...state,
            selectedUIControls: finalUIControls,
            selectedUIControlInspectorData: finalInspectorData,
          }
        } else {
          state // 已经是最后一个，不移动
        }
      | None => state // 节点不存在或索引无效
      }
    | _ => state
    }

  // 移到上一级功能
  | MoveToParentLevelUIControl(id) =>
    let nodeOpt = _findSelectUIControlById(state, id)
    let nodeInspectorOpt = _findSelectedUIControlInspectorDataById(state, id)
    switch (nodeOpt, nodeInspectorOpt) {
    | (Some(node), Some(nodeInspector)) =>
      let parentId = node.parentId

      switch parentId {
      | Some(grandParentId) =>
        // 获取父节点和祖父节点
        let parentOpt = _findSelectUIControlById(state, grandParentId)
        let parentInspectorOpt = _findSelectedUIControlInspectorDataById(state, grandParentId)

        switch (parentOpt, parentInspectorOpt) {
        | (Some(parent), Some(parentInspector)) =>
          // 获取祖父节点的父级（即新位置的父级）
          let newParentId = parent.parentId

          // 在祖父节点的同级列表中查找父节点的位置
          let (grandParentLevelList, grandParentLevelListInspector) = switch parent.parentId {
          | Some(gpId) =>
            let grandParentOpt = _findSelectUIControlById(state, gpId)
            let grandParentInspectorOpt = _findSelectedUIControlInspectorDataById(state, gpId)
            switch (grandParentOpt, grandParentInspectorOpt) {
            | (Some(gp), Some(gpInspector)) => (gp.children, gpInspector.children)
            | _ => (list{}, list{})
            }
          | None => (state.selectedUIControls, state.selectedUIControlInspectorData)
          }

          // 找到父节点在祖父节点同级列表中的位置
          let parentIndex =
            grandParentLevelList->Meta3dCommonlib.ListSt.findIndex(child =>
              child.id == grandParentId
            )

          switch parentIndex {
          | Some(pIndex) =>
            // 获取父节点的前一个兄弟节点（作为插入目标）
            if pIndex > 0 {
              let targetId = (
                grandParentLevelList
                ->Meta3dCommonlib.ListSt.nth(pIndex - 1)
                ->Meta3dCommonlib.OptionSt.getExn
              ).id

              // 1. 先移除当前节点
              let newUIControls = HierachyUtils.removeUIControlData(
                (
                  (data: ElementAssembleStoreType.uiControl) => data.id,
                  (data: ElementAssembleStoreType.uiControl) => data.children,
                  (data: ElementAssembleStoreType.uiControl, children) => {...data, children},
                ),
                state.selectedUIControls,
                id,
              )
              let newInspectorData = HierachyUtils.removeUIControlData(
                (
                  (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
                  (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
                  (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
                    ...data,
                    children,
                  },
                ),
                state.selectedUIControlInspectorData,
                id,
              )

              // 2. 将节点插入到祖父节点列表中，放在父节点的前一个兄弟之后
              let finalUIControls = HierachyUtils.insertUIControlData(
                (
                  (data: ElementAssembleStoreType.uiControl) => data.id,
                  (data: ElementAssembleStoreType.uiControl) => data.children,
                  (data: ElementAssembleStoreType.uiControl, children) => {...data, children},
                ),
                newUIControls,
                {...node, parentId: newParentId},
                targetId,
                newParentId,
                false, // 插入到目标之后
              )
              let finalInspectorData = HierachyUtils.insertUIControlData(
                (
                  (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
                  (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
                  (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
                    ...data,
                    children,
                  },
                ),
                newInspectorData,
                nodeInspector,
                targetId,
                newParentId,
                false,
              )

              {
                ...state,
                selectedUIControls: finalUIControls,
                selectedUIControlInspectorData: finalInspectorData,
              }
            } else {
              state // 父节点是第一个，无法移到上一级
            }
          | None => state
          }
        | _ => state
        }
      | None => state // 已经是顶层节点，无法移到上一级
      }
    | _ => state
    }

  | SetSpecificData(id, specific) =>
    _setUIControlInspectorData(
      state,
      data => {
        ...data,
        specific,
      },
      id,
    )
  | SetRect(id, rect) =>
    _setUIControlInspectorData(
      state,
      data => {
        ...data,
        rect,
      },
      id,
    )
  | SetIsDraw(id, isDraw) =>
    _setUIControlInspectorData(
      state,
      data => {
        ...data,
        isDraw,
      },
      id,
    )
  | SetInput(id, inputNameOpt, params) =>
    _setUIControlInspectorData(
      state,
      data => {
        ...data,
        input: inputNameOpt->Meta3dCommonlib.OptionSt.map((inputName): input => {
          inputName,
          inputParams: params,
        }),
      },
      id,
    )
  // | SetInputFileStr(id, inputName, inputFileStr) =>
  //   _setUIControlInspectorData(
  //     state,
  //     data => {
  //       ...data,
  //       input: {
  //         inputName,
  //         inputFileStr: inputFileStr->Some,
  //       }->Some,
  //     },
  //     id,
  //   )
  | SetAction(id, (eventName, actionNameOpt, params)) =>
    _setActionData(state, id, eventName, actionNameOpt, params)
  // | SetActionFileStr(id, eventName, actionName, actionFileStr) =>
  //   _setActionData(state, id, eventName, actionName->Some, actionFileStr->Some)
  | SelectRootUIControl => {
      ...state->_resetCurrent,
      parentUIControlId: None,
      inspectorCurrentUIControlId: None,
      // isShowElementInspector: false,
    }

  | SelectSelectedUIControl(funcs, id) => {
      ...state->_resetCurrent,
      parentUIControlId: _findParentUIControlId(funcs, state.selectedUIControls, id),
      inspectorCurrentUIControlId: id->Some,
      // isShowElementInspector: false,
    }
  // | ShowElementInspector => {
  //     ...state,
  //     inspectorCurrentUIControlId: None,
  //     isShowElementInspector: true,
  //   }
  // | SetVisualExtension(visualExtension) => {
  //     ...state,
  //     visualExtension: visualExtension->Some,
  //   }
  // | SetRunVisualExtension(runVisualExtension) => {
  //     ...state,
  //     runVisualExtension: runVisualExtension->Some,
  //   }
  | SetElementContribute(elementContribute) => {
      ...state,
      elementContribute: elementContribute->Some,
    }
  // | SetElementStateFields(elementStateFields) => {
  //     ...state,
  //     elementInspectorData: {
  //       ...state.elementInspectorData,
  //       elementStateFields,
  //     },
  //   }
  // | SetRole(role) => {
  //     ...state,
  //     elementInspectorData: {
  //       ...state.elementInspectorData,
  //       reducers: {
  //         ...state.elementInspectorData.reducers,
  //         role: role,
  //       },
  //     },
  //   }
  // | SetHandlers(handlers) => {
  //     ...state,
  //     elementInspectorData: {
  //       ...state.elementInspectorData,
  //       reducers: {
  //         ...state.elementInspectorData.reducers,
  //         handlers: handlers,
  //       },
  //     },
  //   }
  | ImportWhenEmpty(selectedUIControls, selectedUIControlInspectorData) =>
    state.selectedUIControls->Meta3dCommonlib.ListSt.length > 0
      ? {
          state
        }
      : {
          ...state,
          selectedUIControls,
          selectedUIControlInspectorData,
          // isImportElement: true, }
        }
  // | ImportElementCustom(customInputs) => {
  //     ...state,
  //     customInputs,
  //     // isImportElementCustom: true,
  //   }
  | SetCanvasData(canvasData) => {
      ...state,
      canvasData,
    }
  | AddCustomInput(customInput) => {
      ...state,
      customInputs: state.customInputs->Meta3dCommonlib.ListSt.push(customInput),
    }
  | AddCustomAction(customAction) => {
      ...state,
      customActions: state.customActions->Meta3dCommonlib.ListSt.push(customAction),
    }
  | RemoveCustomInput(inputName) => {
      let state = {
        ...state,
        customInputs: state.customInputs->Meta3dCommonlib.ListSt.filter(({name}) =>
          name != inputName
        ),
      }

      state->_updateAllUIControlInspectorData(data => {
        ...data,
        input: data.input->Meta3dCommonlib.OptionSt.bind(input => {
          input.inputName == inputName ? None : input->Some
        }),
      })
    }
  | RemoveCustomAction(actionName) => {
      let state = {
        ...state,
        customActions: state.customActions->Meta3dCommonlib.ListSt.filter(({name}) =>
          name != actionName
        ),
      }

      state->_updateAllUIControlInspectorData(data => {
        ...data,
        event: data.event->Meta3dCommonlib.ArraySt.filter(event => {
          event.actionName != actionName
        }),
      })
    }
  | UpdateCustomFileStr(handleNameExistFunc) =>
    //   let state = switch state.currentChangeCode {
    //   | Change(customType, oldName, newName, newOriginCode, newTranspiledCode) =>
    let state = switch CodeEditUtils.getChangeCodeDataToGlobal()->Meta3dCommonlib.OptionSt.fromNullable {
    | Some((customType, oldName, newName, newOriginCode, newTranspiledCode)) =>
      switch customType {
      | CommonType.Action =>
        _isNameExist(newName, oldName, state.customActions)
          ? {
              handleNameExistFunc()
              state
            }
          : {
              let state = {
                ...state,
                customActions: state.customActions->Meta3dCommonlib.ListSt.map(custom => {
                  custom.name == oldName
                    ? (
                        {
                          name: newName,
                          originFileStr: newOriginCode->Some,
                          transpiledFileStr: newTranspiledCode,
                        }: customAction
                      )
                    : custom
                }),
              }

              state->_updateAllUIControlInspectorData(data => {
                ...data,
                event: data.event->Meta3dCommonlib.ArraySt.map(action => {
                  ...action,
                  actionName: action.actionName == oldName ? newName : action.actionName,
                }),
              })
            }

      | CommonType.Input =>
        _isNameExist(newName, oldName, state.customActions)
          ? {
              handleNameExistFunc()
              state
            }
          : {
              let state = {
                ...state,
                customInputs: state.customInputs->Meta3dCommonlib.ListSt.map(custom => {
                  custom.name == oldName
                    ? (
                        {
                          ...custom,
                          name: newName,
                          originFileStr: newOriginCode->Some,
                          transpiledFileStr: newTranspiledCode,
                        }: customInput
                      )
                    : custom
                }),
              }

              state->_updateAllUIControlInspectorData(data => {
                ...data,
                input: data.input->Meta3dCommonlib.OptionSt.map((data): input => {
                  ...data,
                  inputName: data.inputName == oldName ? newName : data.inputName,
                }),
              })
            }
      }
    | None => state
    }

    // CodeEditUtils.setChangeCodeDataToGlobal(Meta3dCommonlib.NullableSt.getEmpty())

    // {
    //   ...state,
    //   currentCode: EmptyCode,
    //   // currentChangeCode: EmptyChangeCode,
    // }
    state
  | SetCode(code) => {
      ...state,
      currentCode: code,
    }
  // | SetChangeCode(code) => {
  //   ...state,
  //   currentChangeCode: code,
  // }
  | SelectCustomInput(inputName) => {
      ...state->_resetCurrent,
      currentCustomInputName: inputName->Some,
    }
  | SelectCustomAction(actionName) => {
      ...state->_resetCurrent,
      currentCustomActionName: actionName->Some,
    }
  | SetCustomWhenEmpty(customInputs, customActions) => {
      ...state,
      customInputs: state.customInputs->Meta3dCommonlib.ListSt.length > 0
        ? state.customInputs
        : customInputs,
      customActions: state.customActions->Meta3dCommonlib.ListSt.length > 0
        ? state.customActions
        : customActions,
    }
  | StartCreateFromScratchTourPhase2 => {
      ...state,
      isInCreateFromScratchTourPhase2: true,
      // isJumpToCreateFromScratchTourPhase2Guide: true,
    }
  // | EndJumpToCreateFromScratchTourPhase2Guide => {
  //     ...state,
  //     isJumpToCreateFromScratchTourPhase2Guide: false,
  //   }
  | EndCreateFromScratchTourPhase2 => {
      ...state,
      isInCreateFromScratchTourPhase2: false,
      // isJumpToCreateFromScratchTourPhase2Guide: false,
    }
  | UpdateSelectedUIControls(func, selectedContributes) => {
      let selectedUIControls = selectedContributes->Meta3dCommonlib.ListSt.filter(({data}) => {
        data.contributePackageData.protocol.name->ContributeTypeUtils.isUIControl
      })

      state->_updateAllUIControlInspectorData(data => {
        let selectedUIControlData =
          _findSelectUIControlById(state, data.id)->Meta3dCommonlib.OptionSt.getExn
        let name = selectedUIControlData.data.contributePackageData.name
        let protocolVersion = selectedUIControlData.data.contributePackageData.protocol.version

        switch selectedUIControls->Meta3dCommonlib.ListSt.find(({data}) => {
          data.contributePackageData.name == name &&
            Meta3d.Semver.gt(
              Meta3d.Semver.minVersion(data.contributePackageData.protocol.version),
              Meta3d.Semver.minVersion(protocolVersion),
            )
        }) {
        | Some({protocolConfigStr}) => {
            ...data,
            // specific: service.meta3d.getUIControlSpecificDataFields(.
            //   service.meta3d.serializeUIControlProtocolConfigLib(.
            //     protocolConfigStr->Meta3dCommonlib.OptionSt.getExn,
            //   ),
            // )->_convertSpecificType,
            specific: func(protocolConfigStr->Meta3dCommonlib.OptionSt.getExn),
          }
        | None => data
        }
      })
    }
  }
}

let initialState = _createState()
