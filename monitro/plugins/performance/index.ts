import {
    type BasePlugin,
    type BasePluginAPI,
    type AnyObject,
    _global,
} from "@vertex-monitro/core"
import { onLCP, onINP, onCLS, onTTFB, onFCP } from 'web-vitals';

export const PLUGIN_NAME = 'PERFORMANCE_PLUGIN' as const

export function PerformancePlugin(): BasePlugin {
    return {
        name: PLUGIN_NAME,
        setup(api: BasePluginAPI) {
            onLCP(api.emit)
            onINP(api.emit)
            onCLS(api.emit)
            onTTFB(api.emit)
            onFCP(api.emit)
        },
    }
}