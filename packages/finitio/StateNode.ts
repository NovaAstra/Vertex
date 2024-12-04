export type StateNodeSchemas<
    Context,
    Event,
> = {
        [K in string]: StateNode<Context, Event>;
    }

export interface StateNodeSchema<
    Context,
    Event,
> {
    id?: string | undefined;

    name?: string;

    description?: string;
}

export interface StateNodeOptions<Context, Event> {

}

export class StateNode<Context, Event> {
    public description?: string;

    public states: StateNodeSchemas<Context, Event>;

    public constructor(
        public schema: StateNodeSchema<Context, Event>,
        public readonly options: StateNodeOptions<Context, Event>
    ) {
        this.description = schema.description;
    }
}

