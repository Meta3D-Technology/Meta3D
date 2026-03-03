export let imageSrcToBase64 = (onloadFunc, onerrorFunc, src) => {
    // 如果已经是 Data URL
    if (src.startsWith('data:')) {
        onloadFunc(src);
        return;
    }

    // 处理网络图片
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;

    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        onloadFunc(canvas.toDataURL('image/png'));
    };

    img.onerror = onerrorFunc;
}