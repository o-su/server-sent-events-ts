const fs = require("fs");
const path = require("path");
const { Webserver } = require("webserver-ts");

const { ServerSentEvents, EventBuilder } = require("../dist/index.js");

let counter = 0;
const port = 3000;

new Webserver()
    .addResource({
        match: (data) => data.url === "/sse",
        onRequest: (data) => {
            const provider = new ServerSentEvents(data.response);

            setInterval(() => {
                counter++;

                const message = new EventBuilder()
                    .addId(counter)
                    .addData(JSON.stringify({ msg: "test" }))
                    .addData(JSON.stringify({ msg: "test2" }))
                    .build();

                provider.sendEvent(message);
            }, 5 * 1000);
        },
    })
    .addResource({
        match: (data) => data.url === "/",
        onRequest: (data) => {
            const content = fs.readFileSync(path.join(".", "index.html"));
            data.response.end(content);
        },
    })
    .addResource({
        match: (data) => data.url === "/client.js",
        onRequest: (data) => {
            const content = fs.readFileSync(path.join(".", data.url));
            data.response.end(content);
        },
    })
    .run(port);