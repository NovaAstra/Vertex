import { createApp, } from 'vue'
import { MonitroClient } from "@vertex-monitro-client/browser"

import App from './App.vue'


async function bootstrap() {
    const app = createApp(App)

    MonitroClient()

    app.mount('#app')
}

bootstrap()