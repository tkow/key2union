"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watch = void 0;
const fs_1 = require("fs");
const main_1 = require("./main");
exports.watch = (config) => {
    config.model.forEach((dir) => {
        console.info(`Start watching: ${dir}`);
        fs_1.watch(dir, { persistent: true, recursive: true }, (eventType, fileName) => {
            console.info(`Detect ${fileName} ${eventType}`);
            main_1.default(config);
        });
    });
};
//# sourceMappingURL=watch.js.map