"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _elasticsearch = require("elasticsearch");

exports.default = function (config) {
    return new _elasticsearch.Client({
        host: config.host + ":" + config.port,
        log: [{
            type: "stdio",
            levels: ["error", "warning"]
        }]
    });
};
//# sourceMappingURL=es.js.map