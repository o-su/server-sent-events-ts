export class EventBuilder {
    private data: string[] = [];
    private id: string | undefined;
    private retryInterval: number | undefined;
    private eventName: string | undefined;

    addEventName(eventName: string): this {
        this.eventName = eventName;
        return this;
    }

    addId(id: string): this {
        this.id = id;
        return this;
    }

    addRetryInterval(interval: number): this {
        this.retryInterval = interval;
        return this;
    }

    addData(data: string): this {
        this.data.push(data);
        return this;
    }

    build(): string {
        const message: string = this.joinFields(this.data.map((data) => `data: ${data}`));
        const headers: string[] = [];

        if (this.eventName) {
            headers.push(`event: ${this.eventName}`);
        }

        if (this.id) {
            headers.push(`id: ${this.id}`);
        }

        if (this.retryInterval) {
            headers.push(`retry: ${this.retryInterval}`);
        }

        const joinedHeaders: string = this.joinFields(headers);

        return joinedHeaders + message;
    }

    private joinFields(fields: string[]): string {
        return fields.map((field: string) => field + "\n\n").join("");
    }
}
