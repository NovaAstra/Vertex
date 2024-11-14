export const PLUGIN_NAME = 'CRASH_PLUGIN' as const

export function VuePlugin() {
    return {
        name: PLUGIN_NAME
    }
}