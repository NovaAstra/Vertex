import { pipe } from "@vertex/elation"

export class Matcher {
    public pipe() {
        return pipe.bind(this, arguments)
    }
}