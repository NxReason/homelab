<script lang="ts">
  import { untrack } from 'svelte';
import Settings from './Settings.svelte';

const INITIAL_WORK_TIME = 60;
const INITIAL_REST_TIME = 15;

// Settings
let workTimer = $state<number | null>(INITIAL_WORK_TIME);
let restTimer = $state<number | null>(INITIAL_REST_TIME);

// Phase
let phase: 'Work' | 'Rest' = $state('Work')
function togglePhaseHandler() {
  stop();
  togglePhase();
}
function togglePhase() {
  phase = phase === 'Work' ? 'Rest' : 'Work';
  resetTimeLeft();
}

// Timer
let timeLeft = $state(INITIAL_WORK_TIME * 60);
let timeView = $derived(getTimeView(timeLeft));
let isRunning = $state(false);
let intervalId: ReturnType<typeof setInterval> | undefined;

function start() {
  intervalId = setInterval(() => {
    timeLeft -= 1;
    if (timeLeft <= 0) {
      stop();
      togglePhase();
    }
  }, 1000);
  isRunning = true;
}
function stop() {
  clearTimeout(intervalId);
  isRunning = false;
}
function toggleTimer() {
  isRunning ? stop() : start();
}

function resetHandler() {
  stop();
  resetTimeLeft();
}

function getTimeView(sec: number): string {
  const min = Math.floor(sec / 60);
  sec = sec - min * 60;
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

function resetTimeLeft() {
  if (phase === 'Work')
    timeLeft = getWorkTimeLeft();
  else
    timeLeft = getRestTimeLeft();
};

function getWorkTimeLeft(): number {
  return (workTimer ?? INITIAL_WORK_TIME) * 60;
}
function getRestTimeLeft(): number {
  return (restTimer ?? INITIAL_REST_TIME) * 60;
}

$effect(() => {
  const running = untrack(() => isRunning);
  if (running) return;

  if (phase === 'Work')
    timeLeft = getWorkTimeLeft();
  else
    timeLeft = getRestTimeLeft();
})
</script>


<div class="pomodoro">
  <h1 class="page-title">Pomodoro</h1>

  <Settings bind:workTimer={workTimer} bind:restTimer={restTimer} />

  <div class="timer">
    <h3>{phase}ing <button onclick={togglePhaseHandler}>-></button></h3>
    <p class="timer-value">{timeView}</p>
    <div>
      <button onclick={resetHandler}>Reset</button>
      <button onclick={toggleTimer}>{isRunning ? 'Stop' : 'Start'}</button>
    </div>
  </div>
</div>


<style>
.pomodoro {
  display: grid;
  grid-template-rows: 60px;
  grid-template-columns: 30% 70%;
  row-gap: 16px;
}
.page-title {
  grid-column: 1 / 3;
  padding-top: 8px;
}
.timer {
  display: grid;
  grid-template-rows: auto 80px auto;
  gap: 16px;
  justify-items: center;

  border-left: 1px solid var(--on-surface);
}
.timer-value {
  font-size: 3rem;
  padding-top: .5rem;
}
</style>