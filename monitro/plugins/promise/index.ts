import {
    type BasePlugin,
    type BasePluginAPI,
    type TransportDataset,
    ERROR_LEVEL_ENUM,
    EVENT_KIND_ENUM,
    ERROR_TYPE_ENUM,
    _global,
    getLocationHref,
    parseErrorEvent
} from "@vertex-monitro/core"

export const PLUGIN_NAME = 'PROMISE_PLUGIN' as const

export function PromisePlugin(): BasePlugin {
    return {
        name: PLUGIN_NAME,
        setup(api: BasePluginAPI) {
            _global.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
                event.preventDefault();

                api.next(event)
            })
        },
        transform(event: PromiseRejectionEvent): TransportDataset {
            console.log(parseErrorEvent(event))
            // const dataset = {
            //     name: ``,
            //     kind: EVENT_KIND_ENUM.ERROR,
            //     type: ERROR_TYPE_ENUM.PROMISE,
            //     level: ERROR_LEVEL_ENUM.ERROR,
            //     message: `Unable to load "${target.src || target.href}"`,
            //     route: getLocationHref()
            // }

            return {} as any
        }
    }
}