"use strict";
exports.__esModule = true;
var rc_1 = require("rc");
function getConfig(name) {
    var config = rc_1["default"](name);
    if (!config) {
        throw new Error('config by name not found');
    }
    return config;
}
exports.getConfig = getConfig;
