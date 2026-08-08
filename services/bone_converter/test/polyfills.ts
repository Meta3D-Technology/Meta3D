/**
 * polyfills.ts — 全局 polyfill（jest setupFiles 注入）
 *
 * three FBXLoader 在 Node 环境需要 browser globals（self/window/document/Image）。
 * 审核 B5/B11：原各 steps 文件（upload-pipeline / d4-convert / d6-rest-pose）重复定义
 * 全局 polyfill，污染同进程其他测试；统一提取到此处经 jest.config.js setupFiles 注入。
 *
 * 相比 d4/d6 的旧版 MockImage，本实现：
 *  - 支持 addEventListener('load')：TextureLoader 的 data: URL 图片加载回调可触发 → S7 可断言 map.image.src
 *  - 带 crossOrigin 属性：FBXLoader.parseImage → ImageLoader 可能设置 image.crossOrigin = 'anonymous'
 *  - onload 回调 call(this)：与 addEventListener 的 cb.call(this) 保持一致
 */
(global as any).self = global;
(global as any).window = global;
(global as any).document = {
    createElement: (tag: string) => {
        if (tag === 'img' || tag === 'image') return new (global as any).MockImage();
        return {};
    },
    createElementNS: (_ns: string, tag: string) => {
        if (tag === 'img' || tag === 'image') return new (global as any).MockImage();
        return {};
    },
};
class MockImage {
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    crossOrigin = '' as string;
    width = 1;
    height = 1;
    private _listeners: Record<string, Array<() => void>> = {};
    private _src = '';
    get src() { return this._src; }
    set src(v: string) {
        this._src = v;
        this.onload?.call(this);
        (this._listeners['load'] || []).forEach((cb) => cb.call(this));
    }
    addEventListener(event: string, cb: any) {
        (this._listeners[event] = this._listeners[event] || []).push(cb);
    }
    removeEventListener(event: string, cb: any) {
        this._listeners[event] = (this._listeners[event] || []).filter((x) => x !== cb);
    }
    setAttribute(_name: string, _value: string) { }
    getAttribute(_name: string) { return null; }
}
(global as any).MockImage = MockImage;
(global as any).Image = MockImage;
