"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SaveResults = undefined;

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

var SaveResults = exports.SaveResults = function (_SaveBase) {
    (0, _inherits3.default)(SaveResults, _SaveBase);

    function SaveResults(client, config, fields) {
        (0, _classCallCheck3.default)(this, SaveResults);
        return (0, _possibleConstructorReturn3.default)(this, (SaveResults.__proto__ || (0, _getPrototypeOf2.default)(SaveResults)).call(this, client, config, fields));
    }

    (0, _createClass3.default)(SaveResults, [{
        key: "deal",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(id, results, type) {
                var docs;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                docs = [];

                                // 保存分析出来的数据

                                _lodash2.default.each(results, function (result) {
                                    docs.push({
                                        index: {
                                            _index: result.rule.key,
                                            _type: type,
                                            _id: id
                                        }
                                    });
                                    docs.push({ doc: result.result });
                                });

                                if (!docs.length) {
                                    _context.next = 6;
                                    break;
                                }

                                _context.next = 5;
                                return this.save(docs);

                            case 5:
                                return _context.abrupt("return", _context.sent);

                            case 6:
                                return _context.abrupt("return", {});

                            case 7:
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
    return SaveResults;
}(_save.SaveBase);
//# sourceMappingURL=save.results.js.map