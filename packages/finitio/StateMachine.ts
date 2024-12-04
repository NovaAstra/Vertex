import { StateNodeSchema } from "./StateNode"

export type MachineSchema<
    Context,
    Event,
> = StateNodeSchema<Context, Event>

export class StateMachine<Context, Event> {
    public id: string;

    public constructor(
        public schema: MachineSchema<Context, Event>
    ) { }
}