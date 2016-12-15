import es from "./lib/es";
import { SaveUrls } from "./lib/save.urls";
import { SaveResults } from "./lib/save.results";
import { SaveQueueItem } from "./lib/save.queueitem";
import boom from "boom";
import queueStore from "./queue.store";

const saveQueueItemFields = [
    "protocol",
    "host",
    "query",
    "port",
    "path",
    "depth",
    "url",
    "errorCount",
    "error",
    "statusCode",
    "responseBody",
    "@timestamp",
    "status",
    "updatedAt"
];

export const queueResultUrl = queueStore;

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
export default async(config) => {
    const client = await es(config);
    const esIndex = "crawler.urls1";
    const saveUrls = new SaveUrls(client, config, saveQueueItemFields);
    const saveResults = new SaveResults(client, config, saveQueueItemFields);
    const saveQueueItem = new SaveQueueItem(client, config, saveQueueItemFields);

    /**
     * 1、保存分析出来的url入库
     * 2、保存分析结果入库
     * 3、保存queueItem入库
     */
    return async(ctx, next) => {
        const key = ctx.config.key;

        if (ctx.queueItem) {
            let resultUrls = await saveUrls.deal(ctx.queueItem.analysisUrlResult, esIndex, key);
            // let resultUrls1 = await saveUrls.deal();
            let resultResults = await saveResults.deal(ctx.queueItem._id, ctx.queueItem.analysisResult, key);
            let resultQueueItem = await saveQueueItem.deal(ctx.queueItem, esIndex, key);

            if (resultUrls.errors === true) {
                throw boom.create(604);
            }
            if (resultResults.errors === true) {
                throw boom.create(605);
            }
            if (resultQueueItem.errors === true) {
                throw boom.create(606);
            }

            ctx.queueItem.resultUrls = resultUrls;
        }
        ctx.status.urlStore = true;

        await next();
    };
};