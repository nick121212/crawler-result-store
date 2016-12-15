"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SaveBase = undefined;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SaveBase = exports.SaveBase = function () {
    function SaveBase(client, config, fields) {
        (0, _classCallCheck3.default)(this, SaveBase);

        this.client = client;
        this.config = config;
        this.fields = fields;
    }

    (0, _createClass3.default)(SaveBase, [{
        key: "mget",
        value: function mget(docs) {
            var _this = this;

            return new _promise2.default(function (resolve, reject) {
                _this.client.mget({
                    body: {
                        docs: docs
                    }
                }).then(resolve).catch(reject);
            });
        }
    }, {
        key: "pick",
        value: function pick(result) {
            var res = {};

            _lodash2.default.each(this.fields, function (field) {
                var val = _lodash2.default.pick(result, field);

                val && val[field] && (res[field] = val[field]);
            });

            return res;
        }
    }, {
        key: "save",
        value: function save(docs) {
            var _this2 = this;

            return new _promise2.default(function (resolve, reject) {
                _this2.client.bulk({
                    body: docs
                }).then(resolve).catch(reject);
            });
        }
    }]);
    return SaveBase;
}();
//# sourceMappingURL=save.base.js.map