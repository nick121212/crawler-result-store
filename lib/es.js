import { Client } from "elasticsearch";

export default (config) => {
    return new Client({
        host: `${config.host}:${config.port}`,
        log: [{
            type: "stdio",
            levels: ["error", "warning"]
        }]
    });
};