<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte';
  import ColorPicker from './ColorPicker.svelte';
  import type { IPalleteColor } from './IPallete';

  type Props = {
    name: string;
    colors: IPalleteColor[];
    handleSubmit: (e: Event) => void;
  };

  let {
    handleSubmit,
    name = $bindable(),
    colors = $bindable(),
  }: Props = $props();

  function addColor() {
    colors.push({
      id: crypto.randomUUID(),
      name: '',
      hex: '333333',
    });
  }
  function removeColor(id: string) {
    colors = colors.filter(c => c.id !== id);
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
        <button
          type="button"
          class="remove-color-btn"
          onclick={() => removeColor(color.id)}
          aria-label="Remove color"
        >
          <i class="icon icon-close"></i>
        </button>
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
    grid-template-columns: 60% 1fr 60px;
    gap: 8px;
  }

  .remove-color-btn {
    display: grid;
    place-items: center;
  }

  .icon-close {
    background-image: url('/icons/close.svg');
  }
</style>
