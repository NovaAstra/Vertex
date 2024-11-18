import {
    type Plugin,
    type PluginAPI,
    EVENT_TYPE_ENUM,
    ERROR_LEVEL_ENUM,
    _global,
} from "@vertex-monitro/core"

export interface ResourceTarget {
    src?: string;
    href?: string;
    localName?: string;
}


export const PLUGIN_NAME = 'STACK_PLUGIN' as const

export function StackPlugin(): Plugin {
    return {
        name: PLUGIN_NAME,
        setup(api) {
            _global.addEventListener(
                "error",
                (event: ErrorEvent) => {
                    event.preventDefault();
                    api.next(event)
                },
                true)
        },
        transform(event: ErrorEvent) {
            const target = event.target as ResourceTarget

            if (target.localName)
                return resourceTransform(target)

            return jscodeTransform(event)
        }
    }
}

function resourceTransform(target: ResourceTarget) {
    const dataset = {
        name: '',
        kind: '',
        type: '',
        level: ERROR_LEVEL_ENUM.ERROR,
        timestamp: Date.now().toString(),
        message: '',
        route: ''
    }

    return dataset
}

function jscodeTransform(event: ErrorEvent) {
    const dataset = {
        name: '',
        kind: '',
        type: '',
        level: ERROR_LEVEL_ENUM.ERROR,
        timestamp: Date.now().toString(),
        message: '',
        route: ''
    }

    return dataset
}