#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const path = require("path");
const file_1 = require("../file");
const generate_1 = require("../generate");
const watch_1 = require("../watch");
program.option('-w, --watch', 'watch file change').parse(process.argv);
const configOrError = file_1.getConfigFromPackageJson(process.cwd());
if (configOrError instanceof Error) {
    console.error(configOrError.message);
    process.exit(1);
}
const config = configOrError;
if (program.watch) {
    watch_1.watch(config.model, config);
}
else {
    const translationOrError = file_1.getTranslationFromModel(config.model);
    if (translationOrError instanceof Error) {
        console.error(translationOrError.message);
        process.exit(1);
    }
    const translation = translationOrError;
    generate_1.generate(translation, config)
        .then(() => console.info(`Emitted: ${path.join(config.outputDir, config.module.dFileName)}`))
        .catch(error => console.error(`Error occurred while emitting: ${error.message}`));
}
//# sourceMappingURL=index.js.map