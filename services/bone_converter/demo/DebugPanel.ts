/**
 * DebugPanel — 调试面板（D1 基础版）
 *
 * 功能：
 *  - 左侧：骨骼列表（bone.name + 数量）
 *  - 右侧：动画轨道列表（tracks 名称）
 *  - 底部：console 风格日志区（带着色）
 *
 * 后续 D2~D6 会在本类中扩展：
 *  - 转换前/后骨骼对照（绿=匹配 / 红=未匹配）
 *  - 骨骼树视图（缩进文本树）
 *  - 轨道匹配状态
 */

type LogLevel = 'info' | 'ok' | 'warn' | 'error';

export class DebugPanel {
    private readonly boneListEl: HTMLUListElement;
    private readonly boneCountEl: HTMLSpanElement;
    private readonly trackListEl: HTMLUListElement;
    private readonly trackCountEl: HTMLSpanElement;
    private readonly logAreaEl: HTMLDivElement;

    constructor() {
        const $ = <T extends HTMLElement>(id: string): T => {
            const el = document.getElementById(id);
            if (!el) throw new Error(`[DebugPanel] 找不到 DOM 节点 #${id}`);
            return el as T;
        };
        this.boneListEl = $<HTMLUListElement>('bone-list');
        this.boneCountEl = $<HTMLSpanElement>('bone-count');
        this.trackListEl = $<HTMLUListElement>('track-list');
        this.trackCountEl = $<HTMLSpanElement>('track-count');
        this.logAreaEl = $<HTMLDivElement>('log-area');
    }

    /** 左侧显示骨骼列表 */
    setBoneList(names: string[]): void {
        this.boneListEl.innerHTML = '';
        for (const name of names) {
            const li = document.createElement('li');
            li.textContent = name;
            this.boneListEl.appendChild(li);
        }
        this.boneCountEl.textContent = `(${names.length})`;
    }

    /** 右侧显示动画轨道列表 */
    setTrackList(trackNames: string[]): void {
        this.trackListEl.innerHTML = '';
        for (const name of trackNames) {
            const li = document.createElement('li');
            li.textContent = name;
            this.trackListEl.appendChild(li);
        }
        this.trackCountEl.textContent = `(${trackNames.length})`;
    }

    /** 底部日志区追加一行 */
    log(message: string, level: LogLevel = 'info'): void {
        const div = document.createElement('div');
        div.className = `log-line log-${level}`;
        const time = new Date().toTimeString().slice(0, 8);
        div.textContent = `[${time}] ${message}`;
        this.logAreaEl.appendChild(div);
        this.logAreaEl.scrollTop = this.logAreaEl.scrollHeight;
    }
}
