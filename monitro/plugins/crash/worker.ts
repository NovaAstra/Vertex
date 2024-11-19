export class Worker {
    private readonly CHECK_CRASH_INTERVAL: number = 10 * 1000;

    private readonly CRASH_THRESHOLD = 15 * 1000;

    

    public constructor() {
        this.launch()
    }

    public launch() {
        onmessage = () => {

        }
    }

    private check() {

    }
}