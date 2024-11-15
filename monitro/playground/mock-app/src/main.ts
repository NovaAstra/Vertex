import { createApp, } from 'vue'
import { MonitroClient } from "@vertex-monitro-client/browser"
import { VuePlugin } from "@vertex-monitro-plugin/vue"

import App from './App.vue'


async function bootstrap() {
    const app = createApp(App)

    MonitroClient({
        plugins: [
            VuePlugin({
                vue: app
            })
        ]
    })

    app.mount('#app')
}

bootstrap()