"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _amqplib = require("amqplib");

var _amqplib2 = _interopRequireDefault(_amqplib);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connection = void 0;

var init = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(config) {
        var connectionStr;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        connectionStr = "amqp://" + config.user + ":" + config.password + "@" + config.host;

                        if (connection) {
                            _context.next = 5;
                            break;
                        }

                        _context.next = 4;
                        return _amqplib2.default.connect(connectionStr);

                    case 4:
                        connection = _context.sent;

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function init(_x) {
        return _ref.apply(this, arguments);
    };
}();

var getQueue = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(config) {
        var channel, q;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return connection.createChannel();

                    case 2:
                        channel = _context2.sent;
                        _context2.next = 5;
                        return channel.assertQueue(config.name, _lodash2.default.extend({
                            durable: true,
                            exclusive: false,
                            autoDelete: false
                        }, config.setting));

                    case 5:
                        q = _context2.sent;
                        return _context2.abrupt("return", {
                            ch: channel,
                            q: q
                        });

                    case 7:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function getQueue(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

exports.default = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(config) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return init(config.mq);

                    case 2:
                        return _context4.abrupt("return", function () {
                            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
                                var qres;
                                return _regenerator2.default.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                _context3.next = 2;
                                                return getQueue(config.download);

                                            case 2:
                                                qres = _context3.sent;
                                                _context3.next = 5;
                                                return qres.ch.bindQueue(qres.q.queue, "amq.topic", qres.q.queue + ".urls");

                                            case 5:
                                                _lodash2.default.each(ctx.queueItem.resultUrls.items, function (url) {
                                                    console.log(url);
                                                    if (url.create && url.create.status === 201) {
                                                        qres.ch.publish("amq.topic", qres.q.queue + ".urls", new Buffer((0, _stringify2.default)(url.create)), {
                                                            priority: 1,
                                                            persistent: true
                                                        });
                                                    }
                                                });

                                                _context3.next = 8;
                                                return next();

                                            case 8:
                                            case "end":
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, undefined);
                            }));

                            return function (_x4, _x5) {
                                return _ref4.apply(this, arguments);
                            };
                        }());

                    case 3:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x3) {
        return _ref3.apply(this, arguments);
    };
}();
//# sourceMappingURL=queue.store.js.map