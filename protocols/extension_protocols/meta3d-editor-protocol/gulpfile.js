var gulp = require("gulp");
var path = require("path");
var publish = require("meta3d-tool-publish")

gulp.task("publish", function (done) {
    publish.publishExtensionProtocol(
        path.join(__dirname, "package.json")
    ).then(() => {
        done()
    })
});


