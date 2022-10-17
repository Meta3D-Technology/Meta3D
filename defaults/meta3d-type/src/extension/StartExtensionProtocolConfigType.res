type configData = {
  name: string,
  type_: [#bool | #int | #string],
}

type needConfigData = array<configData>

type getNeedConfigData = unit => needConfigData
