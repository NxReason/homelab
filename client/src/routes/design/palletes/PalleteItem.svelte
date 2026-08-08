<script lang="ts">
  import type { IPallete } from './IPallete';
  import { deletePallete } from './api';

  type Props = {
    pallete: IPallete;
  };
  let { pallete }: Props = $props();
</script>

<li>
  <a href="/design/palletes/{pallete.id}">
    {pallete.id} / {pallete.name}
  </a>
  <button onclick={() => deletePallete(pallete.id!)}>Del</button>
  <ul class="pallete-colors">
    {#each pallete.colors as palleteColor}
      <li>
        {palleteColor.name} / {palleteColor.hex}
      </li>
    {/each}
  </ul>
</li>

<style>
  .pallete-colors {
    list-style: none;
    margin-left: 16px;
  }
</style>
