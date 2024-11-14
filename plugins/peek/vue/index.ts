export const PLUGIN_NAME = 'VUE_PLUGIN' as const

export function VuePlugin() {
    return {
        name: PLUGIN_NAME
    }
}