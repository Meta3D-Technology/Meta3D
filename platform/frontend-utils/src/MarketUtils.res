let isNotInnerProtocol = protocolName => {
  switch protocolName {
  | "meta3d-element-assemble-visual-protocol"
  | "meta3d-element-assemble-visual-run-protocol" => false
  | _ => true
  }
}

let getPageSize = () => 30

let getLimitCount = () => 1000