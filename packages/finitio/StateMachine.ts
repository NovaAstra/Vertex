import { StateNodeSchema, StateNodeDefinition } from "./StateNode"

export type MachineSchema<
    Context,
    Event,
    Meta
> = StateNodeSchema<Context, Event, Meta>

export interface StateMachineDefinition<Context, Event>
    extends StateNodeDefinition<Context, Event> { }

export class StateMachine<Context, Event, Meta> {
    public id: string;

    public version?: string;

    public constructor(
        public schema: MachineSchema<Context, Event, Meta>
    ) {
    }

    public get definition() {
        return
    }

    public toJSON() {
        return this.definition;
    }
}