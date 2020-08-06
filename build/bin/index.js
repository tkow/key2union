#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const file_1 = require("../file");
const watch_1 = require("../watch");
const main_1 = require("../main");
program.option('-w, --watch', 'watch file change').parse(process.argv);
const configOrError = file_1.getConfigFromPackageJson(process.cwd());
if (configOrError instanceof Error) {
    console.error(configOrError.message);
    process.exit(1);
}
const config = configOrError;
if (program.watch) {
    watch_1.watch(config);
}
else {
    main_1.default(config);
}
//# sourceMappingURL=index.js.map