import {
    type VoidFunction,
    type AnyObject,
    type Plugin,
    type PluginAPI,
    rewriteProperty
} from "@vertex-monitro/core"

export interface XHRPluginOptions {

}

export interface HttpRequest {
    m: MethodTypes | string;
    u: string | URL;
    d?: AnyObject;
}

export interface HttpResponse {
    s?: number;
    d?: AnyObject | string;
    m?: string;
}

export interface HttpMeta {
    r: HttpRequest;
    s: HttpResponse;
    t: number;
    e?: number;
}

export interface ExtendXMLHttpRequest extends XMLHttpRequest {
    _meta: HttpMeta
}

export enum MethodTypes {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}


export const PLUGIN_NAME = 'XHR_PLUGIN' as const

export function XHRPlugin(options: XHRPluginOptions = {}): Plugin<HttpMeta> {
    const originalXHRPro = XMLHttpRequest.prototype

    return {
        name: PLUGIN_NAME,
        setup(api: PluginAPI<HttpMeta>) {
            rewriteProperty(originalXHRPro, "open", (originalOpen: VoidFunction): VoidFunction => {
                return function (this: ExtendXMLHttpRequest, ...args: Parameters<XMLHttpRequest['open']>): void {
                    this._meta = {
                        r: {
                            m: args[0] ? args[0].toUpperCase() : args[0],
                            u: args[1]
                        },
                        s: {},
                        t: api.timestamp()
                    } as HttpMeta;

                    originalOpen.apply(this, args);
                }
            })

            rewriteProperty(originalXHRPro, "send", (originalSend: VoidFunction): VoidFunction => {
                return function (this: ExtendXMLHttpRequest, ...args: Parameters<XMLHttpRequest['send']>): void {
                    this.addEventListener('loadend', function (this: ExtendXMLHttpRequest) {
                        const { responseType, response, status } = this;

                        const _t = api.timestamp();

                        if (['', 'json', 'text'].indexOf(responseType) !== -1) {
                            this._meta.s.d = typeof response === 'object' ? JSON.stringify(response) : response;
                        }

                        this._meta.s.s = status;
                        this._meta.t = _t - this._meta.t;

                        api.next(this._meta);
                    })

                    originalSend.apply(this, args);
                }
            })
        }
    }
}