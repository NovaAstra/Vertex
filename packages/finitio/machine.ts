import { StateMachine, MachineSchema } from "./StateMachine"

export function createMachine<Context, Event, Meta>(
    schema: MachineSchema<Context, Event, Meta>
) {
    return new StateMachine<Context, Event, Meta>(schema)
}