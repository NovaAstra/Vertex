import { Client } from "@vertex-monitro/core"
import {XHRPlugin} from "@vertex-monitro-plugin/xhr"

export interface BrowserOptions {

}

export class BrowserClient extends Client {
    public constructor(options: BrowserOptions) {
        super(options);
    }

    public async launch() { }
}

export function MonitroClient(options: BrowserOptions) {
    const client = new BrowserClient(options);

    client.use()

    client.launch()

    return client
}