export const PLUGIN_NAME = 'STACK_PLUGIN' as const

export function PromisePlugin() {
    return {
        name: PLUGIN_NAME
    }
}