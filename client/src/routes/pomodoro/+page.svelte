<script lang="ts">
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
// let timeLeft = $state(INITIAL_WORK_TIME * 60);
let timeLeft = $state(2);
let timeView = $derived(getTimeView(timeLeft))
let intervalId: ReturnType<typeof setInterval> | undefined;
let isRunning = $state(false);

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
}

// update time-left only if timer isn't running
$effect(() => {
  if (isRunning) return;
  // timeLeft = phase === 'Work'
  //   ? getWorkTimeLeft()
  //   : getRestTimeLeft();
  resetTimeLeft();
})

function getWorkTimeLeft(): number {
  return (workTimer ?? INITIAL_WORK_TIME) * 60;
}
function getRestTimeLeft(): number {
  return (restTimer ?? INITIAL_REST_TIME) * 60;
}
</script>


<div class="pomodoro">
  <h1 class="page-title">Pomodoro</h1>

  <Settings bind:workTimer={workTimer} bind:restTimer={restTimer} />

  <div class="timer">
    <p>{phase}ing <button onclick={togglePhaseHandler}>-></button></p>
    <p>{timeView}</p>
    <button onclick={resetHandler}>Reset</button>
    <button onclick={toggleTimer}>{isRunning ? 'Stop' : 'Start'}</button>
  </div>
</div>


<style>
.pomodoro {
  display: grid;
  grid-template-rows: 60px;
  grid-template-columns: 30% 70%;
  gap: 16px;
}
.page-title {
  grid-column: 1 / 3;
  padding: 16px;
}
</style>