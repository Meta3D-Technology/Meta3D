export let isChinese = () => {
    let a = navigator.language || (navigator as any).browserLanguage

    return a.toLowerCase().includes("zh-cn")
}