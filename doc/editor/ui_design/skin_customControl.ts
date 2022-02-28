InitEventJob = {
  let exec = states => {
    MostUtils.callFunc(() => {
      registerEvent("mousedown", () => {
        trigger("wd_pointdown", data)
      })

      states
    })
  }
}

Main = {
  init({
    registerEvent("wd_pointdown", update state -> io -> pointdown)


let editorUIState = editorUIState -> UI.registerSkin<buttonSkin>(
  "WD_Button_Skin",
  // TODO stateValue should in the same way!

  // TODO change str to single field(for extend data, like stateValue, skin, script attribute)!
  // add a middleware to do this!!!

  {
    buttonColor: [0.35, 0.1, 0.1],
  }
)

let editorUIState =
  editorUIState -> UI.registerCustomControl<buttonControl>(
    "WD_Button",
    (states, state, rect, str, skinName: ButtonSkinProtocol.skinName, api, { onClick }) => {
      let { buttonColor } = api.getSkin<buttonSkin>(skinName)
      let(isButtonClick, (imageId, color)) = judge(rect, buttonColor, state)

      // let state = api.drawBox(rect, state)
      // let state = api.drawText(str, state)
      let states = api.drawBox(states, rect, state)
      let states = api.drawText(states, str, state)


    // let record = switch Js.Nullable.toOption(imageId) {
    //   | None => drawBox(. rect, color, record)
    //   | Some(imageId) => drawImage(. rect, (0., 0., 1., 1.), imageId, record)
    //   }


      let states = isButtonClick ? onClick(states, {
        pointDown: state.io.pointDown
      }) : states

      states
    }
  )

RegisterManager.register = {
  let editorUIState = editorUIState -> UI.addElementFuncData((state, api) => {
    let buttonFunc = api.unsafeGetCustomControl("WD_Button")
    let { rect, str } as uiState = get()

    buttonFunc(state, rect, str, "WD_Button_Skin", api, {
      onClick: (e) => {
        // ...
      }
    })
  })
}


    })

loop({
  let editorUIState = UI.render({
    state.io.pointdown
  })


})


}
