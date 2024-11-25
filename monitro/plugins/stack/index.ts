import {
    type BasePlugin,
    type BasePluginAPI,
    type AnyObject,
    _global,
} from "@vertex-monitro/core"
import {parse} from "@vertex/erralyze"

export interface ResourceTarget {
    src?: string;
    href?: string;
    localName?: string;
}

export const PLUGIN_NAME = 'STACK_PLUGIN' as const

export function StackPlugin(): BasePlugin {
    return {
        name: PLUGIN_NAME,
        setup(api: BasePluginAPI) {
            _global.addEventListener(
                "error",
                (event: ErrorEvent) => {
                    event.preventDefault();

                    api.next(event)
                },
                true)
        },
        transform(event: AnyObject) {
            return parse(event as ErrorEvent)
        }
    }
}