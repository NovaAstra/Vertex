import {
    type VoidFunction,
    type AnyObject,
    type Plugin,
    _global,
    rewriteProperty,
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