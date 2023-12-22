var gulp = require("gulp")
var fs = require("fs")
var process = require("child_process")

let _changeToEnv = (env) => {
    let mainFilePath = "./src/external_layer/ui/app/utils/EnvUtils.res"

    fs.writeFileSync(mainFilePath, fs.readFileSync(mainFilePath, {
        encoding: 'utf8',
        // }).replace(/^let\s_getEnv\s\=\s\(\)\s\=>\s.+$/img, "let _getEnv = () => " + env)
    }).replace(/^let\sgetEnv\s\=\s\(\).+$/img, "let getEnv = (): EnvType.env => " + env)
    )
}

gulp.task("changeToLocalEnv", function (done) {
    _changeToEnv("#local")

    done()
})

gulp.task("changeToProductionEnv", function (done) {
    _changeToEnv("#production")

    done()
})

gulp.task("restoreEnv", function (done) {
    _changeToEnv("#local")

    done()
})

gulp.task("bundle_dts", function (done) {
    let data = [
        {
            /*! use node_modules dir will output wrong content: miss service type
            // source: "../../node_modules/meta3d-editor-whole-protocol/src/service/ServiceType.d.ts",
            */
            source: "../../packages/editor-whole/protocols/extension_protocols/meta3d-editor-whole-protocol/src/service/ServiceType.d.ts",
            target: "./static/dts/meta3d-editor-whole-protocol/src/service/ServiceType.d.ts",
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
            target: "./static/dts/meta3d-type/src/Index.d.ts",
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
                console.log(error)
                done()
            }
        })
    })
})