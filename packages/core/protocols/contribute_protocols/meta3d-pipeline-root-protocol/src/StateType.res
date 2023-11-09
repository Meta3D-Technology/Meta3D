let pipelineName = "Root"

let pipeline = {
  "Init":"init",
  "Update":"update",
  "Render":"render",
}

let job = {
  "Init": "init_root_meta3d",
  "Update": "update_root_meta3d",
  "Render": "render_root_meta3d",
}

let allPipelineData: Meta3dEngineCoreProtocol.StateType.allPipelineData = [
  {
    name:pipeline["Init"],
    groups: [
      {
        name: "first_root_meta3d",
        link: #concat,
        elements: [
          {
            name: job["Init"],
            type_: #job,
            is_set_state: true->Js.Nullable.return,
          },
        ],
      },
    ],
    first_group: "first_root_meta3d",
  },
  {
    name:pipeline["Update"],
    groups: [
      {
        name: "first_root_meta3d",
        link: #concat,
        elements: [
          {
            name: job["Update"],
            type_: #job,
            is_set_state: true->Js.Nullable.return,
          },
        ],
      },
    ],
    first_group: "first_root_meta3d",
  },
  {
    name:pipeline["Render"],
    groups: [
      {
        name: "first_root_meta3d",
        link: #concat,
        elements: [
          {
            name: job["Render"],
            type_: #job,
            is_set_state: true->Js.Nullable.return,
          },
        ],
      },
    ],
    first_group: "first_root_meta3d",
  },
]

type state = {mostService: Meta3dBsMostProtocol.ServiceType.service}

type states = {"Root": state}
