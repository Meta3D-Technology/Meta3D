var gulp = require("gulp");
var path = require("path");
var publish = require("meta3d-tool-publish-protocol")

gulp.task("publish_local_env", function (done) {
    publish.publishContributeProtocol(
        "local",
        path.join(__dirname, "package.json"),
        path.join(__dirname, "icon.png")
    ).then(() => {
        done()
    })
});

gulp.task("publish_production_env", function (done) {
    publish.publishContributeProtocol(
        "production",
        path.join(__dirname, "package.json"),
        path.join(__dirname, "icon.png")
    ).then(() => {
        done()
    })
});
