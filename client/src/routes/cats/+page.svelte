<script lang="ts">
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<h2>Cats list</h2>
<ul>
  {#each data.cats as cat}
    <li>{cat.name} / {cat.age} / {cat.breed}</li>
  {/each}
</ul>
