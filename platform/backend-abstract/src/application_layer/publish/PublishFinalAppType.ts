export type fileType = "content" | "singleEvent"

export type publishFinalAppInfo = {
    account: string,
    appName: string,
    description: string,
    contentFileID: string,
    singleEventFileID: string,
}