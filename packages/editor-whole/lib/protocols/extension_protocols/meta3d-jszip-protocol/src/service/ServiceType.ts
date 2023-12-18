type zip = any

type file = any

type fileOption = {
    binary: boolean
}

type generateOption = {
    type: "blob"
}

export type service = {
    createZip: () => zip,
    file: (zip: zip, filePath: string, file: file, fileOption?: fileOption) => void,
    generateAsync: (zip: zip, generateOption: generateOption) => Promise<any>,
}
