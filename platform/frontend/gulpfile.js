var gulp = require("gulp")
var fs = require("fs")

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