<script lang="ts">
  import { savePallete } from '../api';
  import type { IPalleteColor } from '../IPallete';
  import Return from '$lib/components/Return.svelte';
  import PalleteForm from '../PalleteForm.svelte';

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
</script>

<div class="container">
  <Return path="/design/palletes" />
  <PalleteForm bind:name bind:colors {handleSubmit} />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
