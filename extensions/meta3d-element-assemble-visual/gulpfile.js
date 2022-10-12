var gulp = require("gulp");
var path = require("path");
var publish = require("meta3d-tool-publish")

gulp.task("publish", function (done) {
    publish.publishExtension(
        path.join(__dirname, "package.json"),
        path.join(__dirname, "dist/static/js", "main.js")
    ).then(() => {
        done()
    })
});


