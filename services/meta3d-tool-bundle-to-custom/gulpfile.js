var gulp = require("gulp");
var fs = require("fs");
var Main = require("./lib/js/src/Main.bs.js");

gulp.task("bundle", function (done) {
    // let filePath = "./run_test/test1/ImportProtocol.ts"
    let filePath = "./run_test/test2/ImportUtils.ts"

    let localModulePath = Main.getLocalModulePath(filePath, null)
    console.log(localModulePath);

    let result = Main.bundle(localModulePath,
        fs.readFileSync(filePath, "utf-8")
    )

    console.log(result)

    done()
});