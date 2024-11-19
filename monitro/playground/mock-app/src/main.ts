import { createApp, } from 'vue'
import { MonitroClient } from "@vertex-monitro-client/browser"
import App from './App.vue'


async function bootstrap() {
    MonitroClient({
        dsn: "localhost:8001",
    })

    const app = createApp(App)

    app.mount('#app')
}

bootstrap()