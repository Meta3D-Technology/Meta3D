let buildActionContributeProtocolConfigStr = () => {
  `window.ActionProtocolConfig = {
    getActions: () => {
        return [
            {
        name: "action1",
        role: "role1"
    },
            {
        name: "action2",
        role: "role2"
    },
            {
        name: "action2",
        role: "role2"
    }
    ]
    }
}`
}