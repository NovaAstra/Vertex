import {
    type BasePlugin,
    type BasePluginAPI,
    type TransportDataset,
    ERROR_LEVEL_ENUM,
    EVENT_KIND_ENUM,
    ERROR_TYPE_ENUM,
    _global,
    getLocationHref,
    parseStack
} from "@vertex-monitro/core"

export interface ResourceTarget {
    src?: string;
    href?: string;
    localName?: string;
}

export const PLUGIN_NAME = 'STACK_PLUGIN' as const

export function StackPlugin(): BasePlugin {
    return {
        name: PLUGIN_NAME,
        setup(api: BasePluginAPI) {
            _global.addEventListener(
                "error",
                (event: ErrorEvent) => {
                    event.preventDefault();
                    api.next(event)
                },
                true)
        },
        transform(event: ErrorEvent): TransportDataset {
            const target = event.target as ResourceTarget

            if (target.localName)
                return resourceTransform(target)

            return jscodeTransform(event)
        }
    }
}

function resourceTransform(target: ResourceTarget): TransportDataset {
    const dataset = {
        name: `${target.localName} load error`,
        kind: EVENT_KIND_ENUM.ERROR,
        type: ERROR_TYPE_ENUM.RESOURCE,
        level: ERROR_LEVEL_ENUM.ERROR,
        message: `Unable to load "${target.src || target.href}"`,
        route: getLocationHref()
    }

    return dataset
}

function jscodeTransform(event: ErrorEvent): TransportDataset {
    const { message, filename, lineno, colno, error } = event

    const { stack } = parseStack(error);

    const dataset = {
        name: 'JS_UNKNOWN',
        kind: EVENT_KIND_ENUM.ERROR,
        type: ERROR_TYPE_ENUM.JAVASCRIPT,
        level: ERROR_LEVEL_ENUM.ERROR,
        message,
        filename,
        stack,
        position: `${lineno}:${colno}`,
        route: getLocationHref()
    }

    return dataset
}