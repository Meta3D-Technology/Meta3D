interface ImportOptions {
    maxSize?: number; // 最大文件大小（单位：字节）
    accept?: string; // 接受的文件类型，如 "image/*", ".jpg,.png"
    multiple?: boolean; // 是否允许多选
}

// 辅助函数：格式化文件大小
let _formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

let _import = (onloadFunc: any, onerrorFunc: any, onprogressFunc: any, oncancelFunc: any,
    fileType: "file" | "image",
    options: ImportOptions = {}
) => {
    let input = document.createElement('input');
    input.setAttribute('type', "file");
    input.style.visibility = 'hidden';

    // 设置文件类型限制
    if (options.accept) {
        input.setAttribute('accept', options.accept);
    } else {
        // 默认根据 fileType 设置 accept
        switch (fileType) {
            case "image":
                input.setAttribute('accept', 'image/*');
                break;
            case "file":
                // 不设置 accept，接受所有文件
                break;
        }
    }

    // 设置是否允许多选
    if (options.multiple) {
        input.setAttribute('multiple', 'multiple');
    }

    // 设置最大文件大小（默认 10MB）
    const maxSize = options.maxSize || 10 * 1024 * 1024;

    input.onchange = (event) => {
        const target = event.target as HTMLInputElement;
        const files = target.files;

        if (!files || files.length === 0) {
            oncancelFunc();
            return;
        }

        // 处理每个文件
        const processFile = (file: File, index: number) => {
            // 检查文件大小
            if (file.size > maxSize) {
                const errorEvent = new ProgressEvent('error', {
                    lengthComputable: true,
                    loaded: 0,
                    total: file.size
                });

                // 修改 errorEvent 对象以包含错误信息
                Object.defineProperty(errorEvent, 'target', {
                    value: {
                        error: new DOMException(
                            `文件 ${file.name} 大小 ${_formatFileSize(file.size)} 超过限制 ${_formatFileSize(maxSize)}`,
                            'SizeError'
                        )
                    },
                    writable: false
                });

                onerrorFunc(errorEvent as ProgressEvent<FileReader>, file);
                return;
            }

            let reader = new FileReader();

            reader.onload = () => {
                onloadFunc(file, reader.result);

                // 如果允许多选且有下一个文件，继续处理
                if (options.multiple && files && index < files.length - 1) {
                    processFile(files[index + 1], index + 1);
                }
            };

            reader.onprogress = (event) => {
                onprogressFunc(event.loaded, event.total);
            };

            reader.onerror = (event) => {
                onerrorFunc(event, file);
            };

            switch (fileType) {
                case "file":
                    reader.readAsArrayBuffer(file);
                    break;
                case "image":
                    reader.readAsDataURL(file);
                    break;
            }
        };

        // 从第一个文件开始处理
        processFile(files[0], 0);
    };

    (input as any).oncancel = (event: any) => {
        oncancelFunc();
    };

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);

}

export let importFile = (onloadFunc: any, onerrorFunc: any, onprogressFunc: any, oncancelFunc: any, maxSize = 50 * 1024 * 1024) => {
    _import(onloadFunc, onerrorFunc, onprogressFunc, oncancelFunc, "file", { maxSize })
}

export let importImage = (onloadFunc: any, onerrorFunc: any, onprogressFunc: any, oncancelFunc: any, maxSize = 0.5 * 1024 * 1024) => {
    _import(onloadFunc, onerrorFunc, onprogressFunc, oncancelFunc, "image", { maxSize })
}