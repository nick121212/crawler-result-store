import _ from "lodash";
import { SaveBase } from "./save.base";

export class SaveUrls extends SaveBase {
    constructor(client, config, fields) {
        super(client, config, fields);
    }

    async deal(urls, esIndex, type) {
        const urlsById = _.keyBy(urls, "_id");
        let docs = [];

        if (urls) {
            // 遍历所有的链接，全部mget一下
            _.forEach(urlsById, (url) => {
                docs.push({
                    _index: esIndex,
                    _type: type,
                    _id: url._id
                });
            });
            // 判断链接是否存在
            let resources = await this.mget(docs);
            // 如果不存在，则新建；
            let newUrls = _.filter(resources.docs, (doc) => {
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
            _.each(newUrls, (url) => {
                if (urlsById[url._id]) {
                    docs.push({
                        create: {
                            _index: esIndex,
                            _type: type,
                            _id: url._id
                        }
                    });
                    docs.push({
                        doc: this.pick(_.extend({ "@timestamp": Date.now(), status: "queued" }, urlsById[url._id]))
                    });
                }

            });
            if (docs.length) {
                return await this.save(docs);
            }
        }

        return {};
    }
}