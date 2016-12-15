"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SaveUrls = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _save = require("./save.base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SaveUrls = exports.SaveUrls = function (_SaveBase) {
    (0, _inherits3.default)(SaveUrls, _SaveBase);

    function SaveUrls(client, config, fields) {
        (0, _classCallCheck3.default)(this, SaveUrls);
        return (0, _possibleConstructorReturn3.default)(this, (SaveUrls.__proto__ || (0, _getPrototypeOf2.default)(SaveUrls)).call(this, client, config, fields));
    }

    (0, _createClass3.default)(SaveUrls, [{
        key: "deal",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(urls, esIndex, type) {
                var _this2 = this;

                var urlsById, docs, resources, newUrls;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                urlsById = _lodash2.default.keyBy(urls, "_id");
                                docs = [];

                                if (!urls) {
                                    _context.next = 14;
                                    break;
                                }

                                // 遍历所有的链接，全部mget一下
                                _lodash2.default.forEach(urlsById, function (url) {
                                    docs.push({
                                        _index: esIndex,
                                        _type: type,
                                        _id: url._id
                                    });
                                });
                                // 判断链接是否存在
                                _context.next = 6;
                                return this.mget(docs);

                            case 6:
                                resources = _context.sent;

                                // 如果不存在，则新建；
                                newUrls = _lodash2.default.filter(resources.docs, function (doc) {
                                    if (doc.error && doc.error.type === "index_not_found_exception") {
                                        return true;
                                    }
                                    if (doc.found === false) {
                                        return true;
                                    }

                                    return false;
                                });

                                // 新建不在数据库中的文档

                                docs = [];
                                _lodash2.default.each(newUrls, function (url) {
                                    if (urlsById[url._id]) {
                                        docs.push({
                                            create: {
                                                _index: esIndex,
                                                _type: type,
                                                _id: url._id
                                            }
                                        });
                                        docs.push({
                                            doc: _this2.pick(_lodash2.default.extend({ "@timestamp": Date.now(), status: "queued" }, urlsById[url._id]))
                                        });
                                    }
                                });

                                if (!docs.length) {
                                    _context.next = 14;
                                    break;
                                }

                                _context.next = 13;
                                return this.save(docs);

                            case 13:
                                return _context.abrupt("return", _context.sent);

                            case 14:
                                return _context.abrupt("return", {});

                            case 15:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function deal(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return deal;
        }()
    }]);
    return SaveUrls;
}(_save.SaveBase);
//# sourceMappingURL=save.urls.js.map