<script lang="ts">
  import type { PageProps } from './$types';
  import type { IPallete } from './IPallete';
  import PalleteItem from './PalleteItem.svelte';

  let { data }: PageProps = $props();
  // svelte-ignore state_referenced_locally
  let palletes = $state<IPallete[]>([...data.palletes]);
</script>

<h1>{data.title}</h1>

<a href="/design/palletes/new">New</a>

<ul>
  {#each palletes as pallete}
    <PalleteItem {pallete} />
  {/each}
</ul>
