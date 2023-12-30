var gulp = require("gulp");
var fs = require("fs")
var process = require("child_process")
var publish = require("meta3d-platform-publish")

gulp.task("bundle_dts", function (done) {
    console.log("打包DTS...")

    let data = [
        {
            /*! use node_modules dir will output wrong content: miss service type
            // source: "../../node_modules/meta3d-editor-whole-protocol/src/service/ServiceType.d.ts",
            */
            source: "../../packages/editor-whole/protocols/extension_protocols/meta3d-editor-whole-protocol/src/service/ServiceType.d.ts",
            target: "../../platform/frontend/static/dts/meta3d-editor-whole-protocol/src/service/ServiceType.d.ts",
            postHandle: (content) => {
                return content.replace("actionContribute$1 as actionContribute,", "")
                    .replace("inputContribute$1 as inputContribute,", "")
                    .replace("uiControlContribute$1 as uiControlContribute,", "")
                    .replace("export type service = Merge<scene,", "export type service$123 = Merge<scene,")
                    .replace("export type engineSceneService = service", "export type engineSceneService = service$123")
            }
        },
        {
            source: "../../defaults/meta3d-type/src/Index.d.ts",
            target: "../../platform/frontend/static/dts/meta3d-type/src/Index.d.ts",
            postHandle: (content) => {
                return content
            }
        }
    ]

    data.forEach(({ source, target, postHandle }, i) => {
        process.exec("./node_modules/.bin/dts-bundle-generator --no-check --project tsconfig.json -o " + target + " " + source, (error, stdout, stderr) => {
            if (!error) {
                fs.writeFileSync(
                    target,
                    postHandle(fs.readFileSync(target, "utf-8")),
                    "utf-8"
                )

                if (i + 1 == data.length) {
                    done()
                }
            } else {
                // console.log(error)
                throw error
                // done()
            }
        })
    })
})

gulp.task("update_versionconfig", function (done) {
    console.log("更新VersionConfig...")

    let newVersion = JSON.parse(fs.readFileSync("../../lerna.json", "utf-8")).version

    let filePath = "../../platform/frontend/src/external_layer/ui/app/utils/utils/config/VersionConfig.res"

    fs.writeFileSync(
        filePath,
        fs.readFileSync(filePath, "utf-8").replace(/"(.+)"/, "\"" + newVersion + "\""),
        "utf-8"
    )

    done()
})

gulp.task("publish_local_env", gulp.series("bundle_dts", function (done) {
    console.log("升级后端数据...")

    publish.upgradeBackend("local", "newest").then(_ => {
        done()
    })
}));

// gulp.task("publish_pro_env", function (done) {
//     publish.publish("production", "newest").then(_ => {
//         done()
//     })
// });
