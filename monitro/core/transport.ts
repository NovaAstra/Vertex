import { AnyObject } from "./types"
import { guid } from "./utiltes"

export abstract class Transport {
    public traceId!: string

    public async send<D extends AnyObject>(data: D): Promise<void> {
        const dataset = Object.create(data)

        dataset.guid = guid()
    }

    public bind() { }

    protected abstract sync: <D extends AnyObject>(data: D, dsn: string) => void

    protected abstract transform: () => void
}