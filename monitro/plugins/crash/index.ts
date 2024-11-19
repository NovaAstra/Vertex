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

export interface CrashPluginOptions {
    service?: string;
}

export const PLUGIN_NAME = 'CRASH_PLUGIN' as const

export function CrashPlugin(options: CrashPluginOptions = {}) {
    const { service } = options

    return {
        name: PLUGIN_NAME,
        setup() {
            if (Worker) {
                if (!service) return

                const heartbeat = () => {

                }

                _global.addEventListener('beforeunload', () => {

                })

                heartbeat()
            }
        }
    }
}