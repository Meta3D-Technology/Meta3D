export let importFile = (onloadFunc: any, onerrorFunc: any, onprogressFunc: any, oncancelFunc: any) => {
    let input = document.createElement('input')
    input.setAttribute('type', "file")
    input.style.visibility = 'hidden'

    input.onchange = (event) => {
        if ((event.target as any).files.length == 0) {
            oncancelFunc()
        }

        let file = (event.target as any).files[0]

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

        reader.readAsArrayBuffer(file)
    }

    input.oncancel = (event) => {
        oncancelFunc()
    }

    document.body.appendChild(input)
    input.click()
    document.body.removeChild(input)
}