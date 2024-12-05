import { StateMachine, MachineSchema } from "./StateMachine"

export function createMachine<Context, Event>(
    schema: MachineSchema<Context, Event>
) {
    return new StateMachine<Context, Event>(schema)
}