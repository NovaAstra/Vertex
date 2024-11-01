import { createStateMachine } from "../demo"

function updateState(currState, changes) {
    return Object.assign({}, currState, changes[0]);
}

function incCounterAndDisplay(extendedState, eventData, settings) {
    const { count } = extendedState;

    return {
        updates: [{ count: count + 1 }],
        outputs: [
            {
                command: "render",
                params: count + 1
            }
        ]
    };
}

const fsmDef = {
    states: { counting: "" },
    events: ["clicked"],
    initialExtendedState: { count: 0 },
    initialControlState: "counting",
    transitions: [
        {
            from: "counting",
            event: "clicked",
            to: "counting",
            action: incCounterAndDisplay
        }
    ],
    updateState
};

const settings = { debug: { console } };
const fsm = createStateMachine(fsmDef, settings);

const spanEl = document.getElementById("count-span");

// ...and provision the event handler
document.getElementById("app").addEventListener("click", function () {
  // Translate user inputs into commands
  const commands = fsm({ clicked: void 0 });

  console.log(commands,123)
  // Execute the commands - here only one command: render
  commands.forEach(({ command, params }) => {
    spanEl.innerHTML = `${params}`;
  });
});
