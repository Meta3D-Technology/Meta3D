var gulp = require("gulp");
var fs = require("fs")
var process = require("child_process")
var publish = require("meta3d-platform-publish")

let env = null

let _getRootCwd = () => "../../"

gulp.task("set_env_to_local", function (done) {
    env = "local"

    done()
})

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

gulp.task("update_platform_code", function (done) {
    console.log("更新平台代码...")

    process.exec("yarn webpack_pro",
        {
            cwd: "../../platform/frontend"
        },
        (error, stdout, stderr) => {
            if (!error) {
                publish.updateHostFiles(env).then(_ => {
                    done()
                })
            } else {
                throw error
            }
        })
})


gulp.task("ci", function (done) {
    console.log("ci...")

    process.exec("yarn ci:test",
        {
            cwd: _getRootCwd()
        },
        (error, stdout, stderr) => {
            if (!error) {
                done()
            } else {
                throw error
            }
        })
})

gulp.task("lerna_version_patch", function (done) {
    console.log("发布patch版本...")

    process.exec("lerna version patch --yes",
        {
            cwd: _getRootCwd()
        },
        (error, stdout, stderr) => {
            if (!error) {
                done()
            } else {
                throw error
            }
        })
})

gulp.task("lerna_version_patch", function (done) {
    console.log("发布patch版本...")

    process.exec("lerna version patch --yes",
        {
            cwd: _getRootCwd()
        },
        (error, stdout, stderr) => {
            if (!error) {
                done()
            } else {
                throw error
            }
        })
})

// gulp.task("lerna_version_minor", function (done) {
//     console.log("发布minor版本...")

//     process.exec("lerna version minor --yes",
//         {
//             cwd: _getRootCwd()
//         },
//         (error, stdout, stderr) => {
//             if (!error) {
//                 done()
//             } else {
//                 throw error
//             }
//         })
// })

gulp.task("publish_extension_contribute_protocol", function (done) {
    console.log("发布扩展、贡献、协议...")

    let script = null
    switch (env) {
        case "local":
            script = "yarn meta3d:publish_dev"
            break
        case "production":
            script = "yarn meta3d:publish_pro"
            break
        default:
            throw new Error("error")
    }

    process.exec(script,
        {
            cwd: _getRootCwd()
        },
        (error, stdout, stderr) => {
            if (!error) {
                done()
            } else {
                throw error
            }
        })
})

gulp.task("upgrade_backend", function (done) {
    console.log("升级后端数据...")

    publish.upgradeBackend(env, "newest").then(_ => {
        done()
    })
});


// TODO use all tasks
// gulp.task("publish_local_env", gulp.series("set_env_to_local", "bundle_dts", "update_platform_code", "upgrade_backend", function (done) {
//     done()
// }));

gulp.task("publish_local_patch_env", gulp.series("set_env_to_local", "bundle_dts", "ci", "lerna_version_patch", "update_platform_code", "upgrade_backend", function (done) {
    done()
}));

// gulp.task("publish_pro_env", function (done) {
//     publish.publish("production", "newest").then(_ => {
//         done()
//     })
// });
