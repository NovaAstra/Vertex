class MemberImpl {
    constructor(tag, data, tagProp) {
        this.data = data
        Object.assign(this, {
            [tagProp]: tag,
            getTag: () => this[tagProp]
        })
    }
}

function matchbox(tag, data, tagProp = 'tag') {
    return new MemberImpl(tag, data, tagProp)
}

function matchboxFactory(config, tagProp = 'tag') {
    const createObj = {}
    for (const tag in config) {
        const spec = (config)[tag];
        createObj[tag] = (...args) => {
            return matchbox(
                tag,
                typeof spec === 'function' ? spec(args) : spec,
                tagProp
            )
        }
    }
    return createObj;
}

function defineStates(config) {
    return matchboxFactory(config, "key");
}

const config = {
    Idle: undefined,
    Loading: { id: 1 },
    Loaded: (data) => ({ data }),
    Error: (error) => ({ error }),
}

const state = defineStates(config)

function createStateMachine(transitions, initialStates) {
    let lastChange = {
        type: "__initialize",
        to: initialState,
    }

    const machine = {
        transitions
    }

    return machine
}

function createFactoryMachine(states, transitions, init) {
    const initialState = (
        typeof init === "string" ? states[init]({}) : init
    );
    const machine = createStateMachine(transitions, initialState);
    Object.assign(machine, {})
    return machine
}
