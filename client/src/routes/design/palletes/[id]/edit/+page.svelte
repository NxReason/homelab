<script lang="ts">
  import type { PageProps } from './$types';
  import { goto } from '$app/navigation';
  import Return from '$lib/components/Return.svelte';
  import PalleteForm from '../../PalleteForm.svelte';
  import { updatePallete } from '../../api';

  const { data }: PageProps = $props();
  // svelte-ignore state_referenced_locally
  let pallete = $state(data.pallete);

  async function handleSubmit(e: any) {
    e.preventDefault();
    await updatePallete(pallete);
  }
</script>

<div class="container">
  <Return path="/design/palletes" />
  <PalleteForm
    bind:name={pallete.name}
    bind:colors={pallete.colors}
    {handleSubmit}
  />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
