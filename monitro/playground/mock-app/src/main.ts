import { createApp, } from 'vue'
// import { MonitroClient } from "@vertex-monitro-client/browser"
import App from './App.vue'
import { parse } from "../../../../packages/erralyze"



async function bootstrap() {
    // MonitroClient({
    //     dsn: "localhost:8001",
    // })

    window.addEventListener(
        "error",
        (event: ErrorEvent) => {
            event.preventDefault();
            console.log(parse(event))
        },
        true)
    window.addEventListener(
        "unhandledrejection",
        (event: PromiseRejectionEvent) => {
            event.preventDefault();
            console.log(parse(event))

        },
        true)

    const app = createApp(App)

    app.mount('#app')


}

bootstrap()