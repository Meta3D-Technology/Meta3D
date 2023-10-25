declare module 'url-loader!*' {
    type base64 = string
    // const contents: { default: string }
    const contents: base64
    export = contents
}