import { StateMachine } from "./StateMachine"

export interface StateNodeDefinition<Context, Event> {
    id: string;
    version?: string | undefined;
}

export interface StateNodeSchema<Context, Event> {
    id?: string | undefined;

    name?: string;

    description?: string;
}

export interface StateNodeOptions<Context, Event> {

}

export class StateNode<Context, Event> {
    public id: string;

    public description?: string;

    public machine: StateMachine<Context, Event>

    public constructor(
        public schema: StateNodeSchema<Context, Event>,
        public readonly options: StateNodeOptions<Context, Event>
    ) {
        this.description = schema.description;
    }

    public get definition() {
        return
    }

    public toJSON() {
        return this.definition;
    }
}

