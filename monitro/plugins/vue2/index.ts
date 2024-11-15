import Vue from "vue"
import {
    type VoidFunction,
    type AnyObject,
    type BasePlugin,
    rewriteProperty
} from "@vertex/peekify"

export type VueInstance = typeof Vue;

export interface VuePluginOptions {
    vue?: VueInstance
}

export const PLUGIN_NAME = 'VUE2_PLUGIN' as const

export function Vue2Plugin(options: VuePluginOptions = {}): BasePlugin {
    return {
        name: PLUGIN_NAME,
        setup() {
            const { vue } = options

            if (!vue) return

            rewriteProperty(vue.config, 'errorHandler', (originalErrorHandler: VoidFunction) => {
                return function () {

                }
            })

            rewriteProperty(vue.config, 'warnHandler', (originalWarnHandler: VoidFunction) => {
                return function () {

                }
            })
        }
    }
}