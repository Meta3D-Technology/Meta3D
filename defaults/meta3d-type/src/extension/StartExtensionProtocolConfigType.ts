type configData = {
    name: string,
    type_: "bool" | "int" | "string"
}

export type needConfigData = Array<configData>

export type getNeedConfigData = () => needConfigData