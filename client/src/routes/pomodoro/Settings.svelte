<script lang="ts">
  import NumericInput from '$lib/components/NumericInput.svelte';

let {
  workTimer = $bindable<number | null>(),
  restTimer = $bindable<number | null>(),
} = $props();

</script>

<section>
  <label>
    <span>Work</span>
    <NumericInput bind:value={workTimer} />
  </label>
  <label>
    <span>Rest</span>
    <NumericInput bind:value={restTimer} />
  </label>
</section>

<style>
section {
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 0 16px;
}
label {
  display: flex;
  gap: 8px;
  align-items: center;
}
label span {
  display: inline-block;
  padding: 4px 8px;
  width: 70px;
  background-color: var(--primary);
  color: var(--on-primary);
}
</style>