var gulp = require("gulp");
var fs = require("fs")
var semver = require("semver")

gulp.task("updateMinorVersion", function (done) {
    let versionFilePath = "./src/config/VersionConfig.res"

    let content = fs.readFileSync(versionFilePath, {
        encoding: 'utf8',
    })

    let currentVersion = content.match(/^let\sgetPlatformVersion\s\=\s\(\)\s\=>\s"(.+)"/im)[1]

    fs.writeFileSync(versionFilePath, content.replace(/^let\sgetPlatformVersion\s\=\s\(\)\s\=>\s.+$/img, "let getPlatformVersion = () => " + "\"" + semver.inc(currentVersion, "minor") + "\"")
    )

    done()
});