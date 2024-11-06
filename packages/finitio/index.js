function defineStates(config) {
    return matchboxFactory(config, "key")
}

function matchboxFactory(config, tagProp = 'tag') {
    if (Array.isArray(config)) {
        const spec = config.reduce(
            (obj, tag) => {
                obj[tag] = (data) =>
                    data;
                return obj;
            }, {})

        return matchboxFactory(spec, tagProp)
    }

    const createObj = {}
    for (const tag in config) {
        const spec = config[tag]
        createObj[tag] = () => {
            return matchbox(
                tag,
                typeof spec === "function" ? spec(...args) : spec,
                tagProp,
            );
        }
    }

    return createObj
}

function matchbox(tag, data, tagProp) {
    return new MemberImpl(tag, data, tagProp)
}

class MemberImpl {
    constructor(
        tag,
        data,
        tagProp = "tag",
    ) {
        Object.assign(this, {
            [tagProp]: tag,
            getTag: () => this[tagProp],
        });

        this.data = data
    }
}

function createStateMachine(transitions, initialState) {
    let lastChange = {
        type: "__initialize",
        to: initialState,
    }

    const machine = {
        transitions,
        getChange: () => lastChange,
        getState: () => lastChange.to,
    }

    return machine;
}

const states = defineStates({
    Idle: undefined,
    Pending: (...args) => args,
    Resolved: (data) => data,
    Rejected: (error) => error
})

function createFactoryMachine(states, transitions, init) {
    const initialState = (
        typeof init === "string" ? states[init]({}) : init
    );
    const machine = createStateMachine(transitions, initialState);
    Object.assign(machine, {
        states
    })

    return machine
}

function createApi(machine, filterStateKey) {
    const { states, transitions } = machine;
    const createSender =
        (eventKey) =>
            (...params) => {
                return machine.send(eventKey, ...(params));
            };

    const events = {}
    for (const stateKey in states) {
        if (filterStateKey && stateKey !== filterStateKey) {
            continue;
        }

        const transitioners = {}
        const transitionKey = stateKey;
        const stateTransitions = transitions[transitionKey];
    }
}

function withApi(target) { }

const trafficLight = createFactoryMachine(
    {
        Red: () => "means stop",
        Yellow: () => "means caution",
        Green: () => "means go",
    },
    {
        Red: { next: "Green" },
        Yellow: { next: "Red" },
        Green: { next: "Yellow" },
    },
    'Red'
)


