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
    })
    return machine
}

function createApi(machine) {
    const { states, transitions } = machine;
    const createSender =
        (eventKey) =>
            (...params) => {
                return machine.send(eventKey, ...(params));
            };

    const transitioners = {};
    const events = {}
    for (const stateKey in states) {
        const transitionKey = stateKey
        const stateTransitions = transitions[transitionKey];
        transitioners[transitionKey] = {};

        if (stateTransitions) {
            for (const eventKey in stateTransitions) {
                const sender = createSender(eventKey);
                transitioners[transitionKey][eventKey] = sender;
                events[eventKey] ||= sender;
            }
        }
    }

    return events;
}

function withApi(target) {
    const enhanced = target
    if (enhanced.api) {
        return enhanced;
    }
    return Object.assign(target, {
        api: createApi(enhanced),
    })
}

const config = {
    Initial: { key: "initial" },
    Done: (ok, msg) => ({ ok, msg }),
}

const makeStates = () =>
    defineStates(config);

const makeMachine = () => {
    const states = makeStates();

    const m = createFactoryMachine(
        states,
        {
            Initial: {
                done: "Done",
                doneFunc: (done) =>
                    states[done === 100 ? "Done" : "Initial"](true),
                doneAdvFunc:
                    (done) =>
                        ({ type }) => {
                            return states[done === "DONE" ? "Done" : "Initial"](
                                type === "doneAdvFunc",
                            );
                        },
            },
            Done: {},
        },
        "Initial",
    )
    const m2 = withApi(m)
    return m2
}

const machine = makeMachine();

console.log(machine.api)
