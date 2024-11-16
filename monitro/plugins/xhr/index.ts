import {
    type VoidFunction,
    type AnyObject,
    type Plugin,
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

export function XHRPlugin(options: XHRPluginOptions = {}): Plugin {
    const originalXHRPro = XMLHttpRequest.prototype

    return {
        name: PLUGIN_NAME,
        setup() {
            const client = this;

            rewriteProperty(originalXHRPro, "open", (originalOpen: VoidFunction): VoidFunction => {
                return function (this: ExtendXMLHttpRequest, ...args: Parameters<XMLHttpRequest['open']>): void {
                    this._meta = {
                        r: {
                            m: args[0] ? args[0].toUpperCase() : args[0],
                            u: args[1]
                        },
                        s: {},
                        t: (client as any).getTime()
                    };

                    originalOpen.apply(this, args);
                }
            })

            rewriteProperty(originalXHRPro, "send", (originalSend: VoidFunction): VoidFunction => {
                return function (this: ExtendXMLHttpRequest, ...args: Parameters<XMLHttpRequest['send']>): void {
                    const { r } = this._meta
                    const { u } = r

                    originalSend.apply(this, args);
                }
            })
        }
    }
}