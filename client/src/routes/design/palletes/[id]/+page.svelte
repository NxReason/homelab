<script lang="ts">
  import type { IPallete } from '../IPallete';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  let pallete = $derived(data.pallete);
</script>

<h1>{pallete.name}</h1>

<ul>
  {#each pallete.colors as color}
    <li>{color.name}</li>
  {/each}
</ul>
