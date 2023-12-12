open Antd
%%raw("import 'antd/dist/antd.css'")
open AssembleSpaceType

type view =
  | Ap
  | Element
  | Package

module Method = {
  let reset = dispatch => {
    dispatch(AssembleSpaceStoreType.Reset)
  }

  let _mergeCustoms = selectedElementsFromMarket => {
    selectedElementsFromMarket
    ->Meta3dCommonlib.ListSt.reduce([], (
      mergedCustomInputs,
      {customInputs}: BackendCloudbaseType.elementAssembleData,
    ) => {
      mergedCustomInputs
      ->Js.Array.concat(customInputs, _)
      ->/* ! TODO should handle same name:
now just remove duplicate one, but need handle more:

compare equal(first length, then all)?{
use local input
} :{
remain one custom input;
rename another custom input's name to add post fix:"_copy";
}
 */
      Meta3dCommonlib.ArraySt.removeDuplicateItemsWithBuildKeyFunc((. {name}) => {
        name
      })
    })
    ->Meta3dCommonlib.ListSt.fromArray
  }

  let getImportedElementCustom = selectedElementsFromMarket => {
    _mergeCustoms(selectedElementsFromMarket)
  }

  let _mergeCustomAndLocalBundled = (customInputs, localBundledSource) => {
    let name = localBundledSource->CustomUtils.getInputName

    /* ! TODO should handle same name more:
now just not add duplicate one, but need handle more
*/
    customInputs->Meta3dCommonlib.ListSt.includesByFunc((
      customInput: AssembleSpaceCommonType.customInput,
    ) => {
      customInput.name == name
    })
      ? customInputs
      : customInputs->Meta3dCommonlib.ListSt.push(
          (
            {
              name: localBundledSource->CustomUtils.getInputName,
              fileStr: localBundledSource,
            }: AssembleSpaceCommonType.customInput
          ),
        )
  }

  let convertLocalToCustom = (
    service,
    customInputs,
    selectedContributes: AssembleSpaceType.selectedContributesFromMarket,
  ) => {
    (
      selectedContributes->Meta3dCommonlib.ListSt.filter((({protocolName}, _)) => {
        !ContributeTypeUtils.isInput(protocolName)
      }),
      selectedContributes
      ->Meta3dCommonlib.ListSt.filter((({protocolName}, _)) => {
        ContributeTypeUtils.isInput(protocolName)
      })
      ->Meta3dCommonlib.ListSt.map((({data}, _)) => {
        service.meta3d.getContributeFuncDataStr(. data.contributeFuncData)
      })
      ->Meta3dCommonlib.ListSt.reduce(customInputs, _mergeCustomAndLocalBundled),
    )
  }

  let _getUIControls = (selectedContributes: AssembleSpaceType.selectedContributesFromMarket) => {
    selectedContributes
    // ->Meta3dCommonlib.ListSt.map(Meta3dCommonlib.Tuple2.getFirst)
    ->Meta3dCommonlib.ListSt.filter((({data}, _)) => {
      data.contributePackageData.protocol.name->ContributeTypeUtils.decideContributeType ==
        Meta3dType.ContributeType.UIControl
    })
  }

  let _generateSelectedUIControls = (
    service,
    selectedContributes: AssembleSpaceType.selectedContributesFromMarket,
    uiControls,
  ) => {
    let selectedUIControls =
      selectedContributes
      // ->SelectedContributesForElementUtils.getUIControls
      ->_getUIControls
      ->Meta3dCommonlib.ListSt.toArray

    let rec _generate = uiControls => {
      uiControls
      ->Meta3dCommonlib.ArraySt.map((
        {protocol, displayName, children}: BackendCloudbaseType.uiControl,
      ) => {
        switch selectedUIControls->Meta3dCommonlib.ArraySt.find(((selectedUIControl, _)) => {
          selectedUIControl.data.contributePackageData.protocol.name == protocol.name &&
            Meta3d.Semver.gte(
              Meta3d.Semver.minVersion(
                selectedUIControl.data.contributePackageData.protocol.version,
              ),
              Meta3d.Semver.minVersion(protocol.version),
            )
        }) {
        | None =>
          Meta3dCommonlib.Exception.throwErr(
            Meta3dCommonlib.Exception.buildErr(
              Meta3dCommonlib.Log.buildErrorMessage(
                ~title={
                  j`ui control whose displayName:${displayName}, protocolName: ${protocol.name} not select or protocolVersion: ${protocol.version} not match`
                },
                ~description={
                  ""
                },
                ~reason="",
                ~solution=j``,
                ~params=j``,
              ),
            ),
          )
        // | Some({protocolIconBase64, protocolConfigStr, data}) =>
        | Some(({protocolIconBase64, data}, protocolConfig)) =>
          (
            {
              id: IdUtils.generateId(service.other.random),
              protocolIconBase64,
              protocolConfigStr: protocolConfig
              ->Meta3dCommonlib.OptionSt.map(({configStr}) => configStr)
              ->Meta3dCommonlib.OptionSt.getExn,
              displayName: data.contributePackageData.displayName,
              data,
              parentId: None,
              children: _generate(children),
            }: ElementAssembleStoreType.uiControl
          )
        }
      })
      ->Meta3dCommonlib.ListSt.fromArray
    }

    let rec _addParentId = (uiControls, parentId) => {
      uiControls->Meta3dCommonlib.ListSt.map((
        {id, children} as uiControl: ElementAssembleStoreType.uiControl,
      ) => {
        {
          ...uiControl,
          parentId,
          children: _addParentId(children, id->Some),
        }
      })
    }

    uiControls->_generate->_addParentId(None)
  }

  let _generateSelectedUIControlInspectorData = (
    uiControls,
    selectedUIControls: ElementAssembleStoreType.selectedUIControls,
  ) => {
    let rec _generate = (
      uiControls,
      selectedUIControls: ElementAssembleStoreType.selectedUIControls,
    ) => {
      uiControls
      ->Meta3dCommonlib.ArraySt.mapi((
        {rect, isDraw, input, event, specific, children}: BackendCloudbaseType.uiControl,
        index,
      ): ElementAssembleStoreType.uiControlInspectorData => {
        id: (
          selectedUIControls->Meta3dCommonlib.ListSt.nth(index)->Meta3dCommonlib.OptionSt.getExn
        ).id,
        rect,
        isDraw,
        input: input->Meta3dCommonlib.OptionSt.fromNullable,
        event,
        specific,
        children: _generate(
          children,
          (
            selectedUIControls->Meta3dCommonlib.ListSt.nth(index)->Meta3dCommonlib.OptionSt.getExn
          ).children,
        ),
      })
      ->Meta3dCommonlib.ListSt.fromArray
    }

    uiControls->_generate(selectedUIControls)
  }

  // let _removeNotExistedInputAndEventExceptFileStr = (uiControls, service, selectedContributes) => {
  //   let selectedActionNames = SelectedContributesForElementUtils.getActions(
  //     selectedContributes,
  //   )->Meta3dCommonlib.ListSt.map(({data}) => {
  //     (service.meta3d.execGetContributeFunc(. data.contributeFuncData)->Obj.magic)["actionName"]
  //   })
  //   let selectedInputNames = SelectedContributesForElementUtils.getInputs(
  //     selectedContributes,
  //   )->Meta3dCommonlib.ListSt.map(({data}) => {
  //     (service.meta3d.execGetContributeFunc(. data.contributeFuncData)->Obj.magic)["inputName"]
  //   })

  //   let _findCustomInputProtocolName = name => {
  //     (
  //       SelectedContributesForElementUtils.getInputs(selectedContributes)
  //       ->Meta3dCommonlib.Log.printForDebug
  //       ->Meta3dCommonlib.ListSt.find(({data}) => {
  //         data.contributePackageData.name == name
  //       })
  //       ->Meta3dCommonlib.OptionSt.getExn
  //     ).data.contributePackageData.protocol.name
  //   }

  //   let _findCustomActionProtocolName = name => {
  //     (
  //       SelectedContributesForElementUtils.getActions(selectedContributes)
  //       ->Meta3dCommonlib.ListSt.find(({data}) => {
  //         data.contributePackageData.name == name
  //       })
  //       ->Meta3dCommonlib.OptionSt.getExn
  //     ).data.contributePackageData.protocol.name
  //   }

  //   let rec _remove = uiControls => {
  //     uiControls->Meta3dCommonlib.ArraySt.map((
  //       uiControl: BackendCloudbaseType.uiControl,
  //     ) => {
  //       {
  //         ...uiControl,
  //         input: uiControl.input->Meta3dCommonlib.NullableSt.bind((. input) => {
  //           ElementVisualUtils.isCustomInput(
  //             input.inputName->Meta3dCommonlib.Log.printForDebug->_findCustomInputProtocolName,
  //           ) ||
  //           selectedInputNames->Meta3dCommonlib.ListSt.includes(input.inputName)
  //             ? input->Meta3dCommonlib.NullableSt.return
  //             : Meta3dCommonlib.NullableSt.getEmpty()
  //         }),
  //         event: uiControl.event->Meta3dCommonlib.ArraySt.filter(({eventName, actionName}) => {
  //           ElementVisualUtils.isCustomAction(
  //             actionName->_findCustomActionProtocolName,
  //             eventName->Obj.magic,
  //           ) ||
  //           selectedActionNames->Meta3dCommonlib.ListSt.includes(actionName)
  //         }),
  //         children: _remove(uiControl.children),
  //       }
  //     })
  //   }

  //   _remove(uiControls)
  // }

  let importElement = (
    service,
    dispatchForElementAssembleStore,
    selectedElementsFromMarket,
    selectedContributes: AssembleSpaceType.selectedContributesFromMarket,
  ) => {
    let mergedUIControls = selectedElementsFromMarket->Meta3dCommonlib.ListSt.reduce([], (
      mergedUIControls,
      {inspectorData}: BackendCloudbaseType.elementAssembleData,
    ) => {
      mergedUIControls->Js.Array.concat(inspectorData.uiControls, _)
    })
    // ->_removeNotExistedInputAndEventExceptFileStr(service, selectedContributes)

    let selectedUIControls = _generateSelectedUIControls(
      service,
      selectedContributes,
      mergedUIControls,
    )

    // let mergedCustomInputs = _mergeCustoms(selectedElementsFromMarket)

    dispatchForElementAssembleStore(
      ElementAssembleStoreType.Import(
        selectedUIControls,
        _generateSelectedUIControlInspectorData(mergedUIControls, selectedUIControls),
        // mergedCustomInputs,
      ),
    )
  }

  let getCurrentKey = (currentAssemble: view) => {
    switch currentAssemble {
    | Ap => "1"
    | Element => "2"
    | Package => "3"
    }
  }
}

@react.component
let make = (
  ~service: service,
  ~account,
  ~selectedPackagesFromMarket: selectedPackagesFromMarket,
  ~selectedExtensionsFromMarket: selectedExtensionsFromMarket,
  ~selectedContributesFromMarket: selectedContributesFromMarket,
  ~selectedElementsFromMarket: selectedElementsFromMarket,
) => {
  let dispatch = service.react.useDispatch()
  let dispatchForApAssembleStore = ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)
  let dispatchForElementAssembleStore = ReduxUtils.ElementAssemble.useDispatch(
    service.react.useDispatch,
  )

  let (currentAssemble, setCurrentAssemble) = service.react.useState(_ => Ap)
  let (
    handledSelectedContributesFromMarket,
    setHandledSelectedContributesFromMarket,
  ) = service.react.useState(_ => None)

  service.react.useEffectOnce(() => {
    Method.reset(dispatch)

    ErrorUtils.showCatchedErrorMessage(() => {
      let (selectedContributesFromMarket, customInputs) =
        Method.getImportedElementCustom(selectedElementsFromMarket)->Method.convertLocalToCustom(
          service,
          _,
          selectedContributesFromMarket,
        )

      Method.importElement(
        service,
        dispatchForElementAssembleStore,
        selectedElementsFromMarket,
        selectedContributesFromMarket,
      )

      dispatchForElementAssembleStore(ElementAssembleStoreType.SetCustom(customInputs))

      setHandledSelectedContributesFromMarket(_ => selectedContributesFromMarket->Some)
    }, 5->Some)

    // dispatchForApAssembleStore(
    //   ApAssembleStoreType.SetCustomInputs(customInputsFromMarket),
    // )
    // dispatchForApAssembleStore(
    //   ApAssembleStoreType.SetCustomActions(customActionsFromMarket),
    // )

    ((), None)
  })

  {
    switch handledSelectedContributesFromMarket {
    | None => React.null
    | Some(handledSelectedContributesFromMarket) =>
      <Layout>
        <Layout.Content>
          <Menu
            theme=#light
            mode=#horizontal
            defaultSelectedKeys={["1"]}
            selectedKeys={[Method.getCurrentKey(currentAssemble)]}
            onClick={({key}) => {
              switch key {
              | "2" => setCurrentAssemble(_ => Element)
              | "3" => setCurrentAssemble(_ => Package)
              | "1"
              | _ =>
                setCurrentAssemble(_ => Ap)
              }
            }}
            items=[
              {
                key: "1",
                label: {React.string(`应用装配`)},
              },
              {
                key: "2",
                label: {React.string(`页面装配`)},
              },
              {
                key: "3",
                label: {React.string(`包装配`)},
              },
            ]
          />
        </Layout.Content>
        <Layout.Content>
          {switch currentAssemble {
          | Ap =>
            <ApAssemble
              service
              account
              selectedExtensionsFromMarket
              selectedContributesFromMarket=handledSelectedContributesFromMarket
              selectedPackagesFromMarket
              selectedElementsFromMarket
            />
          | Element => <ElementAssemble service account selectedElementsFromMarket />
          | Package =>
            <PackageAssemble
              service
              account
              selectedExtensionsFromMarket
              selectedContributesFromMarket=handledSelectedContributesFromMarket
              selectedPackagesFromMarket
            />
          }}
        </Layout.Content>
      </Layout>
    }
  }
}
