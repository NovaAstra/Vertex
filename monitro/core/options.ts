import type { AnyObject, ClientOptions } from "./types"

export interface BaseOptions extends ClientOptions {
    setTraceId: (http: string) => void
}

const DEFAULT_MONITRO_OPTIONS: ClientOptions = {}

export class Options<T extends ClientOptions = ClientOptions> implements BaseOptions {
    public constructor(options: T) {
        Object.assign(this, DEFAULT_MONITRO_OPTIONS, options)
    }

    public setTraceId(http: string) {

    }
}