<script lang="ts">
  import type { PageProps } from './$types';
  import { deletePallete } from './api';
  import type { IPallete } from './IPallete';
  import PalleteItem from './PalleteItem.svelte';

  let { data }: PageProps = $props();
  // svelte-ignore state_referenced_locally
  let palletes = $state<IPallete[]>([...data.palletes]);

  async function handleDelete(id: number) {
    await deletePallete(id);
    palletes = palletes.filter(p => p.id != id);
  }
</script>

<h1 class="page-title">{data.title}</h1>

<a href="/design/palletes/new" class="new-pallete-btn">New</a>

<ul class="palletes">
  {#each palletes as pallete}
    <PalleteItem {pallete} onDelete={handleDelete} />
  {/each}
</ul>

<style>
  .page-title {
    margin-bottom: 8px;
  }
  .new-pallete-btn {
    display: inline-block;
    padding: 8px 16px;
    margin-bottom: 8px;
    border: 2px solid var(--primary);

    transition: background-color 0.15s ease;
  }
  .new-pallete-btn:hover {
    background-color: var(--primary);
    cursor: pointer;
  }
</style>
