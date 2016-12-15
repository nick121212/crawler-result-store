import _ from "lodash";
import { SaveBase } from "./save.base";

export class SaveResults extends SaveBase {
    constructor(client, config, fields) {
        super(client, config, fields);
    }

    async deal(id, results, type) {
        let docs = [];

        // 保存分析出来的数据
        _.each(results, (result) => {
            docs.push({
                index: {
                    _index: result.rule.key,
                    _type: type,
                    _id: id
                }
            });
            docs.push({ doc: result.result });
        });

        if (docs.length) {
            return await this.save(docs);
        }

        return {};
    }
}