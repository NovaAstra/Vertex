import {
    type VoidFunction,
    type AnyObject,
    type Plugin,
    _global,
    rewriteProperty,
} from "@vertex-monitro/core"

export const PLUGIN_NAME = 'CRASH_PLUGIN' as const

export function CrashPlugin() {
    return {
        name: PLUGIN_NAME
    }
}