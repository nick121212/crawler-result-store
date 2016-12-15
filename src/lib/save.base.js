import _ from "lodash";

export class SaveBase {
    constructor(client, config, fields) {
        this.client = client;
        this.config = config;
        this.fields = fields;
    }

    mget(docs) {
        return new Promise((resolve, reject) => {
            this.client.mget({
                body: {
                    docs: docs
                }
            }).then(resolve).catch(reject);
        });
    }

    pick(result) {
        let res = {};

        _.each(this.fields, (field) => {
            let val = _.pick(result, field);

            val && val[field] && (res[field] = val[field]);
        });

        return res;
    }

    save(docs) {
        return new Promise((resolve, reject) => {
            this.client.bulk({
                body: docs
            }).then(resolve).catch(reject);
        });
    }
}