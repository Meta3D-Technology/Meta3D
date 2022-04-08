export type service = {
	joinRootPath: (path: string) => string,
	readFileSync: (path: string, encode: "utf-8") => string,
}