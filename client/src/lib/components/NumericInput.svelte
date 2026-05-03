<script lang="ts">
let { value = $bindable<number | null>() } = $props();

let raw = $state(value ?? '');

$effect(() => {
  value = raw === ''
    ? null
    : parseInt(raw, 10)
})
</script>

<input
  type="text"
  inputmode="numeric"
  bind:value={raw}
  oninput={(e) => {
    const inputValue = (e.target as HTMLInputElement).value;
    raw = inputValue.replace(/\D+/g, '');
  }} />