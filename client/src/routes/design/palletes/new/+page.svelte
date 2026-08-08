<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte';
  import type { IPalleteColor } from '../IPallete';
  import { savePallete } from '../api';
  import ColorPicker from './ColorPicker.svelte';

  const defaultColors: IPalleteColor[] = [
    { id: crypto.randomUUID(), name: 'BG', hex: '222222' },
    { id: crypto.randomUUID(), name: 'Surface', hex: '333333' },
    { id: crypto.randomUUID(), name: 'Main', hex: '7c4dff' },
    { id: crypto.randomUUID(), name: 'Text', hex: 'ffffff' },
  ];

  let name = $state('');
  let colors = $state<IPalleteColor[]>(defaultColors);

  async function handleSubmit(e: any) {
    e.preventDefault();
    await savePallete({ name, colors });
    name = '';
    colors = [];
  }

  function addColor() {
    colors.push({
      id: crypto.randomUUID(),
      name: '',
      hex: '',
    });
  }
  function removeColor(id: string) {
    colors = colors.filter(c => c.id != id);
  }
</script>

<form onsubmit={handleSubmit}>
  <TextInput bind:value={name} title="Pallete name" />

  <button type="button" onclick={addColor}>Add color</button>

  <ul class="color-list">
    {#each colors as color, i}
      <li class="color-item">
        <TextInput bind:value={color.name} title="Color #{i + 1}" />
        <ColorPicker bind:hex={color.hex} />
        <button onclick={() => removeColor(color.id)}>D</button>
      </li>
    {/each}
  </ul>

  <button>Save</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .color-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .color-item {
    display: grid;
    grid-template-columns: 60% 1fr 1fr;
    gap: 8px;
  }
</style>
