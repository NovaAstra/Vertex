import {
    type VoidFunction,
    type AnyObject,
    type BasePlugin,
    _global,
    rewriteProperty,
} from "@vertex/peekify"

export const PLUGIN_NAME = 'CRASH_PLUGIN' as const

export function CrashPlugin() {
    return {
        name: PLUGIN_NAME
    }
}