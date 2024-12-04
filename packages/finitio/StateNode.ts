export type StateNodeType = 'atomic'

export interface StateNodeConfig<Context, Event> {
    id?: string | undefined;

    name?: string;

    description?: string;

    type?: StateNodeType;
}

export interface StateNodeOptions<Context, Event> {

}

export class StateNode<Context, Event> {
    public constructor(
        public config: StateNodeConfig<Context, Event>,
        public readonly options: StateNodeOptions<Context, Event>
    ) { }
}