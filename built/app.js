"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.queueResultUrl = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _es = require("./lib/es");

var _es2 = _interopRequireDefault(_es);

var _save = require("./lib/save.urls");

var _save2 = require("./lib/save.results");

var _save3 = require("./lib/save.queueitem");

var _boom = require("boom");

var _boom2 = _interopRequireDefault(_boom);

var _queue = require("./queue.store");

var _queue2 = _interopRequireDefault(_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveQueueItemFields = ["protocol", "host", "query", "port", "path", "depth", "url", "errorCount", "error", "statusCode", "responseBody", "@timestamp", "status", "updatedAt"];

var queueResultUrl = exports.queueResultUrl = _queue2.default;

/**
 * queueItem                            Object                    当前爬取地址对象
 * queueItem.analysisUrlResult          Array<Object>             分析html页面得出的url地址数组
 * queueItem.analysisResult             Object                    分析html页面得出的数据结果
 * queueItem.analysisResultUrls         Array<String>             分析页面解析结果中的地址数组
 * queueItem.analysisResultUrlResult    Array<Object>             分析页面解析结果中的地址数组，经过queue处理
 * queueItem.aiAnalysisResult           Array<Object|String>      分词解析后的结果
 * queueItem.responseBody               String                    页面的html
 * queueItem.statusCode                 Number                    下载页面得到的返回码
 * queueItem.protocol                   String                    地址协议
 * queueItem.host                       String                    host地址
 * queueItem.query                      String                    querystring
 * queueItem.port                       Number                    地址
 * queueItem.url                        String                    完整地址
 * queueItem.depth                      Number                    深度
 */

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(config) {
        var client, esIndex, saveUrls, saveResults, saveQueueItem;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return (0, _es2.default)(config);

                    case 2:
                        client = _context2.sent;
                        esIndex = "crawler.urls1";
                        saveUrls = new _save.SaveUrls(client, config, saveQueueItemFields);
                        saveResults = new _save2.SaveResults(client, config, saveQueueItemFields);
                        saveQueueItem = new _save3.SaveQueueItem(client, config, saveQueueItemFields);

                        /**
                         * 1、保存分析出来的url入库
                         * 2、保存分析结果入库
                         * 3、保存queueItem入库
                         */

                        return _context2.abrupt("return", function () {
                            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
                                var key, resultUrls, resultResults, resultQueueItem;
                                return _regenerator2.default.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                key = ctx.config.key;

                                                if (!ctx.queueItem) {
                                                    _context.next = 18;
                                                    break;
                                                }

                                                _context.next = 4;
                                                return saveUrls.deal(ctx.queueItem.analysisUrlResult, esIndex, key);

                                            case 4:
                                                resultUrls = _context.sent;
                                                _context.next = 7;
                                                return saveResults.deal(ctx.queueItem._id, ctx.queueItem.analysisResult, key);

                                            case 7:
                                                resultResults = _context.sent;
                                                _context.next = 10;
                                                return saveQueueItem.deal(ctx.queueItem, esIndex, key);

                                            case 10:
                                                resultQueueItem = _context.sent;

                                                if (!(resultUrls.errors === true)) {
                                                    _context.next = 13;
                                                    break;
                                                }

                                                throw _boom2.default.create(604);

                                            case 13:
                                                if (!(resultResults.errors === true)) {
                                                    _context.next = 15;
                                                    break;
                                                }

                                                throw _boom2.default.create(605);

                                            case 15:
                                                if (!(resultQueueItem.errors === true)) {
                                                    _context.next = 17;
                                                    break;
                                                }

                                                throw _boom2.default.create(606);

                                            case 17:

                                                ctx.queueItem.resultUrls = resultUrls;

                                            case 18:
                                                ctx.status.urlStore = true;

                                                _context.next = 21;
                                                return next();

                                            case 21:
                                            case "end":
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, undefined);
                            }));

                            return function (_x2, _x3) {
                                return _ref2.apply(this, arguments);
                            };
                        }());

                    case 8:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}();
//# sourceMappingURL=app.js.map