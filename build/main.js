"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const file_1 = require("./file");
const generate_1 = require("./generate");
function default_1(config) {
    const models = Array.isArray(config.model) ? config.model : [config.model];
    const translationOrError = models.reduce((result, input) => {
        const nextInput = file_1.getTranslationFromModel(input);
        if (nextInput instanceof Error) {
            console.error(nextInput.message);
            process.exit(1);
        }
        return Object.assign(Object.assign({}, result), nextInput);
    }, {});
    const translation = translationOrError;
    generate_1.generate(translation, config)
        .then(() => console.info(`Emitted: ${path.join(config.outputDir, config.module.dFileName)}`))
        .catch(error => console.error(`Error occurred while emitting: ${error.message}`));
}
exports.default = default_1;
//# sourceMappingURL=main.js.map