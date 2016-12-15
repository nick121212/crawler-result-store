import amqplib from "amqplib";
import _ from "lodash";

let connection;

const init = async(config) => {
    let connectionStr = `amqp://${config.user}:${config.password}@${config.host}`;
    if (!connection) {
        connection = await amqplib.connect(connectionStr);
    }
};

const getQueue = async(config) => {
    let channel = await connection.createChannel();
    let q = await channel.assertQueue(config.name, _.extend({
        durable: true,
        exclusive: false,
        autoDelete: false
    }, config.setting));

    return {
        ch: channel,
        q: q
    };
};

export default async(config) => {
    await init(config.mq);

    return async(ctx, next) => {
        let qres = await getQueue(config.download);

        await qres.ch.bindQueue(qres.q.queue, "amq.topic", `${qres.q.queue}.urls`);
        _.each(ctx.queueItem.resultUrls.items, (url) => {
            console.log(url);
            if (url.create && url.create.status === 201) {
                qres.ch.publish("amq.topic", `${qres.q.queue}.urls`, new Buffer(JSON.stringify(url.create)), {
                    priority: 1,
                    persistent: true
                });
            }
        });

        await next();
    };
};