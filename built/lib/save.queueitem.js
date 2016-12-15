"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SaveQueueItem = undefined;

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

var SaveQueueItem = exports.SaveQueueItem = function (_SaveBase) {
    (0, _inherits3.default)(SaveQueueItem, _SaveBase);

    function SaveQueueItem(client, config, fields) {
        (0, _classCallCheck3.default)(this, SaveQueueItem);
        return (0, _possibleConstructorReturn3.default)(this, (SaveQueueItem.__proto__ || (0, _getPrototypeOf2.default)(SaveQueueItem)).call(this, client, config, fields));
    }

    (0, _createClass3.default)(SaveQueueItem, [{
        key: "deal",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(queueItem, esIndex, key) {
                var docs;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                docs = [];


                                docs.push({
                                    index: {
                                        _index: esIndex,
                                        _type: key,
                                        _id: "queueItem._id"
                                    }
                                });
                                queueItem.status = "complete";
                                docs.push({ doc: this.pick(queueItem) });

                                return _context.abrupt("return", {});

                            case 5:
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
    return SaveQueueItem;
}(_save.SaveBase);
//# sourceMappingURL=save.queueitem.js.map