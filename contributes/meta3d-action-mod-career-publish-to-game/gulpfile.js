var gulp = require("gulp");
var path = require("path");
var fs = require("fs");
var publish = require("meta3d-tool-publish")
var bundle = require("meta3d-tool-bundle-to-custom")
var clipboard = require('clipboardy')

gulp.task("publish_local_env_bundle", function (done) {
    let filePath = "./src/Main.ts"

    let bundleContent = bundle.bundle(
        bundle.getLocalModulePath(
            filePath
        ),
        fs.readFileSync(filePath, "utf-8")
    )

    clipboard.default.writeSync(
        bundleContent
    )

    publish.publishBundledContribute(
        "local",
        path.join(__dirname, "package.json"),
        bundleContent
    ).then(() => {
        done()
    })
});



// gulp.task("publish_local_env", function (done) {
//     publish.publishContribute(
//         "local",
//         path.join(__dirname, "package.json"),
//         path.join(__dirname, "dist/static/js", "main.js")
//     ).then(() => {
//         done()
//     })
// });