"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenKeys = exports.extractInterpolations = void 0;
const constants_1 = require("./constants");
exports.extractInterpolations = (str) => {
    const interpolations = [];
    while (true) {
        const matches = str.match(constants_1.INTERPOLATION_PATTERN);
        if (!matches) {
            break;
        }
        interpolations.push(matches[1]);
        str = str.replace(constants_1.INTERPOLATION_PATTERN, '');
    }
    return interpolations;
};
exports.flattenKeys = (json, prefix = undefined, result = []) => {
    Object.keys(json).forEach(key => {
        const flatKey = prefix ? `${prefix}.${key}` : key;
        const value = json[key];
        if (typeof value === 'object') {
            exports.flattenKeys(value, flatKey, result);
        }
        else {
            const interpolations = exports.extractInterpolations(value);
            result.push({ key: flatKey, value, interpolations });
        }
    });
    return result;
};
//# sourceMappingURL=parser.js.map