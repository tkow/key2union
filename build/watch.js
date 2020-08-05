"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watch = void 0;
const fs_1 = require("fs");
const path = require("path");
const file_1 = require("./file");
const generate_1 = require("./generate");
exports.watch = (filePath, config) => {
    const dir = path.dirname(filePath);
    const { outputDir: outputPath, module: { dFileName } } = config;
    console.info(`Start watching: ${dir}`);
    fs_1.watch(dir, { persistent: true, recursive: true }, (eventType, fileName) => {
        console.info(`Detect ${fileName} ${eventType}`);
        const translationOrError = file_1.getTranslationFromModel(filePath);
        if (translationOrError instanceof Error) {
            console.error(translationOrError.message);
        }
        const translation = translationOrError;
        generate_1.generate(translation, config)
            .then(() => console.info(`Emitted: ${path.join(outputPath, dFileName)}`))
            .catch(error => console.error(`Error occurred while emitting: ${error.message}`));
    });
};
//# sourceMappingURL=watch.js.map