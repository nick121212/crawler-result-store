import _ from "lodash";
import { SaveBase } from "./save.base";

export class SaveQueueItem extends SaveBase {
    constructor(client, config, fields) {
        super(client, config, fields);
    }

    async deal(queueItem, esIndex, key) {
        let docs = [];

        docs.push({
            index: {
                _index: esIndex,
                _type: key,
                _id: "queueItem._id"
            }
        });
        queueItem.status = "complete";
        docs.push({ doc: this.pick(queueItem) });

        return {};
    }
}