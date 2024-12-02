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


function createStateMachine(transitions, initialState) {
    let lastChange = {
        type: "__initialize",
        to: initialState,
    }

    const machine = {
        transitions,
        getChange: () => lastChange,
        getState: () => lastChange.to,
        send: (type, ...params) => {
            const lastChange = machine.getChange();
            const resolved = machine.resolve({
                type,
                params,
                from: lastChange.to,
            })
        },
        resolve: (ev) => {
            const to = machine.transitions[ev.from.key][ev.type];
            if (to) {
                return { ...ev, to }
            }
        }
    }

    return machine
}

function createFactoryMachine(states, transitions, init) {
    const initialState = (
        typeof init === "string" ? states[init]({}) : init
    );
    const machine = createStateMachine(transitions, initialState);
    Object.assign(machine, {
        states,
        resolve: () => {

        }
    })
    return machine
}

const config = {
    Idle: undefined,
    Loading: { id: 1 },
    Loaded: (data) => ({ data }),
    Error: (error) => ({ error }),
}

const state = defineStates(config)
