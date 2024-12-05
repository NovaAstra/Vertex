import { StateMachine } from "./StateMachine"

export interface StateNodeDefinition<Context, Event> {
    id: string;
    version?: string | undefined;
}

export interface StateNodeSchema<Context, Event, Meta> {
    id?: string | undefined;

    name?: string;

    description?: string;

    meta?: Meta;
}

export interface StateNodeOptions<Context, Event> {

}

export class StateNode<Context, Event, Meta> {
    public id: string;

    public description?: string;

    public meta?: Meta;

    public machine: StateMachine<Context, Event, Meta>;

    public constructor(
        public schema: StateNodeSchema<Context, Event, Meta>,
        public readonly options: StateNodeOptions<Context, Event>
    ) {
        this.description = schema.description;

        this.meta = this.schema.meta;
    }

    public get definition() {
        return
    }

    public toJSON() {
        return this.definition;
    }
}

