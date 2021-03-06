# server-sent-events-ts

Server-Sent Events handler for Node.js written in TypeScript.

## Installation

```bash
npm install --save server-sent-events-ts
```

## Example Usage

```typescript
const { Webserver } = require("webserver-ts");
const { ServerSentEvents, EventBuilder } = require("server-sent-events-ts");

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
    .run(port);
```
