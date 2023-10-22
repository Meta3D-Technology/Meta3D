import imgui, * as ImGui from "./imgui"
import * as ImGui_Impl from "./imgui_impl_button"
// import addImge from ""
// import * as addImage from "file-loader!./image/add.png"
import addImage from "url-loader!./image/add.png"
// import addImage2 from "asset!./image/add.png"


let textureCache: ImGui_Impl.TextureCache = new ImGui_Impl.TextureCache;

export let addTexture: ImGui_Impl.Texture;
// export let getAddImage: ImGui_Impl.Texture = () => addImge



export let loadImage = (textureCache, name, imageBase64Src) => {
    var tex = new ImGui_Impl.Texture();
    var image = new Image();
    // image.crossOrigin = "anonymous";
    image.src = imageBase64Src;
    tex.Update(image);

    textureCache.cache[name] = tex;

    return tex;
}


export let init = () => {
    // return textureCache.Load("img", addImage).then(img => {
    //     addTexture = img;
    // });
    addTexture = loadImage(textureCache, "addImage", addImage)

    return Promise.resolve()

    // addTexture = new ImGui_Impl.Texture();
    // addTexture.Update(addImage)
}