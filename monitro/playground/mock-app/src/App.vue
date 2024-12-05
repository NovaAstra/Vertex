
<template>
  <div>
  
  </div>
</template>

<script lang="ts" setup>
import { match } from 'ts-pattern';

// 定义状态
type State =
  | { status: 'ON' }
  | { status: 'OFF' }
  | { status: string };

// 定义事件
type Event = { type: 'TOGGLE' };

// 状态机逻辑
function transition(state: State, event: Event): State {
  return match<[State, Event]>([state, event])
    .with([{ status: 'ON' }, { type: 'TOGGLE' }], () => ({ status: 'OFF' }))
    .with([{ status: 'OFF' }, { type: 'TOGGLE' }], () => ({ status: 'ON' }))
    .otherwise(() => {
      throw new Error('Invalid state transition');
    });
}

// 测试状态机
let currentState: State = { status: 'OFF' };

console.log('Initial State:', currentState);

// 触发事件
currentState = transition(currentState, { type: 'TOGGLE' });
console.log('After TOGGLE:', currentState);

currentState = transition(currentState, { type: 'TOGGLE' });
console.log('After TOGGLE:', currentState);

</script>