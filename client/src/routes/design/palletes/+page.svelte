<script lang="ts">
  import type { PageProps } from './$types';
  import { deletePallete } from './api';
  import type { IPallete } from './IPallete';
  import PalleteItem from './PalleteItem.svelte';

  let { data }: PageProps = $props();
  // svelte-ignore state_referenced_locally
  let palletes = $state<IPallete[]>([...data.palletes]);

  async function handleDelete(id: number) {
    const deleted = await deletePallete(id);
    console.log(deleted);
    palletes = palletes.filter(p => p.id != id);
  }
</script>

<h1>{data.title}</h1>

<a href="/design/palletes/new" class="new-pallete-btn">New</a>

<ul class="palletes">
  {#each palletes as pallete}
    <PalleteItem {pallete} onDelete={handleDelete} />
  {/each}
</ul>

<style>
  .new-pallete-btn {
    display: inline-block;
    padding: 8px 16px;
    background-color: var(--primary);

    transition: background-color 0.15s ease;
  }
  .new-pallete-btn:hover {
    background-color: var(--secondary);
    cursor: pointer;
  }
</style>
