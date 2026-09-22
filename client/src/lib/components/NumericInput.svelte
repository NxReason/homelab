<script lang="ts">
  import TextInput from './TextInput.svelte';

  type Props = {
    value?: number | null;
    title?: string;
    sub?: string;
    oninput?: () => void;
    selectOnFocus?: boolean;
  };
  let {
    value = $bindable<number | null>(),
    title = '',
    sub = '',
    oninput,
    selectOnFocus = true,
  }: Props = $props();

  let raw = $state(value?.toString() ?? '');

  $effect(() => {
    raw = value?.toString() ?? '';
  });

  function defaultOnInput(e: Event) {
    const inputValue = (e.target as HTMLInputElement).value;
    raw = inputValue.replace(/\D+/g, '');
    value = raw === '' ? null : parseInt(raw, 10);
  }
</script>

<TextInput
  bind:value={raw}
  {title}
  {sub}
  {selectOnFocus}
  oninput={oninput ?? defaultOnInput}
/>

<!-- <input
  type="text"
  inputmode="numeric"
  bind:value={raw}
  oninput={e => {
    const inputValue = (e.target as HTMLInputElement).value;
    raw = inputValue.replace(/\D+/g, '');
  }}
  onfocus={e => (e.target as HTMLInputElement).select()}
/> -->
