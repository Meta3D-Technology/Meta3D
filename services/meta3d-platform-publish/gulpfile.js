var gulp = require("gulp");
var publish = require("meta3d-platform-publish")

gulp.task("publish_local_env", function (done) {
    publish.publish("local", "newest").then(_ => {
        done()
    })
});

gulp.task("publish_pro_env", function (done) {
    publish.publish("production", "newest").then(_ => {
        done()
    })
});
