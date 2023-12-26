


var handleUploadImage = (function (onloadFunc, onprogressFunc, onerrorFunc, file, ){
        let reader = new FileReader()

        reader.onload = () => {
            onloadFunc(file, reader.result)
        }

        reader.onprogress = (event) => {
            onprogressFunc(event.loaded, event.total)
        }

        reader.onerror = (event) => {
            onerrorFunc(event, file)
        }

    reader.readAsDataURL(file)

    return false
});

export {
  handleUploadImage ,
}
/* No side effect */
