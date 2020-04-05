import * as http from "http";

export * from "./eventBuilder";

export class ServerSentEvents<T extends http.ServerResponse> {
    private response: T;

    constructor(response: T) {
        this.setDefaultHeaders(response);
        this.response = response;
    }

    private setDefaultHeaders(response: T): void {
        response.setHeader("Connection", "keep-alive");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Content-Type", "text/event-stream");
    }

    sendEvent(data: string): void {
        this.response.write(data);
    }

    close(): void {
        this.response.emit("end");
    }
}
