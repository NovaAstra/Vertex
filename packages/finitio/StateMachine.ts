import { StateNodeSchema, StateNodeDefinition } from "./StateNode"

export type MachineSchema<
    Context,
    Event,
> = StateNodeSchema<Context, Event>

export interface StateMachineDefinition<Context, Event>
    extends StateNodeDefinition<Context, Event> { }

export class StateMachine<Context, Event> {
    public id: string;

    public version?: string;

    public constructor(
        public schema: MachineSchema<Context, Event>
    ) {
    }

    public get definition() {
        return
    }

    public toJSON() {
        return this.definition;
    }
}