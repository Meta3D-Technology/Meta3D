export function createWorker () {
	// reference https://webpack.docschina.org/guides/web-workers/#root
	return new Worker(new URL("../../render/RenderWorkerMain", import.meta.url));
}