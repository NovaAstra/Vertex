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