import { Client } from "@vertex-monitro/core"

export interface BrowserOptions {

}

export class BrowserClient extends Client {
    public constructor(options: BrowserOptions) {
        super(options);
    }
}

export function MonitroClient(options: BrowserOptions) {
    const client = new BrowserClient(options);
    client.use([])
}