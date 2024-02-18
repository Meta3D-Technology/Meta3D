export let setValueToObject = (object, key, value) => {
    // object[key] = value

    // return object

    return {
        ...object,
        [key]: value
    }
}