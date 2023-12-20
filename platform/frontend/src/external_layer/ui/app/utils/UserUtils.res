let isAdmin = account => {
  switch account {
  | Some("meta3d") => true
  | _ => false
  }
}
